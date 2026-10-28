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
