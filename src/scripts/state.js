// ─────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────
// config.js holds the default content only: desktop icons, dock links and
// categories. What the OS itself fixes (the grid, the built-in dock apps) is
// set here in code.
const CFG   = window.WEBOS_CONFIG;
const STORE = 'webos_v1';
const WELCOME = 'webos_welcome';
// The desktop grid in px: where the first cell sits, and each cell's size.
// Matches the icon tile in icons.css.
const GRID  = { ox: 24, oy: 55, uw: 120, uh: 124 };

let S = {};
let desktopEditing = false;
let bmEditing      = false;
let pickMode       = false;

// ─────────────────────────────────────────────────────────────────────
// Grid utilities
// ─────────────────────────────────────────────────────────────────────
function nextFreeCell(occupied) {
	const maxCols = Math.max(1, Math.floor((window.innerWidth - GRID.ox) / GRID.uw));
	for (let row = 0; row < 100; row++)
		for (let col = 0; col < maxCols; col++)
			if (!occupied.has(col + ',' + row)) return { col, row };
	return { col: 0, row: 0 };
}

function occupiedCells() {
	return new Set(S.desktopIcons.filter(i => i.col != null).map(i => i.col + ',' + i.row));
}

function ensureIconPositions() {
	const occupied = occupiedCells();
	S.desktopIcons.forEach(icon => {
		if (icon.col == null || icon.row == null) {
			const { col, row } = nextFreeCell(occupied);
			icon.col = col; icon.row = row;
			occupied.add(col + ',' + row);
		}
	});
}

// ─────────────────────────────────────────────────────────────────────
// Persistence
// ─────────────────────────────────────────────────────────────────────

// Collapse to one section of categories, each with a flat link list.
// Handles both the original nested shape (rows + moreLinks) and the
// already-normalized shape, so it's safe to run on any saved state.
function normalizeBookmarks() {
	const blocks = [];
	(S.bookmarkSections || []).forEach(sec => (sec.blocks || []).forEach(b => {
		const flat = [];
		(b.links || []).concat(b.moreLinks || []).forEach(row => {
			if (Array.isArray(row)) row.forEach(l => l && flat.push(l));
			else if (row) flat.push(row);
		});
		blocks.push({ title: b.title, links: flat });
	}));
	S.bookmarkSections = [{ blocks }];
}

// Icons are resolved from each item's URL. Older saves and configs carried a
// `favicon` field; strip it so it never resurfaces in an export.
function dropIconFields() {
	S.desktopIcons.forEach(i => { delete i.favicon; });
	// `locked` is gone too: only the built-in apps are undeletable now.
	S.dock.forEach(i => { if (i && i !== 'separator') { delete i.favicon; delete i.locked; } });
}

// All Apps and Settings are dock items like any other ({ app: id }), so they
// can be moved, but never deleted. A dock saved or imported without them gets
// them back where the default dock has them: All Apps first, set off by a
// separator, and Settings last.
function ensureDockApps() {
	const has = app => S.dock.some(i => i && i.app === app);
	if (!has('allApps')) S.dock.unshift({ app: 'allApps' }, ...(S.dock[0] === 'separator' ? [] : ['separator']));
	if (!has('settings')) S.dock.push({ app: 'settings' });
}

// Replace the whole state with a config's icons, dock and bookmarks.
function replaceState(cfg) {
	S = clone({ desktopIcons: cfg.desktopIcons, dock: cfg.dock, bookmarkSections: cfg.bookmarkSections });
	ensureDockApps();
	ensureIconPositions();
	normalizeBookmarks();
	dropIconFields();
	saveState();
}

function loadState() {
	try {
		const raw = localStorage.getItem(STORE);
		if (raw) { S = JSON.parse(raw); ensureDockApps(); ensureIconPositions(); normalizeBookmarks(); dropIconFields(); saveState(); return; }
		// Nothing saved: a first run. Flag it so the welcome window shows until
		// the user picks an option, even if this tab is closed first.
		else localStorage.setItem(WELCOME, '1');
	} catch (_) {}
	replaceState(CFG);
}

function saveState() { localStorage.setItem(STORE, JSON.stringify(S)); }

