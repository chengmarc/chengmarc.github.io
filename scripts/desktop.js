// ─────────────────────────────────────────────────────────────────────
// Desktop icon element factory
// ─────────────────────────────────────────────────────────────────────
function makeIconEl(item) {
	return el('a', { class: 'desktop-icon', href: item.url, target: '_blank', rel: 'noopener noreferrer', data: { key: item.key } },
		el('button', { class: 'icon-delete', text: '✕', data: { key: item.key } }),
		el('div', { class: 'icon-img-wrap' }, iconArt(item.favicon)),
		el('span', { class: 'desktop-icon-label', text: item.label }),
	);
}

// ─────────────────────────────────────────────────────────────────────
// Render: desktop icons
// ─────────────────────────────────────────────────────────────────────
function renderDesktopIcons() {
	const grid = $('desktopGrid');
	Array.from(grid.children).forEach(c => { if (!c.classList.contains('desktop-icon-ghost')) c.remove(); });
	S.desktopIcons.forEach(item => {
		const a = makeIconEl(item);
		Object.assign(a.style, {
			position: 'absolute',
			left: (GRID.ox + item.col * GRID.uw) + 'px',
			top:  (GRID.oy + item.row * GRID.uh) + 'px',
		});
		grid.appendChild(a);
	});
}

// ─────────────────────────────────────────────────────────────────────
// Render: dock
// ─────────────────────────────────────────────────────────────────────
function renderDock() {
	const dock = $('dock');
	dock.innerHTML = '';

	dock.appendChild(el('button', { class: 'dock-all-apps', title: 'All Bookmarks', onclick: openAllBookmarks }, iconArtFromSrc(ALL_APPS_ICON)));
	dock.appendChild(el('div', { class: 'dock-sep' }));

	S.dock.forEach((item, dockIdx) => {
		if (item === 'separator') {
			dock.appendChild(el('div', { class: 'dock-sep' }));
			return;
		}
		const a = el('a', { class: 'dock-icon', href: item.url, target: '_blank', rel: 'noopener noreferrer', title: item.label, data: { dockIdx } });

		const isLocked = item.locked || CFG.dock.some(d => d !== 'separator' && d.url === item.url && d.locked);
		if (isLocked) a.classList.add('locked');
		else a.appendChild(el('button', { class: 'dock-icon-delete', text: '✕', data: { dockIdx } }));

		a.appendChild(iconArt(item.favicon));
		dock.appendChild(a);
	});
}

// ─────────────────────────────────────────────────────────────────────
// Desktop edit mode
// ─────────────────────────────────────────────────────────────────────
function enterDesktopEdit() {
	desktopEditing = true;
	$('desktop').classList.add('editing');
	$('dock').classList.add('editing');
	const btn = $('mbEdit');
	btn.classList.add('active'); btn.textContent = 'Done Editing';
}

function exitDesktopEdit() {
	desktopEditing = false;
	$('desktop').classList.remove('editing');
	$('dock').classList.remove('editing');
	const btn = $('mbEdit');
	btn.classList.remove('active'); btn.textContent = 'Edit Desktop';
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
	const { col, row } = findFreeCell();
	S.desktopIcons.push({ key: 'icon-' + domain.replace(/\./g,'-') + '-' + Date.now(), label, url, favicon: domain, col, row });
	saveState(); renderDesktopIcons(); return true;
}

// ─────────────────────────────────────────────────────────────────────
// Dock mutations
// ─────────────────────────────────────────────────────────────────────
function removeDockItem(dockIdx) {
	S.dock.splice(dockIdx, 1);
	saveState(); renderDock();
}

function addDockIcon(label, url) {
	const domain = domainFrom(url);
	if (S.dock.some(i => i !== 'separator' && i.url === url)) return false;
	S.dock.push({ label, url, favicon: domain });
	saveState(); renderDock(); return true;
}

function moveDesktopIconToDock(key) {
	const idx = S.desktopIcons.findIndex(i => i.key === key);
	if (idx < 0) return;
	const icon = S.desktopIcons[idx];
	S.desktopIcons.splice(idx, 1);
	if (!S.dock.some(i => i !== 'separator' && i.url === icon.url)) {
		S.dock.push({ label: icon.label, url: icon.url, favicon: icon.favicon });
	}
	saveState(); renderDesktopIcons(); renderDock();
}

function moveDockItemToDesktop(dockIdx) {
	const item = S.dock[dockIdx];
	if (!item || item === 'separator' || item.locked) return;
	S.dock.splice(dockIdx, 1);
	if (!addDesktopIcon(item.label, item.url)) { saveState(); renderDesktopIcons(); }
	renderDock();
}

