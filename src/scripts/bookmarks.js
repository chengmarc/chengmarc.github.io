// ─────────────────────────────────────────────────────────────────────
// All Apps — Miller columns UI
// ─────────────────────────────────────────────────────────────────────
const FOLDER_SVG = '<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 4c0-.55.45-1 1-1h3.1c.32 0 .62.15.8.4L7.3 4.5H13.5c.55 0 1 .45 1 1V12c0 .55-.45 1-1 1h-11c-.55 0-1-.45-1-1V4z"/></svg>';

let bmEditing     = false;
let pickMode      = false;
let millerSel     = 0;   // selected category index into cats()
let bookmarkQuery = '';
let dragCatBi     = null;   // category being dragged (reorder)
let dragLinkLi    = null;   // link index being dragged (reorder / move to category)

// ── Inline rename helpers ─────────────────────────────────────────────

function startRename(btn) {
	const row     = btn.closest('.miller-cat');
	const labelEl = row.querySelector('.miller-cat-label');
	const bi = +btn.dataset.bi;
	row.draggable = false;
	const input = document.createElement('input');
	input.className = 'miller-rename-input';
	input.value = labelEl.textContent;
	labelEl.replaceWith(input);
	input.focus(); input.select();
	const commit = () => { const v = input.value.trim(); v ? catRename(bi, v) : renderMillerCats(); };
	input.addEventListener('blur', commit);
	input.addEventListener('keydown', e => {
		if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
		if (e.key === 'Escape') { input.removeEventListener('blur', commit); renderMillerCats(); }
	});
}

function startLinkEdit(btn) {
	const bi = +btn.dataset.bi, li = +btn.dataset.li;
	const row  = btn.closest('.miller-link-row');
	const link = cats()[bi].links[li];
	row.draggable = false;
	const editor = document.createElement('div');
	editor.className = 'miller-link-editor';
	editor.append(
		el('input', { class: 'miller-rename-input', placeholder: t('apps.label'), data: { role: 'e-label' } }),
		el('input', { class: 'miller-rename-input', placeholder: t('apps.url'),   data: { role: 'e-url' } }),
	);
	const labelIn = editor.querySelector('[data-role="e-label"]');
	const urlIn   = editor.querySelector('[data-role="e-url"]');
	labelIn.value = link.label; urlIn.value = link.url;
	row.innerHTML = '';
	row.appendChild(editor);
	labelIn.focus(); labelIn.select();
	let done = false;
	const commit = () => {
		if (done) return; done = true;
		const l = labelIn.value.trim(), u = urlIn.value.trim();
		if (u) linkEdit(bi, li, l, u); else renderMillerLinks();
	};
	const cancel = () => { if (done) return; done = true; renderMillerLinks(); };
	editor.addEventListener('focusout', () => { setTimeout(() => { if (!editor.contains(document.activeElement)) commit(); }, 0); });
	editor.addEventListener('keydown', e => {
		if (e.key === 'Enter')  { e.preventDefault(); commit(); }
		if (e.key === 'Escape') { e.preventDefault(); cancel(); }
	});
}

// ── Accessors ─────────────────────────────────────────────────────────
function cats() { return S.bookmarkSections[0].blocks; }

// ── Renderers ─────────────────────────────────────────────────────────
function renderMillerCats() {
	const col = $('millerCats');
	if (!col) return;
	col.innerHTML = '';
	cats().forEach((c, bi) => {
		const links   = c.links;
		const matches = bookmarkQuery
			? links.filter(l => l.label.toLowerCase().includes(bookmarkQuery)).length
			: links.length;
		const item = document.createElement('div');
		item.className  = 'miller-cat';
		item.dataset.bi = bi;
		if (bmEditing) item.draggable = true;
		if (bookmarkQuery && matches === 0) item.classList.add('dim');
		if (!bookmarkQuery && bi === millerSel) item.classList.add('sel');
		item.innerHTML = '<span class="miller-cat-ico">' + FOLDER_SVG + '</span>';
		item.appendChild(el('span', { class: 'miller-cat-label', text: c.title }));
		if (bmEditing) {
			item.appendChild(el('button', { class: 'miller-cat-rename', text: '✎', data: { bi } }));
			item.appendChild(el('button', { class: 'miller-cat-delete', text: '✕', data: { bi } }));
		} else {
			item.appendChild(el('span', { class: 'miller-cat-count', text: matches }));
			item.appendChild(el('span', { class: 'miller-chevron', text: '›' }));
		}
		col.appendChild(item);
	});
	if (bmEditing) {
		const form = document.createElement('div');
		form.className = 'miller-add-cat';
		form.innerHTML = '<input class="miller-add-input" type="text" placeholder="' + t('apps.newCategory') + '" data-role="cat-title">'
			+ '<button class="miller-add-btn" data-role="cat-add">＋</button>';
		col.appendChild(form);
	}
}

