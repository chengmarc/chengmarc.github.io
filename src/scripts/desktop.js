// ─────────────────────────────────────────────────────────────────────
// Desktop icon element factory
// ─────────────────────────────────────────────────────────────────────
function makeIconEl(item) {
	return el('a', { class: 'desktop-icon', href: item.url, target: '_blank', rel: 'noopener noreferrer', data: { key: item.key } },
		el('button', { class: 'icon-delete', text: '✕', data: { key: item.key } }),
		el('div', { class: 'icon-img-wrap' }, iconArt(item.url)),
		el('span', { class: 'desktop-icon-label', text: item.label }),
	);
}

// ─────────────────────────────────────────────────────────────────────
// Render: desktop icons
// ─────────────────────────────────────────────────────────────────────
// Each icon in the cell it shows in on this screen (layoutIcons, state.js).
function renderDesktopIcons() {
	const grid = $('desktopGrid');
	Array.from(grid.children).forEach(c => { if (!c.classList.contains('desktop-icon-ghost')) c.remove(); });
	const g = gridSize();
	const at = layoutIcons();
	S.desktopIcons.forEach(item => {
		const cell = at.get(item.key);
		if (!cell) return;
		const a = makeIconEl(item);
		Object.assign(a.style, { position: 'absolute', left: cellLeft(cell.x, g) + 'px', top: cellTop(cell.row, g) + 'px' });
		grid.appendChild(a);
	});
}

// The grid spans the screen, its rows close up on a short one, and it stops
// above the dock, so a new window size can mean new cells: lay the icons
// out again, once a frame at most. Set up once the desktop is loaded (app.js):
// a resize can come before that.
function setupDesktopRelayout() {
	let frame = 0;
	window.addEventListener('resize', () => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(renderDesktopIcons);
	});
}

// ─────────────────────────────────────────────────────────────────────
// Render: dock
// ─────────────────────────────────────────────────────────────────────
// The built-in apps a dock item can be ({ app: id }): icon and title key.
// What a click does is in app.js.
const DOCK_APP_INFO = {
	allApps:  { icon: 'src/icons/all-apps.svg', title: 'apps.title' },
	settings: { icon: 'src/icons/settings.svg', title: 'menu.settings' },
};

function renderDock() {
	const dock = $('dock');
	dock.innerHTML = '';

	S.dock.forEach((item, dockIdx) => {
		if (item === 'separator') {
			dock.appendChild(el('div', { class: 'dock-sep' }));
			return;
		}
		const app = DOCK_APP_INFO[item.app];
		if (app) {
			dock.appendChild(el('button', { class: 'dock-icon dock-app', title: t(app.title), data: { dockIdx, app: item.app, i18nTitle: app.title } },
				iconArtFromSrc(app.icon)));
			return;
		}
		const a = el('a', { class: 'dock-icon', href: item.url, target: '_blank', rel: 'noopener noreferrer', title: item.label, data: { dockIdx } });

		a.appendChild(el('button', { class: 'dock-icon-delete', text: '✕', data: { dockIdx } }));

		a.appendChild(iconArt(item.url));
		dock.appendChild(a);
	});
}

// ─────────────────────────────────────────────────────────────────────
// Desktop edit mode
// ─────────────────────────────────────────────────────────────────────
let desktopEditing = false;

function enterDesktopEdit() {
	desktopEditing = true;
	$('desktop').classList.add('editing');
	$('dock').classList.add('editing');
	const btn = $('mbEdit');
	btn.classList.add('active'); btn.textContent = t('menu.doneEditing');
}

function exitDesktopEdit() {
	desktopEditing = false;
	$('desktop').classList.remove('editing');
	$('dock').classList.remove('editing');
	const btn = $('mbEdit');
	btn.classList.remove('active'); btn.textContent = t('menu.editDesktop');
}

const toggleDesktopEdit = () => desktopEditing ? exitDesktopEdit() : enterDesktopEdit();

