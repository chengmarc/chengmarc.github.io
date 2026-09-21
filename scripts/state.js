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
let pickTarget     = 'desktop'; // 'desktop' | 'dock'

const clone = obj => JSON.parse(JSON.stringify(obj));
const $ = id => document.getElementById(id);

// Terse element builder: el('button', { class, text, data:{…}, href… }, ...children).
// 'class'/'text'/'html'/'data' are special-cased; any other key is set as a
// property (href, target, rel, title, onclick, draggable…).
function el(tag, props = {}, ...kids) {
	const node = document.createElement(tag);
	for (const k in props) {
		if      (k === 'class') node.className   = props[k];
		else if (k === 'text')  node.textContent = props[k];
		else if (k === 'html')  node.innerHTML   = props[k];
		else if (k === 'data')  Object.assign(node.dataset, props[k]);
		else                    node[k] = props[k];
	}
	kids.forEach(c => c && node.appendChild(c));
	return node;
}

// Drag "ghost": a fixed-position clone of an icon that follows the pointer.
function makeDragClone(node, rect) {
	const c = node.cloneNode(true);
	Object.assign(c.style, {
		position: 'fixed', left: rect.left+'px', top: rect.top+'px',
		width: rect.width+'px', height: rect.height+'px',
		zIndex: 999, opacity: 0.85, pointerEvents: 'none',
		transform: 'scale(1.1)', transition: 'none',
	});
	document.body.appendChild(c);
	return c;
}

function domainFrom(url) {
	try { return new URL(url).hostname.replace(/^www\./, ''); } catch (_) { return url; }
}

// Drag a floating window by a grab bar, clamped so it can't leave the screen:
// ≥80px stays visible horizontally, and the bar is topped 36px from the top
// (under the menu bar) / 44px from the bottom. `setPos(left, top)` applies the
// clamped absolute position — windows differ in coordinate model (a centered
// element nudged with `translate` vs. absolute `left`/`top`), so each supplies
// its own setter. `grabEl` gets the `grabbing` class for the duration of a drag.
function makeWindowDraggable(bar, win, grabEl, setPos) {
	let active = false, offX = 0, offY = 0;
	bar.addEventListener('pointerdown', e => {
		if (e.target.closest('button, input')) return;
		active = true;
		const r = win.getBoundingClientRect();
		offX = e.clientX - r.left;
		offY = e.clientY - r.top;
		grabEl.classList.add('grabbing');
		bar.setPointerCapture(e.pointerId);
	});
	bar.addEventListener('pointermove', e => {
		if (!active) return;
		let left = e.clientX - offX, top = e.clientY - offY;
		left = Math.min(innerWidth  - 80, Math.max(80 - win.offsetWidth, left));
		top  = Math.min(innerHeight - 44, Math.max(36, top));
		setPos(left, top);
	});
	const end = () => { active = false; grabEl.classList.remove('grabbing'); };
	bar.addEventListener('pointerup', end);
	bar.addEventListener('lostpointercapture', end);
}

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

function findFreeCell() {
	return nextFreeCell(occupiedCells());
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

function loadState() {
	try {
		const raw = localStorage.getItem(STORE);
		if (raw) { S = JSON.parse(raw); ensureIconPositions(); normalizeBookmarks(); saveState(); return; }
	} catch (_) {}
	S = clone({
		desktopIcons:     CFG.desktopIcons,
		dock:             CFG.dock,
		bookmarkSections: CFG.bookmarkSections,
	});
	ensureIconPositions();
	normalizeBookmarks();
	saveState();
}

function saveState() { localStorage.setItem(STORE, JSON.stringify(S)); }

// ─────────────────────────────────────────────────────────────────────
// Config import / export
// ─────────────────────────────────────────────────────────────────────
function importConfig() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.js';
	input.addEventListener('change', function () {
		const file = this.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const sandbox = {};
				new Function('window', e.target.result)(sandbox);
				const cfg = sandbox.WEBOS_CONFIG;
				if (!cfg || !cfg.desktopIcons || !cfg.dock || !cfg.bookmarkSections) {
					alert('Invalid config.js — missing required fields.');
					return;
				}
				S = clone({ desktopIcons: cfg.desktopIcons, dock: cfg.dock, bookmarkSections: cfg.bookmarkSections });
				ensureIconPositions();
				normalizeBookmarks();
				millerSel = 0;
				saveState();
				renderDesktopIcons(); renderDock(); renderAllBookmarks();
				exitDesktopEdit();
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
