// ─────────────────────────────────────────────────────────────────────
// Icon fetching
// ─────────────────────────────────────────────────────────────────────
// Every icon — desktop, dock, bookmark list — is resolved the same way, from
// the link's own URL. There is no per-item icon setting: what a link points
// at decides what it looks like.
const FAVICON_STORE = 'webos_icons';

// Cache key for a link: host + path, so google.com/maps and google.com (or
// mail.google.com and drive.google.com) keep separate icons.
function iconKey(url) {
	try {
		const u = new URL(url);
		return u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '');
	} catch (_) { return url; }
}

const faviconCache = (() => {
	try { return JSON.parse(localStorage.getItem(FAVICON_STORE) || '{}'); }
	catch (_) { return {}; }
})();

// Pages whose every icon source failed this session. Kept in memory only —
// never persisted — so an icon that was merely blocked (e.g. the page was
// loaded behind a network that filters the CDN) is retried on the next visit
// instead of being stuck on the placeholder forever.
const faviconFailed = new Set();

function clearFaviconCache() {
	for (const k in faviconCache) delete faviconCache[k];
	faviconFailed.clear();
	try { localStorage.removeItem(FAVICON_STORE); } catch (_) {}
}

// Time limits. A cached URL loaded before, so it gets the shortest: a miss
// just falls back to the full lookup. The site's own files should answer fast
// if they answer at all — a blocked host never will. Google and icon.horse are
// off the boot path, so they get plenty of room.
const CACHE_TIMEOUT  = 500;
const SITE_TIMEOUT   = 1000;
const PROBE_TIMEOUT  = 5000;

// Load `url` as an image; call cb(ok) exactly once — false on error or
// timeout. A timed-out probe is aborted (src → data:,) so its socket is freed
// instead of lingering until the OS connect timeout (~15-21s on Windows),
// which otherwise clogs the per-host connection pool and keeps the tab's
// loading spinner running.
function probeImage(url, timeout, cb) {
	const probe = new Image();
	let done = false;
	const finish = ok => {
		if (done) return;
		done = true;
		clearTimeout(timer);
		const size = ok ? { width: probe.naturalWidth, height: probe.naturalHeight } : null;
		probe.onload = probe.onerror = null;
		if (!ok) { try { probe.src = 'data:,'; } catch (_) {} }
		cb(ok, size);
	};
	const timer = setTimeout(() => finish(false), timeout);
	probe.onerror = () => finish(false);
	probe.onload  = () => finish(true);
	probe.src = url;
}

// probeImage as a promise: { url, width, height } if it loaded, else null.
const loadIcon = (url, timeout) => new Promise(resolve =>
	probeImage(url, timeout, (ok, size) => resolve(ok ? { url, ...size } : null)));

// ─────────────────────────────────────────────────────────────────────
// Google endpoint
// ─────────────────────────────────────────────────────────────────────
// Google's favicon service, called directly on its gstatic host rather than
// through www.google.com/s2/favicons (which only 301-redirects here, costing
// a round trip). Two domains serve identical images: gstatic.com, and
// gstatic.cn — Google's mainland-China domain, which loads where google.com
// and gstatic.com are blocked.
const GSTATIC_HOSTS = ['https://t0.gstatic.com', 'https://t0.gstatic.cn'];
const gstaticFor = (base, url) => base +
	'/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=' +
	encodeURIComponent(url);

// Which gstatic domain to use, decided once per session: both are pinged and
// the first to answer wins. Resolves to null if neither answers, and every
// icon then goes straight to the backups. A no-cors fetch, not an <img>: the
// ping URL returns an empty 204, which an <img> would report as an error.
let googleHostPromise = null;
function googleHost() {
	if (googleHostPromise) return googleHostPromise;
	googleHostPromise = new Promise(resolve => {
		const ctrl = new AbortController();
		let left = GSTATIC_HOSTS.length;
		const timer = setTimeout(() => { ctrl.abort(); resolve(null); }, PROBE_TIMEOUT);
		GSTATIC_HOSTS.forEach(base => {
			fetch(base + '/generate_204', { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal }).then(
				() => { clearTimeout(timer); resolve(base); ctrl.abort(); },
				() => { if (--left === 0) { clearTimeout(timer); resolve(null); } },
			);
		});
	});
	return googleHostPromise;
}