// ─────────────────────────────────────────────────────────────────────
// Clicks on the desktop, the dock and Edit Desktop
// ─────────────────────────────────────────────────────────────────────
// A ✕ removes its icon; in edit mode, icons don't open. A dock link opens
// itself; a built-in app ({ app: id }) is opened by openApp(id), which the
// caller hands in (the apps' windows load after this file).
function setupDesktopClicks(openApp) {
	$('mbEdit').addEventListener('click', toggleDesktopEdit);
	// Its label says which mode it's in, as well as the language.
	onLanguageChange(() => { $('mbEdit').textContent = t(desktopEditing ? 'menu.doneEditing' : 'menu.editDesktop'); });

	$('desktopGrid').addEventListener('click', e => {
		const del  = e.target.closest('.icon-delete');
		const icon = e.target.closest('.desktop-icon');
		if (del)  { e.preventDefault(); e.stopPropagation(); removeDesktopIcon(del.dataset.key); return; }
		if (desktopEditing && icon) e.preventDefault();
	});

	$('dock').addEventListener('click', e => {
		const del  = e.target.closest('.dock-icon-delete');
		const icon = e.target.closest('.dock-icon');
		if (del) { e.preventDefault(); e.stopPropagation(); removeDockItem(+del.dataset.dockIdx); return; }
		if (!icon) return;
		if (desktopEditing) { e.preventDefault(); return; }
		if (icon.dataset.app) openApp(icon.dataset.app);
		icon.classList.remove('bouncing');
		void icon.offsetWidth;
		icon.classList.add('bouncing');
		icon.addEventListener('animationend', () => icon.classList.remove('bouncing'), { once: true });
	});
}

// ─────────────────────────────────────────────────────────────────────
// Desktop icon mutations
// ─────────────────────────────────────────────────────────────────────
function removeDesktopIcon(key) {
	S.desktopIcons = S.desktopIcons.filter(i => i.key !== key);
	saveState(); renderDesktopIcons();
}

function addDesktopIcon(label, url) {
	const domain = domainFrom(url);
	if (S.desktopIcons.some(i => i.url === url)) return false;
	const { x, row } = nextFreeCell();
	S.desktopIcons.push({ key: 'icon-' + domain.replace(/\./g, '-') + '-' + Date.now(), label, url, x, row });
	saveState(); renderDesktopIcons(); return true;
}

// ─────────────────────────────────────────────────────────────────────
// Dock mutations
// ─────────────────────────────────────────────────────────────────────
function removeDockItem(dockIdx) {
	S.dock.splice(dockIdx, 1);
	saveState(); renderDock();
}

function moveDesktopIconToDock(key) {
	const idx = S.desktopIcons.findIndex(i => i.key === key);
	if (idx < 0) return;
	const icon = S.desktopIcons[idx];
	S.desktopIcons.splice(idx, 1);
	if (!S.dock.some(i => i !== 'separator' && i.url === icon.url)) {
		S.dock.push({ label: icon.label, url: icon.url });
	}
	saveState(); renderDesktopIcons(); renderDock();
}

function moveDockItemToDesktop(dockIdx) {
	const item = S.dock[dockIdx];
	// The built-in apps move like any other item but never leave the dock.
	if (!item || item === 'separator' || item.app) return;
	S.dock.splice(dockIdx, 1);
	if (!addDesktopIcon(item.label, item.url)) { saveState(); renderDesktopIcons(); }
	renderDock();
}

// ─────────────────────────────────────────────────────────────────────
// Desktop icon drag: snap to a grid cell, swapping with an icon there
// ─────────────────────────────────────────────────────────────────────
function setupDesktopIconDrag() {
	const desktop = $('desktop');
	let active = false, srcKey = null, dragClone = null, dragEl = null, ghostEl = null;
	let target = null, overDock = false, shown = null;   // shown: where each icon is on screen
	const placeGhost = () => { ghostEl.style.left = cellLeft(target.x) + 'px'; ghostEl.style.top = cellTop(target.row) + 'px'; };

	desktop.addEventListener('pointerdown', e => {
		if (!desktopEditing) return;
		const icon = e.target.closest('#desktopGrid .desktop-icon');
		if (!icon || e.target.closest('.icon-delete')) return;
		e.preventDefault();

		srcKey = icon.dataset.key;
		dragEl = icon; active = true;

		// From where it shows, which on a small screen may not be its own cell.
		shown  = layoutIcons();
		target = { ...(shown.get(srcKey) || { x: 0, row: 0 }) };

		const r = icon.getBoundingClientRect();
		dragClone = makeDragClone(icon, r);
		icon.style.opacity = '0.15';

		ghostEl = document.createElement('div');
		ghostEl.className = 'desktop-icon-ghost';
		$('desktopGrid').appendChild(ghostEl);
		placeGhost();

		desktop.setPointerCapture(e.pointerId);
	});

	// Icons are links holding images, so the browser may start its own native
	// drag mid-move, which fires pointercancel and kills ours. Cancelling
	// pointerdown doesn't stop that everywhere (e.g. the new-tab extension).
	desktop.addEventListener('dragstart', e => { if (desktopEditing) e.preventDefault(); });

	desktop.addEventListener('pointermove', e => {
		if (!active || !dragClone) return;
		e.preventDefault();
		dragClone.style.left = (e.clientX - dragClone.offsetWidth  / 2) + 'px';
		dragClone.style.top  = (e.clientY - dragClone.offsetHeight / 2) + 'px';

		const under = document.elementFromPoint(e.clientX, e.clientY);
		overDock = !!(under && under.closest('#dock'));
		$('dock').classList.toggle('drop-target', overDock);
		if (ghostEl) ghostEl.style.display = overDock ? 'none' : '';
		if (overDock) return;

		// The cell under the pointer, kept on the screen and above the dock.
		const cell = cellAt(e.clientX, e.clientY);
		if (cell.x !== target.x || cell.row !== target.row) {
			target = cell;
			if (ghostEl) placeGhost();
		}
	});

	function endDesktopDrag() {
		if (!active) return;
		active = false;
		const fKey = srcKey, to = target, fOverDock = overDock, was = shown && shown.get(srcKey);
		dragClone && dragClone.remove(); dragClone = null;
		if (dragEl) { dragEl.style.opacity = ''; dragEl = null; }
		if (ghostEl) { ghostEl.remove(); ghostEl = null; }
		$('dock').classList.remove('drop-target');
		srcKey = null; target = null; overDock = false;

		if (!fKey) return;
		if (fOverDock) { moveDesktopIconToDock(fKey); return; }
		const src = S.desktopIcons.find(i => i.key === fKey);
		if (!src || !to || !was || (was.x === to.x && was.row === to.row)) return;
		// The icon showing in that cell, if any, trades places: it takes the
		// cell the dragged one was showing in.
		let tgtKey = null;
		shown.forEach((c, key) => { if (key !== fKey && c.x === to.x && c.row === to.row) tgtKey = key; });
		const tgt = tgtKey && S.desktopIcons.find(i => i.key === tgtKey);
		if (tgt) { tgt.x = was.x; tgt.row = was.row; }
		src.x = to.x; src.row = to.row;
		shown = null;
		saveState(); renderDesktopIcons();
	}

	desktop.addEventListener('pointerup',          endDesktopDrag);
	desktop.addEventListener('lostpointercapture', endDesktopDrag);
}

