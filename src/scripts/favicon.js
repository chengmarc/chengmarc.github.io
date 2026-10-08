// ─────────────────────────────────────────────────────────────────────
// Icon fetching
// ─────────────────────────────────────────────────────────────────────
// Every icon — desktop, dock, bookmark list — is resolved the same way, from
// the link's own URL. There is no per-item icon setting: what a link points
// at decides what it looks like.
const FAVICON_STORE = 'webos_icons';
// Older builds cached per domain under this key (plus a '__no_favicon__'
// failure sentinel). Per-page keys supersede it, so it's simply dropped.
try { localStorage.removeItem('webos_favicons'); } catch (_) {}

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
// instead of being stuck on the local glyph forever.
const faviconFailed = new Set();

// Forget every resolved and failed icon so the next render re-fetches all.
function clearFaviconCache() {
	for (const k in faviconCache) delete faviconCache[k];
	faviconFailed.clear();
	try { localStorage.removeItem(FAVICON_STORE); } catch (_) {}
}

// The site's own host should answer fast if it answers at all — a blocked
// host never will, so a short cap moves on sooner. The Google lookup and a
// cached URL are off the boot path, so they get plenty of room.
const SITE_TIMEOUT   = 1000;
const CACHE_TIMEOUT  = 500;
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

// Google's s2 answers a miss with a 16px generic globe rather than an error.
const isS2Placeholder = (url, size) => (
	url.includes('google.com/s2/favicons') &&
	size &&
	size.width <= 16 &&
	size.height <= 16
);

// Resolve the icon for the page at `pageUrl` onto the tile's sharp <img>.
// `onFail` re-asserts the local glyph when nothing loads.
//
// Two sources race:
//   • Google s2, asked about the full page URL. It reads that page's own
//     <link rel=icon>, so it tells product pages apart from their host
//     (Gmail vs. Google, Flights vs. Google). It returns the largest icon
//     the page has, up to the 128px asked for — enough for a 2x tile.
//   • The site's own host — its root icon files. Slower to be right but
//     reachable where Google is blocked.
// Whichever the site gives is shown as soon as it lands; s2's answer replaces
// it and is what gets cached. If s2 misses, the site's icon is kept and cached.
function applyFavicon(sharp, pageUrl, onFail) {
	const key = iconKey(pageUrl);
	if (faviconFailed.has(key)) { onFail && onFail(); return; }

	const remember = url => {
		faviconCache[key] = url;
		try { localStorage.setItem(FAVICON_STORE, JSON.stringify(faviconCache)); } catch (_) {}
	};

	// Fast path: the URL that worked on a prior visit. Verify it still loads
	// (a cached URL can 404 after a redesign) before committing.
	const cached = faviconCache[key];
	if (cached) {
		probeImage(cached, CACHE_TIMEOUT, (ok, size) => {
			if (ok && !isS2Placeholder(cached, size)) sharp.src = cached;
			else { delete faviconCache[key]; applyFavicon(sharp, pageUrl, onFail); }
		});
		return;
	}

	let host;
	try { host = new URL(pageUrl).hostname; } catch (_) { onFail && onFail(); return; }

	const S2_URL = 'https://www.google.com/s2/favicons?domain_url=' + encodeURIComponent(pageUrl) + '&sz=128';
	// Same-origin icon paths, most frequent first (from crawling the bookmark
	// set's <link>, manifest and legacy icon metadata). No scoring: the FIRST
	// entry in this order that loads wins, so the order IS the preference.
	const SITE_CANDIDATES = [
		'https://' + host + '/favicon.ico',
		'https://' + host + '/apple-touch-icon.png',
		'https://' + host + '/favicon.svg',
		'https://' + host + '/safari-pinned-tab.svg',
	];

	let s2 = 'pending';          // 'pending' | 'ok' | 'failed'
	let site = 'pending';        // 'pending' | url | 'failed'
	const settle = () => {
		if (s2 === 'pending') return;
		if (s2 === 'ok') return;                       // already shown + cached
		if (site === 'pending') return;
		if (site === 'failed') { faviconFailed.add(key); onFail && onFail(); }
		else remember(site);
	};

	probeImage(S2_URL, PROBE_TIMEOUT, (ok, size) => {
		if (ok && !isS2Placeholder(S2_URL, size)) {
			s2 = 'ok';
			faviconFailed.delete(key);
			sharp.src = S2_URL;
			remember(S2_URL);
		} else s2 = 'failed';
		settle();
	});

	// results[i]: undefined = in flight, true = loaded, false = failed.
	const results = new Array(SITE_CANDIDATES.length);
	const decideSite = () => {
		if (site !== 'pending') return;
		for (let i = 0; i < SITE_CANDIDATES.length; i++) {
			if (results[i] === true) {
				site = SITE_CANDIDATES[i];
				if (s2 !== 'ok') sharp.src = site;     // provisional until s2 answers
				settle();
				return;
			}
			if (results[i] === undefined) return;       // a higher preference may still land
		}
		site = 'failed';
		settle();
	};
	SITE_CANDIDATES.forEach((url, i) => probeImage(url, SITE_TIMEOUT, ok => {
		results[i] = ok;
		decideSite();
	}));
}