// Google answers a miss with a 16px generic globe rather than a usable error.
// (s2/favicons still matches URLs cached by older versions.)
const isGooglePlaceholder = (url, size) => (
	/gstatic\.(com|cn)\/faviconV2|google\.com\/s2\/favicons/.test(url) &&
	size &&
	size.width <= 16 &&
	size.height <= 16
);

// icon.horse: a free favicon API that reads a host's <link>, manifest and
// touch icons and returns the largest (up to 256px). `fallback=404` makes a
// miss a real error instead of a generated 256px letter tile, which <img>
// could not tell from a real icon. It redirects www.* to the bare host, so
// that is stripped up front to skip the round trip.
const iconHorseFor = host => 'https://icon.horse/icon/' + host.replace(/^www\./, '') + '?fallback=404';

// Google's answer is used as-is at this width or above; below it, the
// backups are tried too.
const SHARP_MIN = 64;

// Largest icon in `icons` (nulls skipped); the earliest wins a tie.
const largest = icons => icons.reduce((best, i) => (i && (!best || i.width > best.width)) ? i : best, null);

// ─────────────────────────────────────────────────────────────────────
// Icon lookup
// ─────────────────────────────────────────────────────────────────────
// Resolve the icon for the page at `pageUrl` onto the tile's sharp <img>.
// The caller has already shown the gray placeholder; `onFail` re-asserts it when
// nothing loads.
//
//   1. Saved icon from a prior visit, if it still loads.
//   2. Google, on the session's gstatic domain, asked about both the full page
//      URL and the site's origin. The page answer tells product pages apart
//      from their host (Gmail vs. Google, Flights vs. Google); the origin
//      answer covers deep pages that only get 32px (youtube.com/feed/...).
//      The larger wins, the page on a tie. At SHARP_MIN or above: done.
//   3. Otherwise the backups — icon.horse, /favicon.ico, /apple-touch-icon.png
//      — and the largest of those and Google's small answer wins (Google on a
//      tie).
// Whatever is shown is saved, so the next visit skips the lookup.
async function applyFavicon(sharp, pageUrl, onFail) {
	const key = iconKey(pageUrl);
	if (faviconFailed.has(key)) { onFail && onFail(); return; }

	const show = icon => {
		sharp.src = icon.url;
		faviconFailed.delete(key);
		faviconCache[key] = icon.url;
		try { localStorage.setItem(FAVICON_STORE, JSON.stringify(faviconCache)); } catch (_) {}
	};

	// 1. Saved icon. Verify it still loads (a cached URL can 404 after a
	// redesign) before committing.
	const cached = faviconCache[key];
	if (cached) {
		const icon = await loadIcon(cached, CACHE_TIMEOUT);
		if (icon && !isGooglePlaceholder(cached, icon)) { sharp.src = cached; return; }
		delete faviconCache[key];
	}

	let host, origin;
	try { ({ hostname: host, origin } = new URL(pageUrl)); } catch (_) { onFail && onFail(); return; }

	// 2. Google: the page, and the origin unless that is the same URL.
	let google = null;
	const base = await googleHost();
	if (base) {
		const originUrl = origin + '/';
		const asks = pageUrl === originUrl ? [pageUrl] : [pageUrl, originUrl];
		const answers = await Promise.all(asks.map(u => loadIcon(gstaticFor(base, u), PROBE_TIMEOUT)));
		google = largest(answers.filter(a => a && !isGooglePlaceholder(a.url, a)));
		if (google && google.width >= SHARP_MIN) { show(google); return; }
	}

	// 3. Backups, compared with Google's small answer if there was one.
	const backups = await Promise.all([
		loadIcon(iconHorseFor(host), PROBE_TIMEOUT),
		loadIcon('https://' + host + '/favicon.ico', SITE_TIMEOUT),
		loadIcon('https://' + host + '/apple-touch-icon.png', SITE_TIMEOUT),
	]);
	const best = largest([google, ...backups]);
	if (best) { show(best); return; }

	faviconFailed.add(key);
	onFail && onFail();
}

