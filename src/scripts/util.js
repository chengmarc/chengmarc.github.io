// ─────────────────────────────────────────────────────────────────────
// DOM and URL helpers — no app state; every other script builds on these
// ─────────────────────────────────────────────────────────────────────
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
