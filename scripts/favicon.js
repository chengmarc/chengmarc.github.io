// ─────────────────────────────────────────────────────────────────────
// Favicon fetching
// ─────────────────────────────────────────────────────────────────────
const FAVICON_STORE = 'webos_favicons';
// Legacy sentinel: older builds persisted this when every favicon source
// failed, which left blocked favicons stuck on the identicon forever — a
// page loaded once from an internet-restricted network would never retry,
// even after moving to a free one. We now track failures in memory only
// and strip any of these stale sentinels on load so those domains recover.
const NO_FAVICON = '__no_favicon__';
const faviconCache = (() => {
	try {
		const c = JSON.parse(localStorage.getItem(FAVICON_STORE) || '{}');
		for (const d in c) if (c[d] === NO_FAVICON) delete c[d];
		return c;
	} catch(_) { return {}; }
})();

// Domains whose every favicon source failed this session. Kept in memory
// only — never persisted — so a favicon that was merely blocked (e.g. the
// page was loaded behind a network that filters the CDN) is retried on the
// next visit instead of being stuck on the identicon forever.
const faviconFailed = new Set();

// Stage 1 (the site's own domain) should answer fast if it answers at all —
// a blocked host never will, so a short cap just falls through to stage 2
// sooner. Stage 2 (Google s2) and a cached URL are off the boot path, so
// they get plenty of room.
const STAGE1_TIMEOUT = 1000;
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

// Resolve `domain`'s favicon onto the tile's sharp <img>. `onFail` re-asserts
// the local glyph when nothing loads.
function applyFavicon(sharp, domain, onFail) {
	if (faviconFailed.has(domain)) { onFail && onFail(); return; }

	const remember = url => {
		faviconCache[domain] = url;
		try { localStorage.setItem(FAVICON_STORE, JSON.stringify(faviconCache)); } catch (_) {}
	};
	const showFavicon = url => {
		faviconFailed.delete(domain);
		sharp.src = url;
		remember(url);
	};
	const isS2Placeholder = (url, size) => (
		url.includes('google.com/s2/favicons') &&
		size &&
		size.width <= 16 &&
		size.height <= 16
	);

	// Fast path: the URL that worked on a prior visit. Verify it still loads
	// (a cached URL can 404 after a redesign) before committing.
	const cached = faviconCache[domain];
	if (cached) {
		probeImage(cached, CACHE_TIMEOUT, (ok, size) => {
			if (ok && !isS2Placeholder(cached, size)) showFavicon(cached);
			else { delete faviconCache[domain]; applyFavicon(sharp, domain, onFail); }
		});
		return;
	}

	// Stage 1 — try the most frequent same-origin favicon paths found by
	// crawling the bookmark set's <link>, manifest, and legacy icon metadata.
	// No scoring: the FIRST entry in this order that loads wins, so the order
	// IS the preference. Each icon's requests all go to one host, spread across
	// ~20 hosts, so nothing piles up.
	const CANDIDATES = [
		'https://' + domain + '/favicon.ico',
		'https://' + domain + '/apple-touch-icon.png',
		'https://' + domain + '/favicon.svg',
		'https://' + domain + '/safari-pinned-tab.svg',
	];
	// Stage 2 — only if every path above missed: Google's s2 service, which
	// reads <link rel=icon> for sites that serve no root file.
	const S2_URL = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64';

	// results[i]: undefined = in flight, true = loaded, false = failed.
	const results = new Array(CANDIDATES.length);
	let decided = false;

	const decide = () => {
		if (decided) return;
		for (let i = 0; i < CANDIDATES.length; i++) {
			if (results[i] === true) { decided = true; showFavicon(CANDIDATES[i]); return; }
			if (results[i] === undefined) return;   // a higher preference may still land
		}
		// Stage 1 missed everything → stage 2.
		decided = true;
		probeImage(S2_URL, PROBE_TIMEOUT, (ok, size) => {
			if (ok && !isS2Placeholder(S2_URL, size)) showFavicon(S2_URL);
			else { faviconFailed.add(domain); onFail && onFail(); }
		});
	};

	CANDIDATES.forEach((url, i) => probeImage(url, STAGE1_TIMEOUT, ok => {
		results[i] = ok;
		decide();
	}));
}

// ─────────────────────────────────────────────────────────────────────
// Static app-icon fallback
// ─────────────────────────────────────────────────────────────────────
// Polished local SVG tiles, chosen deterministically from the domain. They
// appear only when every favicon route fails, so restricted networks still get
// icons that look intentional without generating SVG artwork at runtime.
const FALLBACK_ICON_BASE = 'media/icons_fallback/';
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

// Shared scaffold: span.icon-art wrapping a blurred bloom + a crisp sharp img.
function iconArtShell() {
	const wrap  = document.createElement('span'); wrap.className = 'icon-art';
	const bloom = document.createElement('img');  bloom.className = 'icon-bloom'; bloom.alt = ''; bloom.decoding = 'async';
	const sharp = document.createElement('img');  sharp.className = 'icon-sharp'; sharp.alt = ''; sharp.decoding = 'async';
	wrap.appendChild(bloom); wrap.appendChild(sharp);
	return { wrap, bloom, sharp };
}

function iconArt(domain) {
	const { wrap, bloom, sharp } = iconArtShell();
	renderIdenticon(bloom, sharp, domain);
	applyFavicon(sharp, domain, () => renderIdenticon(bloom, sharp, domain));
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

// All-Bookmarks launcher uses the site's own favicon (a 3×3 grid),
// rendered through the same tile pipeline as every other icon.
const ALL_APPS_ICON = 'media/favicon-directory.svg';
