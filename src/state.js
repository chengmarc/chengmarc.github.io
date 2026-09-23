// ─────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────
const CFG   = window.WEBOS_CONFIG;
const STORE = 'webos_v1';
const GRID  = CFG.grid;

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

// Replace the whole state with a config's icons, dock and bookmarks.
function replaceState(cfg) {
	S = clone({ desktopIcons: cfg.desktopIcons, dock: cfg.dock, bookmarkSections: cfg.bookmarkSections });
	ensureIconPositions();
	normalizeBookmarks();
	saveState();
}

function loadState() {
	try {
		const raw = localStorage.getItem(STORE);
		if (raw) { S = JSON.parse(raw); ensureIconPositions(); normalizeBookmarks(); saveState(); return; }
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
					alert('Invalid config.js — missing required fields.');
					return;
				}
				onConfig(cfg);
			} catch (err) {
				alert('Failed to import config: ' + err.message);
			}
		};
		reader.readAsText(file);
	});
	input.click();
}

function exportConfig() {
	const config = {
		grid: CFG.grid,
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