// ─────────────────────────────────────────────────────────────────────
// Static app-icon fallback
// ─────────────────────────────────────────────────────────────────────
// Polished local SVG tiles, chosen deterministically from the domain. They
// appear only when every favicon route fails, so restricted networks still get
// icons that look intentional without generating SVG artwork at runtime.
const FALLBACK_ICON_BASE = 'src/icons/';
const FALLBACK_ICON_FILES = [
	'search',
	'video',
	'mail',
	'code',
	'chart',
	'book',
	'globe',
	'chat',
	'cloud',
	'profile',
	'document',
	'compass',
];
const FALLBACK_ICON_VARIANTS = ['', '-alt'];

function hashStr(s) {
	let h = 5381;
	for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
	return h >>> 0;
}

function fallbackGlyphIndex(domain, h) {
	const d = domain.toLowerCase();
	if (/mail|gmail|outlook|zoho/.test(d)) return 2;
	if (/video|tube|bilibili|stream|anime|iyf|agefans/.test(d)) return 1;
	if (/git|code|dev|overleaf|claude|chatgpt|openai/.test(d)) return 3;
	if (/trade|coin|market|stock|fin|view|crypto/.test(d)) return 4;
	if (/search|google|earth|map/.test(d)) return 0;
	if (/cloud|dash|worker/.test(d)) return 8;
	if (/book|read|paper|research|orcid|gate/.test(d)) return 5;
	if (/social|reddit|insta|linkedin|x\.com/.test(d)) return 7;
	return h % FALLBACK_ICON_FILES.length;
}

function fallbackIconSrc(domain) {
	const h       = hashStr(domain);
	const fig     = fallbackGlyphIndex(domain, h);
	const variant = FALLBACK_ICON_VARIANTS[Math.floor(h / FALLBACK_ICON_FILES.length) % FALLBACK_ICON_VARIANTS.length];
	return FALLBACK_ICON_BASE + FALLBACK_ICON_FILES[fig] + variant + '.svg';
}

function renderIdenticon(bloom, sharp, domain) {
	const src = fallbackIconSrc(domain);
	bloom.src = src;
	sharp.onerror = null; sharp.onload = null;
	sharp.src = src;
}

// ─────────────────────────────────────────────────────────────────────
// Icon art shell
// ─────────────────────────────────────────────────────────────────────
// Icon as a floating tile: a sharp favicon over a blurred, enlarged copy
// of itself (self-bloom). Used everywhere icons appear.

// Shared scaffold: span.icon-art (shadow) > span.icon-tile (squircle mask)
// wrapping a blurred bloom + a crisp sharp img.
function iconArtShell() {
	const wrap  = document.createElement('span'); wrap.className = 'icon-art';
	const tile  = document.createElement('span'); tile.className = 'icon-tile';
	const bloom = document.createElement('img');  bloom.className = 'icon-bloom'; bloom.alt = ''; bloom.decoding = 'async';
	const sharp = document.createElement('img');  sharp.className = 'icon-sharp'; sharp.alt = ''; sharp.decoding = 'async';
	tile.appendChild(bloom); tile.appendChild(sharp); wrap.appendChild(tile);
	return { wrap, bloom, sharp };
}

// Tile for the link at `url`: local glyph first, then the resolved icon.
function iconArt(url) {
	const { wrap, bloom, sharp } = iconArtShell();
	const domain = domainFrom(url);
	renderIdenticon(bloom, sharp, domain);
	applyFavicon(sharp, url, () => renderIdenticon(bloom, sharp, domain));
	sharp.addEventListener('load', () => {
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
