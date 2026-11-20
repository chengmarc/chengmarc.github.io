// ─────────────────────────────────────────────────────────────────────
// All Apps — a full-screen launcher over the blurred wallpaper, as
// Launchpad draws it. Every category is a titled section of big icons;
// Install App, New Category and Add to Desktop sit beside the search field.
// There is no edit mode:
//   • Install App (or a section's ⋯ → Install App) opens the app sheet: paste a
//     link, and the name and icon fill themselves in.
//   • An app's ⋯, or a right-click, opens its menu: Open, Add to Desktop,
//     Add to Dock, Edit…, Delete. Edit… is the same sheet, with Save.
//   • A delete can be undone from the toast instead of being confirmed.
//   • Icons drag to reorder, or onto another section to move there;
//     section titles drag to reorder the sections.
// Add to Desktop switches it to pick mode, where a click puts the app on
// the desktop instead of opening it, until Done (or Escape). Add Icon (menu
// bar) opens it straight in pick mode; Done then goes back to the desktop.
// ─────────────────────────────────────────────────────────────────────
let pickMode      = false;
let appsQuery = '';
let appsDrag      = null;   // { kind: 'app', bi, li } or { kind: 'cat', bi }
let swallowClick  = false;  // the click that ends the pointerdown which closed the menu
let toastTimer    = null;
let lastAddCat    = 0;      // where Install App adds, until another is picked
let syncIsOn      = () => false;   // handed in by setupAllApps

function cats() { return S.bookmarkSections[0].blocks; }
const isAllAppsOpen = () => $('allApps').classList.contains('open');

