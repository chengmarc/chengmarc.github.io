// ─────────────────────────────────────────────────────────────────────
// Windows — All Apps, Settings and About share one manager: opening and
// closing, focus and stacking, dragging, and where each one sits.
// ─────────────────────────────────────────────────────────────────────
// Each window is a fixed element placed with left/top. Open windows form a
// stack, bottom to top: the last one focused is on top and marked .focused,
// the rest look inactive (grey traffic lights, as on macOS). Escape closes the
// top one (app.js). A window opens centred the first time, then where it was
// left, until the page reloads.
const WINDOW_Z_BASE = 400;   // above the dock (100) and the menu bar (200)

const windows     = {};      // id → { el, root, onOpen, onClose, pos }
const windowStack = [];      // ids of the open windows, bottom → top

// el:   the element that moves and stacks.
// root: the element that carries .open, if not el (All Apps keeps its mode
//       classes on an outer wrapper).
// bar:  the drag handle.
function registerWindow(id, { el, root = el, bar, onOpen, onClose }) {
	const w = windows[id] = { el, root, onOpen, onClose, pos: null };
	el.classList.add('window');
	// Red and yellow both close; green does nothing.
	bar.querySelectorAll('.tl-close, .tl-minimize').forEach(tl =>
		tl.addEventListener('click', e => { e.stopPropagation(); closeWindow(id); }));
	// Capture, so a click anywhere in the window raises it before the click
	// itself is handled.
	el.addEventListener('pointerdown', () => focusWindow(id), true);
	// Dragged by the title bar (not by its buttons or fields), within the
	// bounds placeWindow keeps; .grabbing holds the grabbing cursor meanwhile.
	let grab = null;
	bar.addEventListener('pointerdown', e => {
		if (e.target.closest('button, input, select')) return;
		const r = el.getBoundingClientRect();
		grab = { dx: e.clientX - r.left, dy: e.clientY - r.top };
		el.classList.add('grabbing');
		bar.setPointerCapture(e.pointerId);
	});
	bar.addEventListener('pointermove', e => {
		if (grab) w.pos = placeWindow(w, e.clientX - grab.dx, e.clientY - grab.dy);
	});
	const release = () => { grab = null; el.classList.remove('grabbing'); };
	bar.addEventListener('pointerup', release);
	bar.addEventListener('lostpointercapture', release);
}

const isWindowOpen = id => windowStack.includes(id);
const topWindow    = () => windowStack[windowStack.length - 1] || null;

function restackWindows() {
	windowStack.forEach((id, i) => {
		windows[id].el.style.zIndex = WINDOW_Z_BASE + i;
		windows[id].el.classList.toggle('focused', i === windowStack.length - 1);
	});
}

function focusWindow(id) {
	if (!isWindowOpen(id) || topWindow() === id) return;
	windowStack.splice(windowStack.indexOf(id), 1);
	windowStack.push(id);
	restackWindows();
}

// Open, or raise if already open.
function openWindow(id) {
	const w = windows[id];
	if (isWindowOpen(id)) { focusWindow(id); return; }
	w.root.classList.add('open');
	windowStack.push(id);
	restackWindows();
	if (w.pos) w.pos = placeWindow(w, w.pos.left, w.pos.top);
	else centerWindow(w.el);
	w.onOpen && w.onOpen();
}

function closeWindow(id) {
	const w = windows[id];
	if (!isWindowOpen(id)) return;
	w.root.classList.remove('open');
	w.el.classList.remove('focused');
	windowStack.splice(windowStack.indexOf(id), 1);
	restackWindows();
	w.onClose && w.onClose();
}

// From a menu item or dock icon: close the window if it's the one in front,
// otherwise open it or bring it forward.
function toggleWindow(id) {
	if (topWindow() === id) closeWindow(id); else openWindow(id);
}

// Centred, nudged up 8% of the height, and clear of the menu bar.
function centerWindow(el) {
	const uplift = innerHeight * 0.08;
	el.style.left = Math.round((innerWidth - el.offsetWidth) / 2) + 'px';
	el.style.top  = Math.round(Math.max(40, (innerHeight - uplift - el.offsetHeight) / 2)) + 'px';
}

// Place a window, kept on screen: at least 80px across stays visible, and
// the title bar stays between the menu bar and the bottom edge. Returns
// where it landed.
function placeWindow(w, left, top) {
	left = Math.min(innerWidth  - 80, Math.max(80 - w.el.offsetWidth, left));
	top  = Math.min(innerHeight - 44, Math.max(36, top));
	w.el.style.left = left + 'px';
	w.el.style.top  = top  + 'px';
	return { left, top };
}

// A smaller screen pulls open windows back into view.
window.addEventListener('resize', () => {
	windowStack.forEach(id => {
		const w = windows[id];
		const at = placeWindow(w, parseFloat(w.el.style.left) || 0, parseFloat(w.el.style.top) || 0);
		if (w.pos) w.pos = at;
	});
});