function renderMillerLinks() {
	const col = $('millerLinks');
	if (!col) return;
	col.innerHTML = '';
	const entries = [];
	if (bookmarkQuery) {
		cats().forEach((c, bi) => c.links.forEach((l, li) => {
			if (l.label.toLowerCase().includes(bookmarkQuery)) entries.push({ link: l, cat: c.title, bi, li });
		}));
	} else {
		const blk = cats()[millerSel];
		if (blk) blk.links.forEach((l, li) => entries.push({ link: l, cat: null, bi: millerSel, li }));
	}
	if (!entries.length) {
		const empty = document.createElement('div');
		empty.className   = 'miller-empty';
		empty.textContent = t(bookmarkQuery ? 'apps.noResults' : (bmEditing ? 'apps.noLinksYet' : 'apps.noLinks'));
		col.appendChild(empty);
	} else {
		entries.forEach(({ link, cat, bi, li }) => {
			const row = el('div', { class: 'miller-link-row', data: { li } });
			if (bmEditing && !bookmarkQuery) row.draggable = true;
			const art = iconArt(link.url); art.classList.add('miller-link-ico');
			const a = el('a', { class: 'miller-link', href: link.url, target: '_blank', rel: 'noopener noreferrer', draggable: false, data: { search: link.label.toLowerCase() } },
				art,
				el('span', { class: 'miller-link-label', text: link.label }),
			);
			if (cat) a.appendChild(el('span', { class: 'miller-link-cat', text: cat }));
			row.appendChild(a);
			if (bmEditing) {
				row.appendChild(el('button', { class: 'miller-link-rename', text: '✎', data: { bi, li } }));
				row.appendChild(el('button', { class: 'miller-link-delete', text: '✕', data: { bi, li } }));
			}
			col.appendChild(row);
		});
	}
	if (bmEditing && !bookmarkQuery) {
		const form = document.createElement('div');
		form.className = 'miller-add-link';
		form.innerHTML = '<input class="miller-add-input" type="url" placeholder="' + t('apps.url') + '" data-role="link-url">'
			+ '<input class="miller-add-input" type="text" placeholder="' + t('apps.labelOptional') + '" data-role="link-label">'
			+ '<button class="miller-add-btn" data-role="link-add">Add</button>';
		col.appendChild(form);
	}
}

function renderAllBookmarks() {
	const scroll = $('allAppsScroll');
	scroll.innerHTML = '';
	const miller = document.createElement('div');
	miller.className = 'miller';
	miller.innerHTML = '<div class="miller-col miller-cats" id="millerCats"></div>'
		+ '<div class="miller-col miller-links" id="millerLinks"></div>';
	scroll.appendChild(miller);

	if (millerSel >= cats().length) millerSel = 0;

	renderMillerCats();
	renderMillerLinks();
}

// After a whole new config (app.js's applyConfig): back to the first category.
function resetAllBookmarks() {
	millerSel = 0;
	renderAllBookmarks();
}

// ── Mutations: categories ─────────────────────────────────────────────
function catAdd(title) {
	if (!title) return;
	cats().push({ title, links: [] });
	saveState(); renderMillerCats();
}
function catRename(bi, title) {
	if (!title) return;
	cats()[bi].title = title;
	saveState(); renderMillerCats();
}
function catDelete(bi) {
	cats().splice(bi, 1);
	if (millerSel >= cats().length) millerSel = Math.max(0, cats().length - 1);
	saveState(); renderMillerCats(); renderMillerLinks();
}
function catMove(from, to) {
	const arr = cats();
	const [b] = arr.splice(from, 1);
	arr.splice(from < to ? to - 1 : to, 0, b);
	millerSel = arr.indexOf(b);
	saveState(); renderMillerCats(); renderMillerLinks();
}

// ── Mutations: links ──────────────────────────────────────────────────
function linkAdd(bi, url, label) {
	if (!url || !cats()[bi]) return;
	if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = 'https://' + url;
	if (!label) label = domainFrom(url);
	cats()[bi].links.push({ label, url });
	saveState(); renderMillerLinks(); renderMillerCats();
}
function linkEdit(bi, li, label, url) {
	if (!url) { renderMillerLinks(); return; }
	if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = 'https://' + url;
	const link = cats()[bi].links[li];
	link.url = url;
	link.label = label || domainFrom(url);
	saveState(); renderMillerLinks();
}
function linkDelete(bi, li) {
	cats()[bi].links.splice(li, 1);
	saveState(); renderMillerLinks(); renderMillerCats();
}
function linkMoveWithin(bi, from, to) {
	const arr = cats()[bi].links;
	const [l] = arr.splice(from, 1);
	arr.splice(from < to ? to - 1 : to, 0, l);
	saveState(); renderMillerLinks();
}
function linkMoveToCat(fromBi, li, toBi) {
	if (fromBi === toBi) return;
	const [l] = cats()[fromBi].links.splice(li, 1);
	cats()[toBi].links.push(l);
	saveState(); renderMillerCats(); renderMillerLinks();
}

