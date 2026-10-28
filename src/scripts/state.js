// ─────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────
// config.js holds the default content only: desktop icons, dock links and
// categories. What the OS itself fixes (the grid, the built-in dock apps) is
// set here in code.
const CFG   = window.WEBOS_CONFIG;
const STORE = 'webos_v1';
// The desktop grid in px, read from its custom properties in desktop.css:
// where the first cell sits, each cell's size, and the icon tile's width.
const GRID  = (() => {
	const css = getComputedStyle(document.documentElement);
	const px  = name => parseFloat(css.getPropertyValue(name));
	return { ox: px('--grid-left'), oy: px('--grid-top'), uw: px('--cell-w'), uh: px('--cell-h'), tile: px('--tile-w') };
})();

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

// All Apps and Settings are dock items like any other ({ app: id }), so they
// can be moved, but never deleted. A dock saved or imported without them gets
// them back where the default dock has them: All Apps first, set off by a
// separator, and Settings last.
function ensureDockApps() {
	const has = app => S.dock.some(i => i && i.app === app);
	if (!has('allApps')) S.dock.unshift({ app: 'allApps' }, ...(S.dock[0] === 'separator' ? [] : ['separator']));
	if (!has('settings')) S.dock.push({ app: 'settings' });
}

function replaceState(cfg) {
	S = clone({ desktopIcons: cfg.desktopIcons, dock: cfg.dock, bookmarkSections: cfg.bookmarkSections });
	ensureDockApps();
	ensureIconPositions();
	normalizeBookmarks();
	saveState();
}

// True on a first run: nothing was saved, so the defaults are loaded.
function loadState() {
	let raw = null;
	try {
		raw = localStorage.getItem(STORE);
		if (raw) { S = JSON.parse(raw); ensureDockApps(); ensureIconPositions(); normalizeBookmarks(); saveState(); return false; }
	} catch (_) {}
	replaceState(CFG);
	return !raw;
}

function saveState() { localStorage.setItem(STORE, JSON.stringify(S)); }

// ─────────────────────────────────────────────────────────────────────
// Config import / export
// ─────────────────────────────────────────────────────────────────────
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