// ─────────────────────────────────────────────────────────────────────
// Dock drag: reorder icons within the dock
// ─────────────────────────────────────────────────────────────────────
let dockDragging = false;

function setupDockDrag() {
	const dock = $('dock');
	let active = false, srcDockIdx = -1, tgtDockIdx = -1, dragEl = null, dragClone = null, overOut = false;
	const clearDropLine = () => dock.querySelectorAll('.dock-icon').forEach(el => el.classList.remove('drag-over', 'drag-over-after'));

	dock.addEventListener('pointerdown', e => {
		if (!desktopEditing) return;
		const icon = e.target.closest('.dock-icon[data-dock-idx]');
		if (!icon || e.target.closest('.dock-icon-delete')) return;
		e.preventDefault();
		srcDockIdx = tgtDockIdx = parseInt(icon.dataset.dockIdx);
		dragEl = icon; active = true; dockDragging = true;
		const r = icon.getBoundingClientRect();
		dragClone = makeDragClone(icon, r);
		icon.style.opacity = '0';
		dock.setPointerCapture(e.pointerId);
	});

	// See setupDesktopIconDrag: keep native link/image drag from hijacking ours.
	dock.addEventListener('dragstart', e => { if (desktopEditing) e.preventDefault(); });

	dock.addEventListener('pointermove', e => {
		if (!active || !dragClone) return;
		e.preventDefault();
		dragClone.style.left = (e.clientX - dragClone.offsetWidth  / 2) + 'px';
		dragClone.style.top  = (e.clientY - dragClone.offsetHeight / 2) + 'px';
		dragClone.style.visibility = 'hidden';
		const under = document.elementFromPoint(e.clientX, e.clientY);
		dragClone.style.visibility = '';

		overOut = !(under && under.closest('#dock'));
		if (overOut) { clearDropLine(); return; }

		// tgtDockIdx is the slot to insert before: over an icon's right half
		// that's the slot after it, so the end of the dock can be reached too.
		const target = under && under.closest('.dock-icon[data-dock-idx]');
		if (target && target !== dragEl) {
			const r     = target.getBoundingClientRect();
			const after = e.clientX > r.left + r.width / 2;
			const ni    = parseInt(target.dataset.dockIdx) + (after ? 1 : 0);
			if (ni !== tgtDockIdx && !isNaN(ni)) {
				clearDropLine();
				target.classList.add(after ? 'drag-over-after' : 'drag-over');
				tgtDockIdx = ni;
			}
		}
	});

	function endDockDrag() {
		if (!active) return;
		active = false; dockDragging = false;
		const fSrc = srcDockIdx, fTgt = tgtDockIdx, fOut = overOut;
		dragClone && dragClone.remove(); dragClone = null;
		dragEl && (dragEl.style.opacity = ''); dragEl = null;
		clearDropLine();
		srcDockIdx = tgtDockIdx = -1; overOut = false;

		if (fOut && fSrc >= 0) { moveDockItemToDesktop(fSrc); return; }
		if (fTgt !== fSrc && fTgt !== fSrc + 1 && fTgt >= 0 && fSrc >= 0) {
			const arr = S.dock;
			const [item] = arr.splice(fSrc, 1);
			arr.splice(fSrc < fTgt ? fTgt - 1 : fTgt, 0, item);
			saveState(); renderDock();
		}
	}

	dock.addEventListener('pointerup',          endDockDrag);
	dock.addEventListener('lostpointercapture', endDockDrag);
}