// ─────────────────────────────────────────────────────────────────────
// Placeholder icon
// ─────────────────────────────────────────────────────────────────────
// A gray tile with a white "apps" mark, for a link with no icon: shown while
// the lookup runs, and kept if it finds nothing. Two files, not one: the bloom
// gets the plain gray plate, the sharp layer the white mark on a transparent
// ground. A bloom made from the mark would blow its white up into a pale wash.
const PLACEHOLDER_PLATE = 'src/icons/placeholder.svg';
const PLACEHOLDER_GLYPH = 'src/icons/placeholder-glyph.svg';

function showPlaceholderIcon(bloom, sharp) {
	bloom.src = PLACEHOLDER_PLATE;
	sharp.src = PLACEHOLDER_GLYPH;
}

// ─────────────────────────────────────────────────────────────────────
// Icon art shell
// ─────────────────────────────────────────────────────────────────────
// Icon as a floating tile: a sharp favicon over a blurred, enlarged copy
// of itself (self-bloom). Used everywhere icons appear.

// Favicon box = 80% of the tile. A favicon at least this many pixels fills
// the box; a smaller one fills the same fraction of it on every tile size —
// this is the All Apps box (60px tile × 80%), so there it is never enlarged,
// and on the 68px home tiles at most by 54.4 / 48 ≈ 1.13×.
const SHARP_BOX = 80;     // % of the tile
const SHARP_REF = 48;     // px

// Size the sharp <img> to its favicon: min(1, size / SHARP_REF) of the box,
// centred. Resizing the element itself (not just the drawn image) keeps the
// rounded corners on the favicon at whatever size it ends up. Vector images,
// and any without a natural size, fill the box.
function sizeSharp(sharp) {
	const n = Math.max(sharp.naturalWidth, sharp.naturalHeight);
	const vector = /\.svg(\?|#|$)/i.test(sharp.src) || sharp.src.startsWith('data:image/svg');
	const fill = (vector || !n) ? 1 : Math.min(1, n / SHARP_REF);
	const size = SHARP_BOX * fill;
	sharp.style.width = sharp.style.height = size + '%';
	sharp.style.top = sharp.style.left = (100 - size) / 2 + '%';
}

// Shared scaffold: span.icon-art (shadow) > span.icon-tile (squircle mask)
// wrapping a blurred bloom + a crisp sharp img.
function iconArtShell() {
	const wrap  = document.createElement('span'); wrap.className = 'icon-art';
	const tile  = document.createElement('span'); tile.className = 'icon-tile';
	const bloom = document.createElement('img');  bloom.className = 'icon-bloom'; bloom.alt = ''; bloom.decoding = 'async';
	const sharp = document.createElement('img');  sharp.className = 'icon-sharp'; sharp.alt = ''; sharp.decoding = 'async';
	sharp.addEventListener('load', () => sizeSharp(sharp));
	tile.appendChild(bloom); tile.appendChild(sharp); wrap.appendChild(tile);
	return { wrap, bloom, sharp };
}

// Tile for the link at `url`: gray placeholder first, then the resolved icon.
// The bloom follows the sharp layer, except for the placeholder's mark.
function iconArt(url) {
	const { wrap, bloom, sharp } = iconArtShell();
	showPlaceholderIcon(bloom, sharp);
	applyFavicon(sharp, url, () => showPlaceholderIcon(bloom, sharp));
	sharp.addEventListener('load', () => {
		if (sharp.src.endsWith(PLACEHOLDER_GLYPH)) return;
		if (bloom.src !== sharp.src) bloom.src = sharp.src;
	});
	return wrap;
}

// Same tile pipeline as iconArt, but from a fixed image src (no favicon lookup).
function iconArtFromSrc(src) {
	const { wrap, bloom, sharp } = iconArtShell();
	bloom.src = src; sharp.src = src;
	return wrap;
}