// ── Open / close / modes ──────────────────────────────────────────────
function openAllBookmarks() {
	renderAllBookmarks();
	openWindow('allApps');
	setTimeout(() => $('bookmarkSearch').focus(), 260);
}

// What closing the window resets, however it's closed (so pick mode lives
// only as long as the window): edit and pick mode,
// the title and buttons they change, and the search.
function resetAllApps() {
	$('allApps').classList.remove('pick-mode', 'bm-editing');
	pickMode = false; bmEditing = false;
	$('allAppsTitle').textContent     = t('apps.title');
	$('bmEditBtn').textContent        = t('apps.edit');
	$('bmEditBtn').style.display      = '';
	$('bookmarkSearch').style.display = '';
	$('bookmarkSearch').value         = '';
	filterBookmarks('');
}

function enterBmEdit() {
	bmEditing = true;
	$('allApps').classList.add('bm-editing');
	$('bmEditBtn').textContent = t('apps.done');
	const search = $('bookmarkSearch');
	search.style.display = 'none';
	search.value = ''; bookmarkQuery = '';
	$('allApps').classList.remove('searching');
	renderMillerCats(); renderMillerLinks();
}
function exitBmEdit() {
	bmEditing = false;
	$('allApps').classList.remove('bm-editing');
	$('bmEditBtn').textContent        = t('apps.edit');
	$('bookmarkSearch').style.display = '';
	renderMillerCats(); renderMillerLinks();
}

function openPickMode() {
	pickMode = true;
	if (bmEditing) exitBmEdit();
	$('allApps').classList.add('pick-mode');
	$('allAppsTitle').textContent = t('apps.pickTitle');
	$('bmEditBtn').style.display  = 'none';
	openWindow('allApps');
	setTimeout(() => $('bookmarkSearch').focus(), 260);
}

// ── Search / filter ───────────────────────────────────────────────────
function filterBookmarks(query) {
	bookmarkQuery = query.trim().toLowerCase();
	$('allApps').classList.toggle('searching', !!bookmarkQuery);
	renderMillerCats();
	renderMillerLinks();
}

// ── The window ────────────────────────────────────────────────────────
// .open and the mode classes stay on the #allApps wrapper, which the CSS
// keys on; the window inside is what moves and stacks.
function setupAllAppsWindow() {
	registerWindow('allApps', { el: $('allAppsWindow'), root: $('allApps'), bar: $('allAppsBar'), menuItem: () => $(pickMode ? 'mbAdd' : 'mbBookmarks'), onClose: resetAllApps,
		onEscape: () => { if (!bmEditing) return false; exitBmEdit(); return true; } });

	$('mbBookmarks').addEventListener('click', () => {
		if (topWindow() === 'allApps') closeWindow('allApps'); else openAllBookmarks();
	});
	$('mbAdd').addEventListener('click', () => {
		renderAllBookmarks(); openPickMode();
	});
	$('bmEditBtn').addEventListener('click',    () => { if (bmEditing) exitBmEdit(); else enterBmEdit(); });
	$('pickCancelBtn').addEventListener('click', () => closeWindow('allApps'));

	$('allAppsScroll').addEventListener('click', e => {
		const catRen = e.target.closest('.miller-cat-rename');
		if (catRen) { e.stopPropagation(); startRename(catRen); return; }
		const catDel = e.target.closest('.miller-cat-delete');
		if (catDel) {
			const bi = +catDel.dataset.bi, b = cats()[bi];
			if (!b.links.length || confirm(t('apps.deleteCategory', { title: b.title, count: b.links.length }))) catDelete(bi);
			return;
		}
		const linkRen = e.target.closest('.miller-link-rename');
		if (linkRen) { e.stopPropagation(); startLinkEdit(linkRen); return; }
		const linkDel = e.target.closest('.miller-link-delete');
		if (linkDel) { linkDelete(+linkDel.dataset.bi, +linkDel.dataset.li); return; }
		const catAddBtn = e.target.closest('[data-role="cat-add"]');
		if (catAddBtn) {
			const inp = catAddBtn.closest('.miller-add-cat').querySelector('[data-role="cat-title"]');
			catAdd(inp.value.trim());
			return;
		}
		const linkAddBtn = e.target.closest('[data-role="link-add"]');
		if (linkAddBtn) {
			const form = linkAddBtn.closest('.miller-add-link');
			linkAdd(millerSel,
				form.querySelector('[data-role="link-url"]').value.trim(),
				form.querySelector('[data-role="link-label"]').value.trim());
			return;
		}

		if (bmEditing && e.target.closest('a.miller-link')) { e.preventDefault(); return; }

		const cat = e.target.closest('.miller-cat');
		if (cat) {
			millerSel = +cat.dataset.bi;
			if (bookmarkQuery) {
				$('bookmarkSearch').value = '';
				bookmarkQuery = '';
				$('allApps').classList.remove('searching');
			}
			renderMillerCats(); renderMillerLinks();
			return;
		}

		if (pickMode) {
			const a = e.target.closest('a.miller-link');
			if (a) {
				e.preventDefault();
				const label = (a.querySelector('.miller-link-label') || a).textContent.trim();
				if (addDesktopIcon(label, a.href)) { a.classList.add('just-picked'); setTimeout(() => a.classList.remove('just-picked'), 800); }
			}
		}
	});

	$('allAppsScroll').addEventListener('keydown', e => {
		if (e.key !== 'Enter') return;
		const catInp = e.target.closest('[data-role="cat-title"]');
		if (catInp) { catAdd(catInp.value.trim()); return; }
		const form = e.target.closest('.miller-add-link');
		if (form && e.target.closest('[data-role="link-url"], [data-role="link-label"]')) {
			linkAdd(millerSel,
				form.querySelector('[data-role="link-url"]').value.trim(),
				form.querySelector('[data-role="link-label"]').value.trim());
		}
	});

	$('bookmarkSearch').addEventListener('input', function () { filterBookmarks(this.value); });

	// Text that depends on the mode as well as the language: translatePage
	// has just reset it to its data-i18n default.
	onLanguageChange(() => {
		$('allAppsTitle').textContent = t(pickMode ? 'apps.pickTitle' : 'apps.title');
		$('bmEditBtn').textContent    = t(bmEditing ? 'apps.done' : 'apps.edit');
		if ($('allApps').classList.contains('open')) renderAllBookmarks();
	});
}

