// ─────────────────────────────────────────────────────────────────────
// Grid — where desktop icons sit on this screen. It knows cells, not what
// the icons are: callers hand it the icons ({ key, x, row }) and get back
// cells and pixels. state.js saves where icons are; desktop.js draws them.
// ─────────────────────────────────────────────────────────────────────
// The desktop grid in px, read from its custom properties in desktop.css:
// the least side margin and the top, each cell's size, and the icon tile's
// width.
const GRID  = (() => {
	const css = getComputedStyle(document.documentElement);
	const px  = name => parseFloat(css.getPropertyValue(name));
	return { ox: px('--grid-left'), oy: px('--grid-top'), uw: px('--cell-w'), uh: px('--cell-h'), tile: px('--tile-w') };
})();

// The grid is centred on the screen and spans it, --grid-left in from each
// side: columns are --cell-w wide give or take a little, as many as fill the
// width exactly (an even number, half each side of the centre line), so the
// margins are the same on every screen. An icon's place is saved as `x`,
// its column counted from the centre line (…, -2, -1 left of it; 0, 1, …
// right of it), and `row`, counted from the top. A layout so keeps its
// shape, centred, on any screen. Rows stop above the dock.
//
// Older saves, and config.js, place icons by `col`, counted from the left
// edge; each is read once, against the screen it first opens on.
//
// Icons are one size everywhere, the dock's. Rows are --cell-h apart, closing
// up to GRID_MIN_ROW_H to hold GRID_ROWS of them between the menu bar and the
// dock; no closer, so a label never crowds the icon below. A screen too short
// even then has fewer rows, spaced out to fill it, and icons that don't fit
// wrap into the next column (layoutIcons). Phones lay icons out in their own
// grid (mobile.css).
const GRID_ROWS      = 5;
const GRID_MIN_ROW_H = 112;   // px: an icon and its label, with air under it
const DOCK_ROOM      = 110;   // px the dock takes at the bottom, before it's drawn

function dockTop() {
	const dock = document.getElementById('dock');
	if (dock && dock.children.length && dock.offsetHeight) return dock.getBoundingClientRect().top;
	return innerHeight - DOCK_ROOM;
}

function gridSize() {
	const room = dockTop() - GRID.oy;
	// The even number of columns nearest to fitting at --cell-w, then
	// stretched or squeezed to fill the width, never narrower than a tile.
	const span = innerWidth - 2 * GRID.ox;
	let cols = Math.max(2, 2 * Math.round(span / GRID.uw / 2));
	while (cols > 2 && span / cols < GRID.tile) cols -= 2;
	const uw = span / cols;
	const fit = Math.max(1, Math.floor(room / GRID_MIN_ROW_H));   // most rows that fit
	const uh = fit >= GRID_ROWS
		? Math.min(GRID.uh, Math.max(GRID_MIN_ROW_H, room / GRID_ROWS))
		: Math.min(GRID.uh, room / fit);                           // fewer rows, spread out
	return {
		uw, uh,
		half: cols / 2,
		rows: Math.max(1, Math.floor(room / uh + 1e-6)),
	};   // columns x = -half … half-1, rows 0 … rows-1
}

// Where a cell's icon tile sits, in px: centred in its cell.
const cellLeft = (x,   g = gridSize()) => innerWidth / 2 + x * g.uw + (g.uw - GRID.tile) / 2;
const cellTop  = (row, g = gridSize()) => GRID.oy + row * g.uh;

// The cell under a point, kept inside the grid.
function cellAt(px, py) {
	const { half, rows, uw, uh } = gridSize();
	return {
		x:   Math.min(half - 1, Math.max(-half, Math.floor((px - innerWidth / 2) / uw))),
		row: Math.min(rows - 1, Math.max(0,     Math.floor((py - GRID.oy) / uh))),
	};
}

// Where each of `icons` shows on this screen, by key. Only the display moves; the
// saved cells stay, for a screen they fit on. On a screen too small for
// them, each side keeps its order:
//   • too narrow: the side's icons slide in together, as far as the
//     outermost needs;
//   • too short: the side's icons wrap, in reading order (down each column,
//     from the outer edge in), into columns as tall as the screen allows.
// Any that still don't fit (where the two sides meet) take the nearest free
// cell.
function layoutIcons(icons) {
	const { half, rows } = gridSize();
	const placed = icons.filter(i => i.x != null && i.row != null);
	const xs = placed.map(i => i.x);
	const inL = Math.max(0, -half - Math.min(0, ...xs));        // how far the left side slides right
	const inR = Math.max(0, Math.max(-1, ...xs) - (half - 1));  // and the right side, left
	const want = placed.map(i => ({ key: i.key, x: i.x < 0 ? i.x + inL : i.x - inR, row: i.row, left: i.x < 0 }));
	[true, false].forEach(left => {
		const side = want.filter(c => c.left === left);
		if (!side.some(c => c.row >= rows)) return;
		const inward = left ? 1 : -1;
		side.sort((a, b) => (a.x - b.x) * inward || a.row - b.row);
		const edge = side[0].x;
		side.forEach((c, k) => { c.x = edge + inward * Math.floor(k / rows); c.row = k % rows; });
	});
	const taken = new Set(), at = new Map(), astray = [];
	const id = (x, row) => x + ',' + row;
	let spill = 0;
	want.forEach(i => {
		const fits = i.x >= -half && i.x < half && i.row >= 0 && i.row < rows;
		if (fits && !taken.has(id(i.x, i.row))) { taken.add(id(i.x, i.row)); at.set(i.key, { x: i.x, row: i.row }); }
		else astray.push(i);
	});
	astray.forEach(i => {
		let best = null, bestD = Infinity;
		for (let row = 0; row < rows; row++)
			for (let x = -half; x < half; x++) {
				if (taken.has(id(x, row))) continue;
				const d = (x - i.x) ** 2 + (row - i.row) ** 2;
				if (d < bestD) { bestD = d; best = { x, row }; }
			}
		// Every cell taken: rows below the last, for a taller screen.
		if (!best) { best = { x: -half + spill % (half * 2), row: rows + Math.floor(spill / (half * 2)) }; spill++; }
		taken.add(id(best.x, best.row)); at.set(i.key, best);
	});
	return at;
}

// The first free cell among `icons`, reading from the top left, for a new
// one: free both where they're saved and where they show.
function nextFreeCell(icons) {
	const { half, rows } = gridSize();
	const used = new Set();
	icons.forEach(i => { if (i.x != null) used.add(i.x + ',' + i.row); });
	layoutIcons(icons).forEach(c => used.add(c.x + ',' + c.row));
	for (let row = 0; row < Math.max(rows, 100); row++)
		for (let x = -half; x < half; x++)
			if (!used.has(x + ',' + row)) return { x, row };
	return { x: -half, row: 0 };
}