// ─────────────────────────────────────────────────────────────────────
// Config import / export
// ─────────────────────────────────────────────────────────────────────
// Ask for a config.js file and hand its parsed WEBOS_CONFIG to onConfig.
function importConfig(onConfig) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.js';
	input.addEventListener('change', function () {
		const file = this.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				// Parse as data, never execute: strip the `window.WEBOS_CONFIG = … ;`
				// wrapper that exportConfig writes and read the rest as JSON.
				const json = e.target.result.trim()
					.replace(/^window\.WEBOS_CONFIG\s*=\s*/, '')
					.replace(/;\s*$/, '');
				const cfg = JSON.parse(json);
				if (!cfg || !cfg.desktopIcons || !cfg.dock || !cfg.bookmarkSections) {
					alert(t('error.invalidConfig'));
					return;
				}
				onConfig(cfg);
			} catch (err) {
				alert(t('error.importFailed', { msg: err.message }));
			}
		};
		reader.readAsText(file);
	});
	input.click();
}

function exportConfig() {
	const config = {
		desktopIcons: S.desktopIcons,
		dock: S.dock,
		bookmarkSections: S.bookmarkSections,
	};
	const content = 'window.WEBOS_CONFIG = ' + JSON.stringify(config, null, 2) + ';\n';
	const blob = new Blob([content], { type: 'text/javascript' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url; a.download = 'config.js'; a.click();
	URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────
// Browser bookmark sync (extension only)
// ─────────────────────────────────────────────────────────────────────
// The extension API object, or null on the website. `chrome` exists on any
// Chrome page, so check for `permissions`, which only extension pages get.
const EXT_API = (globalThis.browser && globalThis.browser.permissions) ? globalThis.browser
	: (globalThis.chrome && globalThis.chrome.permissions) ? globalThis.chrome : null;

// Read the browser's Bookmarks bar as a config. Each folder in the bar becomes
// a category holding every link beneath it, however deep; loose links in the
// bar become desktop icons and also fill an "Uncategorized" category. The dock
// is kept as is. Needs the `bookmarks` permission already granted.
function readBrowserBookmarks() {
	return EXT_API.bookmarks.getTree().then(tree => {
		const bar = tree[0].children.find(n => n.folderType === 'bookmarks-bar' || n.id === 'toolbar_____' || n.id === '1');
		if (!bar) throw new Error(t('error.noBookmarksBar'));

		// Only links the page can open; skips Firefox `place:` queries, bookmarklets, etc.
		const isLink = n => n.url && /^https?:/i.test(n.url);
		const toLink = n => ({ label: n.title || domainFrom(n.url), url: n.url });
		const linksUnder = n => isLink(n) ? [toLink(n)] : (n.children || []).flatMap(linksUnder);

		const desktopIcons = [], blocks = [], loose = [], seen = new Set();
		(bar.children || []).forEach((n, i) => {
			if (isLink(n)) {
				if (seen.has(n.url)) return;
				seen.add(n.url);
				const { label, url } = toLink(n);
				loose.push({ label, url });
				desktopIcons.push({ key: 'icon-' + domainFrom(url).replace(/\./g, '-') + '-' + i, label, url });
			} else if (n.children) {
				blocks.push({ title: n.title, links: linksUnder(n) });
			}
		});
		// A bar with no links at all would wipe the desktop and every category,
		// silently and on every new tab under Always sync: refuse instead.
		if (!loose.length && !blocks.some(b => b.links.length)) throw new Error(t('error.emptyBookmarksBar'));
		// Loose links also get a category, so All Apps lists and searches them.
		if (loose.length) blocks.push({ title: t('apps.uncategorized'), links: loose });
		return keepIconPositions({ desktopIcons, dock: S.dock, bookmarkSections: [{ blocks }] });
	});
}

// A synced icon whose URL is already on the desktop keeps that icon's key and
// grid cell; the rest are left unplaced, for replaceState to put in free cells.
function keepIconPositions(cfg) {
	const current = new Map(S.desktopIcons.map(i => [i.url, i]));
	cfg.desktopIcons.forEach(icon => {
		const old = current.get(icon.url);
		if (old) { icon.key = old.key; icon.col = old.col; icon.row = old.row; }
	});
	return cfg;
}

// Sync once, from a click: hand the Bookmarks bar's config to onConfig.
// `bookmarks` is an optional permission, requested here — first thing, since
// Firefox only allows it straight off a click.
// `ask` = false skips the replace warning, for when the user already chose to sync.
function syncFromBrowser(onConfig, ask = true) {
	EXT_API.permissions.request({ permissions: ['bookmarks'] }).then(granted => {
		if (!granted) return;
		if (ask && !confirm(t('confirm.sync'))) return;
		return readBrowserBookmarks().then(onConfig);
	}).catch(err => alert(t('error.syncFailed', { msg: err.message })));
}