// ─────────────────────────────────────────────────────────────────────
// Desktop icon drag: snap to grid cell, swap
// ─────────────────────────────────────────────────────────────────────
function setupDesktopIconDrag() {
	const desktop = $('desktop');
	let active = false, srcKey = null, dragClone = null, dragEl = null, ghostEl = null;
	let targetCol = -1, targetRow = -1, overDock = false;

	desktop.addEventListener('pointerdown', e => {
		if (!desktopEditing) return;
		const icon = e.target.closest('#desktopGrid .desktop-icon');
		if (!icon || e.target.closest('.icon-delete')) return;
		e.preventDefault();

		srcKey = icon.dataset.key;
		dragEl = icon; active = true;

		const item = S.desktopIcons.find(i => i.key === srcKey);
		targetCol = item ? item.col : 0;
		targetRow = item ? item.row : 0;

		const r = icon.getBoundingClientRect();
		dragClone = makeDragClone(icon, r);
		icon.style.opacity = '0.15';

		ghostEl = document.createElement('div');
		ghostEl.className = 'desktop-icon-ghost';
		ghostEl.style.left = (GRID.ox + targetCol * GRID.uw) + 'px';
		ghostEl.style.top  = (GRID.oy + targetRow * GRID.uh) + 'px';
		$('desktopGrid').appendChild(ghostEl);

		desktop.setPointerCapture(e.pointerId);
	});

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

		const col = Math.round((e.clientX - GRID.ox - 57) / GRID.uw);
		const row = Math.round((e.clientY - GRID.oy - 57) / GRID.uh);
		const nc  = Math.max(0, col);
		const nr  = Math.max(0, row);
		if (nc !== targetCol || nr !== targetRow) {
			targetCol = nc; targetRow = nr;
			if (ghostEl) {
				ghostEl.style.left = (GRID.ox + targetCol * GRID.uw) + 'px';
				ghostEl.style.top  = (GRID.oy + targetRow * GRID.uh) + 'px';
			}
		}
	});

	function endDesktopDrag() {
		if (!active) return;
		active = false;
		const fKey = srcKey, fCol = targetCol, fRow = targetRow, fOverDock = overDock;
		dragClone && dragClone.remove(); dragClone = null;
		if (dragEl) { dragEl.style.opacity = ''; dragEl = null; }
		if (ghostEl) { ghostEl.remove(); ghostEl = null; }
		$('dock').classList.remove('drop-target');
		srcKey = null; targetCol = targetRow = -1; overDock = false;

		if (!fKey) return;
		if (fOverDock) { moveDesktopIconToDock(fKey); return; }
		if (fCol < 0 || fRow < 0) return;
		const src = S.desktopIcons.find(i => i.key === fKey);
		if (!src || (src.col === fCol && src.row === fRow)) return;
		const tgt = S.desktopIcons.find(i => i.col === fCol && i.row === fRow && i.key !== fKey);
		if (tgt) { const oc = src.col, or = src.row; src.col = fCol; src.row = fRow; tgt.col = oc; tgt.row = or; }
		else { src.col = fCol; src.row = fRow; }
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

	dock.addEventListener('pointermove', e => {
		if (!active || !dragClone) return;
		e.preventDefault();
		dragClone.style.left = (e.clientX - dragClone.offsetWidth  / 2) + 'px';
		dragClone.style.top  = (e.clientY - dragClone.offsetHeight / 2) + 'px';
		dragClone.style.visibility = 'hidden';
		const under = document.elementFromPoint(e.clientX, e.clientY);
		dragClone.style.visibility = '';

		overOut = !(under && under.closest('#dock'));
		if (overOut) {
			dock.querySelectorAll('.dock-icon').forEach(el => el.classList.remove('drag-over'));
			return;
		}

		const target = under && under.closest('.dock-icon[data-dock-idx]');
		if (target && target !== dragEl) {
			const ni = parseInt(target.dataset.dockIdx);
			if (ni !== tgtDockIdx && !isNaN(ni)) {
				dock.querySelectorAll('.dock-icon').forEach(el => el.classList.remove('drag-over'));
				target.classList.add('drag-over');
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
		dock.querySelectorAll('.dock-icon').forEach(el => el.classList.remove('drag-over'));
		srcDockIdx = tgtDockIdx = -1; overOut = false;

		if (fOut && fSrc >= 0) { moveDockItemToDesktop(fSrc); return; }
		if (fTgt !== fSrc && fTgt >= 0 && fSrc >= 0) {
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
		return [...dock.querySelectorAll('.dock-icon[data-dock-idx], .dock-all-apps')];
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
		const icon = e.target.closest('.dock-icon, .dock-all-apps');
		if (icon && !desktopEditing) { icon.dataset.pressed = '1'; applyMag(e.clientX); }
	});
	['pointerup', 'pointercancel'].forEach(ev => {
		dock.addEventListener(ev, e => {
			const icon = e.target.closest('.dock-icon, .dock-all-apps');
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
	desktop.addEventListener('contextmenu',   e => { e.preventDefault(); desktopEditing ? exitDesktopEdit() : enterDesktopEdit(); });
}