// ── URL helpers ───────────────────────────────────────────────────────
function normalizeUrl(u) {
	u = u.trim();
	if (u && !/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
	return u;
}

// The name a link gets when none is typed: the site's own name,
// capitalized. "news.ycombinator.com" → "Ycombinator", "bbc.co.uk" → "Bbc".
const SECOND_LEVEL = ['co', 'com', 'net', 'org', 'gov', 'edu', 'ac', 'ne', 'or'];
function nameFromUrl(url) {
	const parts = domainFrom(url).split('.').filter(Boolean);
	if (parts.length < 2) return parts[0] || url;
	let i = parts.length - 2;
	if (i > 0 && SECOND_LEVEL.includes(parts[i])) i--;
	return parts[i][0].toUpperCase() + parts[i].slice(1);
}

// Worth asking for an icon: a host with a dot in it, not half-typed.
const looksLikeSite = u => /\.[a-z]{2,}$/i.test(domainFrom(u));

// ── Render ────────────────────────────────────────────────────────────
function appTile(link, bi, li, onDesk) {
	return el('a', { class: 'lp-tile lp-app', href: link.url, target: '_blank', rel: 'noopener noreferrer', title: link.url, draggable: true,
			data: { bi, li, q: (link.label + ' ' + link.url).toLowerCase() } },
		el('span', { class: 'lp-art' },
			iconArt(link.url),
			onDesk ? el('span', { class: 'lp-check', text: '✓' }) : null),
		el('span', { class: 'lp-label', text: link.label }),
		el('button', { class: 'lp-more', type: 'button', text: '⋯', title: t('apps.more'), data: { bi, li } }),
	);
}

function renderAllApps() {
	const scroll = $('allAppsScroll');
	const keep   = scroll.scrollTop;
	const onDesk = new Set(S.desktopIcons.map(i => i.url));
	const inner  = el('div', { class: 'lp-inner' });
	cats().forEach((c, bi) => {
		const grid = el('div', { class: 'lp-grid' });
		c.links.forEach((l, li) => grid.appendChild(appTile(l, bi, li, onDesk.has(l.url))));
		// An empty category says what to do with it, and gives a drop target.
		if (!c.links.length) grid.appendChild(el('div', { class: 'lp-empty-cat', text: t('apps.emptyCategory') }));
		inner.appendChild(el('section', { class: 'lp-section', data: { bi } },
			el('header', { class: 'lp-head', draggable: true, data: { bi } },
				el('h3', { text: c.title }),
				el('span', { class: 'lp-count', text: c.links.length }),
				el('button', { class: 'lp-more', type: 'button', text: '⋯', title: t('apps.more'), data: { bi } }),
				el('span', { class: 'lp-rule' })),
			grid));
	});
	inner.appendChild(el('div', { class: 'lp-empty', id: 'lpEmpty', hidden: true, text: t('apps.noResults') }));
	scroll.replaceChildren(inner);
	scroll.scrollTop = keep;
	$('addAppBtn').disabled = !cats().length;
	filterApps($('appsSearch').value);
}

// After a whole new config (app.js's applyConfig).
function resetAllApps() {
	if (isAllAppsOpen()) renderAllApps();
}

// Search hides what doesn't match rather than redrawing, so the icons
// don't reload on every key.
function filterApps(query) {
	appsQuery = query.trim().toLowerCase();
	$('allApps').classList.toggle('searching', !!appsQuery);
	let any = false;
	$('allAppsScroll').querySelectorAll('.lp-section').forEach(sec => {
		let n = 0;
		sec.querySelectorAll('.lp-app').forEach(a => {
			const hit = !appsQuery || a.dataset.q.includes(appsQuery);
			a.hidden = !hit; if (hit) n++;
		});
		sec.hidden = !!appsQuery && !n;
		if (n) any = true;
	});
	const empty = $('lpEmpty');
	if (empty) empty.hidden = !appsQuery || any;
}

// ── Open / close ──────────────────────────────────────────────────────
function openAllApps() {
	$('appsSearch').value = '';
	renderAllApps();
	$('allAppsScroll').scrollTop = 0;
	$('allApps').classList.add('open');
	setTimeout(() => $('appsSearch').focus(), 60);
}

function closeAllApps() {
	closeAppMenu(); closeSheet(); hideToast();
	pickOnly = false;
	setPickMode(false);
	$('allApps').classList.remove('open');
	$('appsSearch').value = '';
	filterApps('');
}

// Pick mode lives inside the open launcher. Entered from Add to Desktop,
// Done or Escape go back to the launcher as it was; entered from Add Icon,
// with the launcher (pickOnly), they close it, back to the desktop.
let pickOnly = false;

function setPickMode(on) {
	if (!on && pickOnly) { pickOnly = false; closeAllApps(); return; }
	pickMode = on;
	$('allApps').classList.toggle('pick-mode', on);
	closeAppMenu();
	if (on) $('appsSearch').focus();
}

// Escape peels one layer at a time: menu, sheet, search, pick mode, then
// the launcher.
function escapeAllApps() {
	if ($('appMenu').classList.contains('open')) return closeAppMenu();
	if ($('appSheet').classList.contains('open')) return closeSheet();
	if ($('appsSearch').value) { $('appsSearch').value = ''; filterApps(''); return; }
	if (pickMode) return setPickMode(false);
	closeAllApps();
}

// Scroll the list, and only the list, until node is in view. Not
// scrollIntoView: when the list can't scroll far enough (the last section),
// it scrolls whatever holds the list too, and the launcher slides up.
function revealInList(node) {
	if (!node) return;
	const list = $('allAppsScroll');
	const r = node.getBoundingClientRect(), box = list.getBoundingClientRect();
	const margin = 16;
	if (r.top >= box.top + margin && r.bottom <= box.bottom - margin) return;
	const by = r.top < box.top + margin ? r.top - box.top - margin : r.bottom - box.bottom + margin;
	list.scrollBy({ top: by, behavior: 'smooth' });
}

// ── Toast ─────────────────────────────────────────────────────────────
function showToast(message, actionLabel, action) {
	const toast = $('appToast');
	toast.replaceChildren(el('span', { text: message }));
	if (actionLabel) toast.appendChild(el('button', { type: 'button', text: actionLabel,
		onclick: () => { hideToast(); action(); } }));
	toast.classList.add('open');
	clearTimeout(toastTimer);
	toastTimer = setTimeout(hideToast, actionLabel ? 6000 : 2400);
}
function hideToast() { clearTimeout(toastTimer); $('appToast').classList.remove('open'); }

// ── Mutations ─────────────────────────────────────────────────────────
function commitApps() { saveState(); renderAllApps(); }

function deleteApp(bi, li) {
	const [link] = cats()[bi].links.splice(li, 1);
	commitApps();
	showToast(t('apps.deleted', { title: link.label }), t('apps.undo'), () => {
		const c = cats()[bi];
		if (!c) return;
		c.links.splice(Math.min(li, c.links.length), 0, link);
		commitApps();
	});
}

function deleteCategory(bi) {
	const [cat] = cats().splice(bi, 1);
	commitApps();
	showToast(t('apps.deleted', { title: cat.title }), t('apps.undo'), () => {
		cats().splice(Math.min(bi, cats().length), 0, cat);
		commitApps();
	});
}

function addToDesktop(link) {
	if (addDesktopIcon(link.label, link.url)) {
		renderAllApps();
		showToast(t('apps.addedDesktop', { title: link.label }));
	} else showToast(t('apps.onDesktop'));
}

function addToDock(link) {
	addDockLink(link.label, link.url);
	saveState(); renderDock();
	showToast(t('apps.addedDock', { title: link.label }));
}

function moveApp(fromBi, fromLi, toBi, toLi) {
	const src = cats()[fromBi].links;
	const [link] = src.splice(fromLi, 1);
	if (fromBi === toBi && fromLi < toLi) toLi--;
	cats()[toBi].links.splice(toLi, 0, link);
	commitApps();
}

// `to`: the index the section ends up at.
function moveCategory(from, to) {
	const arr = cats();
	arr.splice(to, 0, arr.splice(from, 1)[0]);
	commitApps();
}

// ── Context menu ──────────────────────────────────────────────────────
// items: { label, run, disabled, danger } or '-' for a separator.
function openAppMenu(items, x, y) {
	const menu = $('appMenu');
	menu.replaceChildren(...items.map(it => it === '-'
		? el('div', { class: 'lp-menu-sep' })
		: el('button', { type: 'button', class: 'lp-menu-item' + (it.danger ? ' danger' : ''), text: it.label, disabled: !!it.disabled,
			onclick: () => { closeAppMenu(); it.run(); } })));
	menu.classList.add('open');
	const r = menu.getBoundingClientRect();
	menu.style.left = Math.max(8, Math.min(x, innerWidth  - r.width  - 8)) + 'px';
	menu.style.top  = Math.max(8, Math.min(y, innerHeight - r.height - 8)) + 'px';
	menu.querySelector('.lp-menu-item:not(:disabled)')?.focus({ preventScroll: true });
}
function closeAppMenu() { $('appMenu').classList.remove('open'); }

function appMenuItems(bi, li) {
	const link   = cats()[bi].links[li];
	const onDesk = isOnDesktop(link.url);
	const inDock = isInDock(link.url);
	return [
		{ label: t('apps.open'), run: () => { window.open(link.url, '_blank', 'noopener'); closeAllApps(); } },
		'-',
		{ label: onDesk ? '✓ ' + t('apps.onDesktop') : t('apps.addToDesktop'), disabled: onDesk, run: () => addToDesktop(link) },
		{ label: inDock ? '✓ ' + t('apps.inDock')    : t('apps.addToDock'),    disabled: inDock, run: () => addToDock(link) },
		'-',
		{ label: t('apps.editMenu'), run: () => openAppSheet(bi, li) },
		{ label: t('apps.delete'), danger: true, run: () => deleteApp(bi, li) },
	];
}

function catMenuItems(bi) {
	return [
		{ label: t('apps.installApp'), run: () => openAppSheet(bi) },
		{ label: t('apps.renameMenu'), run: () => openCategorySheet(bi) },
		'-',
		{ label: t('apps.deleteCategoryMenu'), danger: true, run: () => deleteCategory(bi) },
	];
}

// ── Sheets: add / edit an app, add / rename a category ────────────────
function closeSheet() { $('appSheet').classList.remove('open'); $('appSheet').replaceChildren(); }

// fields: [label, control] pairs. Returns the form; onSubmit runs on
// Enter or the primary button.
function showSheet({ title, head, fields, primary, onSubmit, onDelete }) {
	const ok = el('button', { type: 'submit', class: 'lp-btn primary', text: primary });
	const form = el('form', { class: 'lp-sheet window-glass', noValidate: true },
		head || null,
		el('h3', { text: title }),
		...fields.map(([label, control]) => el('label', { class: 'lp-field-row' }, el('span', { text: label }), control)),
		syncIsOn() ? el('p', { class: 'lp-sheet-note', text: t('apps.syncNote') }) : null,
		el('div', { class: 'lp-sheet-actions' },
			onDelete ? el('button', { type: 'button', class: 'lp-btn danger', text: t('apps.delete'), onclick: () => { closeSheet(); onDelete(); } }) : null,
			el('span', { class: 'lp-spacer' }),
			el('button', { type: 'button', class: 'lp-btn', text: t('apps.cancel'), onclick: closeSheet }),
			ok));
	form.addEventListener('submit', e => { e.preventDefault(); if (!ok.disabled) onSubmit(); });
	$('appSheet').replaceChildren(form);
	$('appSheet').classList.add('open');
	closeAppMenu();
	return { form, ok };
}

// li given: edit that app. Otherwise add one, to category bi if given.
function openAppSheet(bi = Math.min(lastAddCat, cats().length - 1), li) {
	const editing = li !== undefined;
	const link    = editing ? cats()[bi].links[li] : null;
	const urlIn   = el('input', { class: 'lp-input', type: 'text', inputMode: 'url', autocomplete: 'off', spellcheck: false,
		placeholder: t('apps.urlPlaceholder'), value: link ? link.url : '' });
	const nameIn  = el('input', { class: 'lp-input', type: 'text', autocomplete: 'off', value: link ? link.label : '' });
	const catSel  = el('select', { class: 'lp-input' },
		...cats().map((c, i) => el('option', { value: i, text: c.title, selected: i === bi })));
	const art      = el('span', { class: 'lp-sheet-art' });
	const artLabel = el('span', { class: 'lp-sheet-art-label' });
	const head     = el('div', { class: 'lp-sheet-preview' }, art, artLabel);

	const { ok } = showSheet({
		title: t(editing ? 'apps.editApp' : 'apps.installApp'),
		head,
		fields: [[t('apps.url'), urlIn], [t('apps.label'), nameIn], [t('apps.category'), catSel]],
		primary: t(editing ? 'apps.save' : 'apps.install'),
		onDelete: editing ? () => deleteApp(bi, li) : null,
		onSubmit: () => {
			const url   = normalizeUrl(urlIn.value);
			const label = nameIn.value.trim() || nameFromUrl(url);
			const to    = +catSel.value;
			if (editing) {
				const l = cats()[bi].links[li];
				l.url = url; l.label = label;
				if (to !== bi) { cats()[bi].links.splice(li, 1); cats()[to].links.push(l); }
			} else { cats()[to].links.push({ label, url }); lastAddCat = to; }
			closeSheet();
			commitApps();
			// Show where it went: the section a new or moved app landed in.
			if (!editing || to !== bi) {
				const tile = $('allAppsScroll').querySelector(`.lp-section[data-bi="${to}"] .lp-app:last-of-type`);
				if (tile) { revealInList(tile); tile.classList.add('lp-pop'); }
			}
		},
	});

	// The preview follows the typing: the name at once, the icon once the
	// link stops changing.
	let shown = null, timer = null;
	const refresh = () => {
		const url = normalizeUrl(urlIn.value);
		const auto = url ? nameFromUrl(url) : '';
		nameIn.placeholder = auto || t('apps.label');
		artLabel.textContent = nameIn.value.trim() || auto || ' ';
		ok.disabled = !url;
		clearTimeout(timer);
		timer = setTimeout(() => {
			const want = looksLikeSite(url) ? url : '';
			if (want === shown) return;
			shown = want;
			art.replaceChildren(want ? iconArt(want) : el('span', { class: 'lp-add-art', text: '＋' }));
		}, shown === null ? 0 : 350);
	};
	urlIn.addEventListener('input', refresh);
	nameIn.addEventListener('input', refresh);
	refresh();
	(editing ? nameIn : urlIn).focus();
	if (editing) nameIn.select();
}

// bi given: rename it. Otherwise make a new one.
function openCategorySheet(bi) {
	const renaming = bi !== undefined;
	const nameIn = el('input', { class: 'lp-input', type: 'text', autocomplete: 'off',
		placeholder: t('apps.categoryName'), value: renaming ? cats()[bi].title : '' });
	const { ok } = showSheet({
		title: t(renaming ? 'apps.renameCategory' : 'apps.newCategory'),
		fields: [[t('apps.categoryName'), nameIn]],
		primary: t(renaming ? 'apps.save' : 'apps.add'),
		onSubmit: () => {
			const title = nameIn.value.trim();
			if (renaming) cats()[bi].title = title; else cats().push({ title, links: [] });
			closeSheet();
			commitApps();
			if (!renaming) revealInList($('allAppsScroll').querySelector('.lp-section:last-of-type'));
		},
	});
	const refresh = () => { ok.disabled = !nameIn.value.trim(); };
	nameIn.addEventListener('input', refresh);
	refresh();
	nameIn.focus(); nameIn.select();
}

// ── Wiring ────────────────────────────────────────────────────────────
// isSyncOn: whether Always sync with browser is on, so the sheets can say
// edits will be replaced (settings.js, which knows, loads after this file).
function setupAllApps(isSyncOn) {
	syncIsOn = isSyncOn;
	const root   = $('allApps');
	const scroll = $('allAppsScroll');
	const search = $('appsSearch');

	$('mbAllApps').addEventListener('click', () => openAllApps());
	$('mbAdd').addEventListener('click', () => { openAllApps(); pickOnly = true; setPickMode(true); });
	$('pickDoneBtn').addEventListener('click', () => setPickMode(false));
	$('pickModeBtn').addEventListener('click', () => setPickMode(true));
	$('addAppBtn').addEventListener('click', () => openAppSheet());
	$('addCatBtn').addEventListener('click', () => openCategorySheet());

	search.addEventListener('input', () => filterApps(search.value));
	// Enter opens (or, picking, adds) the first match.
	search.addEventListener('keydown', e => {
		if (e.key !== 'Enter') return;
		const first = scroll.querySelector('.lp-app:not([hidden])');
		if (first) { e.preventDefault(); first.click(); }
	});

	// Typing anywhere searches, as in Launchpad.
	document.addEventListener('keydown', e => {
		if (!isAllAppsOpen() || e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
		if (e.target.closest('input, select, textarea') || $('appSheet').classList.contains('open')) return;
		search.focus();
	});

	// A pointerdown outside the open menu closes it, and the click it
	// becomes does nothing else.
	root.addEventListener('pointerdown', e => {
		if ($('appMenu').classList.contains('open') && !e.target.closest('#appMenu')) {
			closeAppMenu(); swallowClick = true;
		}
	}, true);
	scroll.addEventListener('scroll', closeAppMenu, { passive: true });

	root.addEventListener('click', e => {
		if (swallowClick) { swallowClick = false; e.preventDefault(); return; }
		if (e.target.closest('#appMenu, #appSheet, #appToast')) return;

		const more = e.target.closest('.lp-more');
		if (more) {
			e.preventDefault();
			const r = more.getBoundingClientRect();
			const items = more.dataset.li !== undefined ? appMenuItems(+more.dataset.bi, +more.dataset.li) : catMenuItems(+more.dataset.bi);
			openAppMenu(items, r.left, r.bottom + 4);
			return;
		}
		const app = e.target.closest('.lp-app');
		if (app) {
			const link = cats()[+app.dataset.bi].links[+app.dataset.li];
			if (pickMode) { e.preventDefault(); addToDesktop(link); }
			else closeAllApps();   // the link opens itself in a new tab
			return;
		}
		// Empty space closes the launcher, as in Launchpad.
		if (e.target.matches('.all-apps, .lp-body, .lp-top, .lp-scroll, .lp-inner, .lp-section, .lp-grid')) closeAllApps();
	});

	root.addEventListener('contextmenu', e => {
		const app  = e.target.closest('.lp-app');
		const head = e.target.closest('.lp-head');
		if (!app && !head) return;
		e.preventDefault();
		const bi = +(app || head).dataset.bi;
		openAppMenu(app ? appMenuItems(bi, +app.dataset.li) : catMenuItems(bi), e.clientX, e.clientY);
	});

	// A click on the dimmed space round a sheet cancels it.
	$('appSheet').addEventListener('click', e => { if (e.target === e.currentTarget) closeSheet(); });

	setupAllAppsDrag();

	onLanguageChange(() => { if (isAllAppsOpen()) renderAllApps(); });
}

// ── Drag to reorder ───────────────────────────────────────────────────
// An icon drops before or after another (by which half it's over), or
// onto a section's empty space or title to go last there. A section,
// dragged by its title, drops anywhere on another and takes its place, as
// in any sortable list: dragged down it lands below that section, dragged
// up, above it.
function setupAllAppsDrag() {
	const scroll = $('allAppsScroll');
	const DROPS = ['drop-before', 'drop-after', 'drop-into', 'drop-above', 'drop-below'];
	const uncue = () => scroll.querySelectorAll('.' + DROPS.join(', .')).forEach(n => n.classList.remove(...DROPS));
	const clear = () => { uncue(); scroll.querySelectorAll('.lp-dragging').forEach(n => n.classList.remove('lp-dragging')); };
	const cue = (node, cls) => { uncue(); if (cls) node.classList.add(cls); };
	const afterX = (node, e) => { const r = node.getBoundingClientRect(); return e.clientX > r.left + r.width / 2; };

	// Where a drop at this event would land, or null.
	function target(e) {
		if (!appsDrag) return null;
		if (appsDrag.kind === 'cat') {
			const sec = e.target.closest('.lp-section');
			if (!sec) return null;
			const to = +sec.dataset.bi;
			// Over itself: a valid place to let go, where nothing changes.
			return { node: sec, cls: to === appsDrag.bi ? null : to > appsDrag.bi ? 'drop-below' : 'drop-above', to };
		}
		const tile = e.target.closest('.lp-app');
		if (tile) {
			const after = afterX(tile, e);
			return { node: tile, cls: after ? 'drop-after' : 'drop-before', bi: +tile.dataset.bi, li: +tile.dataset.li + (after ? 1 : 0) };
		}
		const sec = e.target.closest('.lp-section');
		if (sec) { const bi = +sec.dataset.bi; return { node: sec, cls: 'drop-into', bi, li: cats()[bi].links.length }; }
		return null;
	}

	scroll.addEventListener('dragstart', e => {
		const tile = e.target.closest('.lp-app');
		const head = e.target.closest('.lp-head');
		if (appsQuery || (!tile && !head)) { e.preventDefault(); return; }
		closeAppMenu();
		appsDrag = tile ? { kind: 'app', bi: +tile.dataset.bi, li: +tile.dataset.li } : { kind: 'cat', bi: +head.dataset.bi };
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', '');
		const node = tile || head.parentNode;
		requestAnimationFrame(() => node.classList.add('lp-dragging'));
	});
	scroll.addEventListener('dragover', e => {
		const at = target(e);
		if (!at) return;
		e.preventDefault();
		cue(at.node, at.cls);
	});
	scroll.addEventListener('drop', e => {
		const at = target(e);
		const d = appsDrag;
		clear(); appsDrag = null;
		if (!at) return;
		e.preventDefault();
		if (d.kind === 'cat') { if (at.to !== d.bi) moveCategory(d.bi, at.to); }
		else if (!(at.bi === d.bi && (at.li === d.li || at.li === d.li + 1))) moveApp(d.bi, d.li, at.bi, at.li);
	});
	scroll.addEventListener('dragend', () => { clear(); appsDrag = null; });
}