// ── Bookmark edit drag-and-drop ───────────────────────────────────────
function setupBookmarkEditDrag() {
	const scroll = $('allAppsScroll');
	const cue = (el, cls) => {
		scroll.querySelectorAll('.drag-over, .drop-into').forEach(x => x.classList.remove('drag-over', 'drop-into'));
		if (el) el.classList.add(cls);
	};
	const clearAll = () => {
		scroll.querySelectorAll('.drag-over, .drop-into, .bm-dragging')
			.forEach(x => x.classList.remove('drag-over', 'drop-into', 'bm-dragging'));
	};

	scroll.addEventListener('dragstart', e => {
		if (!bmEditing) { e.preventDefault(); return; }
		const linkRow = e.target.closest('.miller-link-row');
		const catRow  = e.target.closest('.miller-cat');
		if (linkRow && linkRow.draggable) {
			dragLinkLi = +linkRow.dataset.li; dragCatBi = null;
			e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', '');
			requestAnimationFrame(() => linkRow.classList.add('bm-dragging'));
		} else if (catRow) {
			dragCatBi = +catRow.dataset.bi; dragLinkLi = null;
			e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', '');
			requestAnimationFrame(() => catRow.classList.add('bm-dragging'));
		} else e.preventDefault();
	});

	scroll.addEventListener('dragover', e => {
		if (dragCatBi === null && dragLinkLi === null) return;
		const catRow  = e.target.closest('.miller-cat');
		const linkRow = e.target.closest('.miller-link-row');
		if (dragCatBi !== null) {
			if (catRow) { e.preventDefault(); cue(catRow, 'drag-over'); }
		} else {
			if (catRow)       { e.preventDefault(); cue(catRow, 'drop-into'); }
			else if (linkRow) { e.preventDefault(); cue(linkRow, 'drag-over'); }
		}
	});

	scroll.addEventListener('drop', e => {
		if (dragCatBi === null && dragLinkLi === null) return;
		e.preventDefault();
		const catRow  = e.target.closest('.miller-cat');
		const linkRow = e.target.closest('.miller-link-row');
		if (dragCatBi !== null) {
			if (catRow) catMove(dragCatBi, +catRow.dataset.bi);
		} else if (catRow) {
			linkMoveToCat(millerSel, dragLinkLi, +catRow.dataset.bi);
		} else if (linkRow) {
			linkMoveWithin(millerSel, dragLinkLi, +linkRow.dataset.li);
		}
		clearAll(); dragCatBi = null; dragLinkLi = null;
	});

	scroll.addEventListener('dragend', () => { clearAll(); dragCatBi = null; dragLinkLi = null; });
}