// ─────────────────────────────────────────────────────────────────────
// Dock magnification (macOS-style gaussian proximity scaling)
// ─────────────────────────────────────────────────────────────────────
function setupDockMagnification() {
	const dock   = $('dock');
	const MAX    = 1.48;
	const SIGMA  = 58;
	const LIFT   = 22;
	const HALF   = 34;

	function icons() {
		return [...dock.querySelectorAll('.dock-icon[data-dock-idx]')];
	}

	function captureNaturalPositions() {
		resetMag();
		icons().forEach(icon => {
			const r = icon.getBoundingClientRect();
			icon.dataset.naturalCx = (r.left + r.width / 2).toFixed(1);
		});
	}

	function applyMag(mouseX) {
		icons().forEach(icon => {
			const cx = parseFloat(icon.dataset.naturalCx || '0');
			const d  = mouseX - cx;
			const s  = 1 + (MAX - 1) * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
			const fs = icon.dataset.pressed ? s * 0.88 : s;
			const em = (HALF * (s - 1)).toFixed(1) + 'px';
			icon.style.transform   = `scale(${fs.toFixed(3)}) translateY(${(-(s - 1) * LIFT).toFixed(1)}px)`;
			icon.style.marginLeft  = em;
			icon.style.marginRight = em;
			icon.style.zIndex      = s > 1.15 ? '10' : '';
		});
	}

	function resetMag() {
		icons().forEach(icon => {
			icon.style.willChange  = '';
			icon.style.transform   = '';
			icon.style.marginLeft  = '';
			icon.style.marginRight = '';
			icon.style.zIndex      = '';
		});
	}

	let magRafId  = null;
	let lastMouseX = 0;

	dock.addEventListener('pointerenter', () => {
		if (desktopEditing || dockDragging) return;
		icons().forEach(icon => { icon.style.willChange = 'transform, margin'; });
		captureNaturalPositions();
	});
	dock.addEventListener('pointermove', e => {
		if (desktopEditing || dockDragging) { resetMag(); return; }
		lastMouseX = e.clientX;
		if (!magRafId) magRafId = requestAnimationFrame(() => { applyMag(lastMouseX); magRafId = null; });
	});
	dock.addEventListener('pointerleave', () => { if (magRafId) { cancelAnimationFrame(magRafId); magRafId = null; } resetMag(); });

	dock.addEventListener('pointerdown', e => {
		const icon = e.target.closest('.dock-icon');
		if (icon && !desktopEditing) { icon.dataset.pressed = '1'; applyMag(e.clientX); }
	});
	['pointerup', 'pointercancel'].forEach(ev => {
		dock.addEventListener(ev, e => {
			const icon = e.target.closest('.dock-icon');
			if (icon) { delete icon.dataset.pressed; applyMag(e.clientX); }
		});
	});
}

// ─────────────────────────────────────────────────────────────────────
// Desktop icon press feedback
// ─────────────────────────────────────────────────────────────────────
function setupDesktopIconPress() {
	const grid = $('desktopGrid');
	grid.addEventListener('pointerdown', e => {
		const icon = e.target.closest('.desktop-icon');
		if (icon && !desktopEditing) icon.classList.add('pressed');
	});
	['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => {
		grid.addEventListener(ev, e => {
			const icon = e.target.closest('.desktop-icon');
			if (icon) icon.classList.remove('pressed');
		});
	});
}

// ─────────────────────────────────────────────────────────────────────
// Long-press / right-click → edit mode
// ─────────────────────────────────────────────────────────────────────
function setupLongPress() {
	const desktop = $('desktop');
	let timer = null;
	const isBackground = e => !e.target.closest('.desktop-icon');

	desktop.addEventListener('pointerdown', e => {
		if (desktopEditing || !isBackground(e)) return;
		timer = setTimeout(enterDesktopEdit, 500);
	});
	const cancel = () => { clearTimeout(timer); timer = null; };
	desktop.addEventListener('pointermove',   cancel);
	desktop.addEventListener('pointerup',     cancel);
	desktop.addEventListener('pointercancel', cancel);
	desktop.addEventListener('contextmenu',   e => { e.preventDefault(); toggleDesktopEdit(); });
}
