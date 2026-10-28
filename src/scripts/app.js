// ─────────────────────────────────────────────────────────────────────
// Config reset — shared by Import, Restore and Sync
// ─────────────────────────────────────────────────────────────────────
function applyConfig(cfg) {
	replaceState(cfg);
	millerSel = 0;
	renderDesktopIcons(); renderDock(); renderAllBookmarks();
	exitDesktopEdit();
}

// ─────────────────────────────────────────────────────────────────────
// Welcome window — first run in the extension: asks whether to keep the
// desktop in sync with the browser, before anything is synced
// ─────────────────────────────────────────────────────────────────────
function showWelcome() {
	let pending = false;
	try { pending = localStorage.getItem(WELCOME) === '1'; } catch (_) {}
	if (!EXT_API || !pending) return;

	const win  = $('welcome');
	const done = () => {
		try { localStorage.removeItem(WELCOME); } catch (_) {}
		win.classList.remove('open');
	};
	$('welcomeExplore').addEventListener('click', done);
	// Straight from the click: Firefox only grants permissions on a user gesture.
	// The window was the question, so the toggle doesn't ask again.
	$('welcomeSync').addEventListener('click', () => { done(); toggleAutoSync(true, false); });
	win.classList.add('open');
}

// ─────────────────────────────────────────────────────────────────────
// Event wiring
// ─────────────────────────────────────────────────────────────────────
function setupEvents() {
	$('mbBookmarks').addEventListener('click', () => {
		if (topWindow() === 'allApps') closeWindow('allApps'); else openAllBookmarks();
	});
	$('mbBrand').addEventListener('click', e => { e.stopPropagation(); toggleWindow('about'); });
	$('mbEdit').addEventListener('click', () => {
		if (desktopEditing) exitDesktopEdit(); else enterDesktopEdit();
	});

	$('desktopGrid').addEventListener('click', e => {
		const del  = e.target.closest('.icon-delete');
		const icon = e.target.closest('.desktop-icon');
		if (del)  { e.preventDefault(); e.stopPropagation(); removeDesktopIcon(del.dataset.key); return; }
		if (desktopEditing && icon) e.preventDefault();
	});

	$('mbAdd').addEventListener('click', () => {
		renderAllBookmarks(); openPickMode();
	});

	$('dock').addEventListener('click', e => {
		const del  = e.target.closest('.dock-icon-delete');
		const icon = e.target.closest('.dock-icon');
		if (del) { e.preventDefault(); e.stopPropagation(); removeDockItem(+del.dataset.dockIdx); return; }
		if (desktopEditing && icon) { e.preventDefault(); return; }
		// The built-in apps open their window; links open themselves.
		if (icon && icon.dataset.app === 'allApps')  openAllBookmarks();
		if (icon && icon.dataset.app === 'settings') toggleWindow('settings');
		const launch = icon;
		if (launch) {
			launch.classList.remove('bouncing');
			void launch.offsetWidth;
			launch.classList.add('bouncing');
			launch.addEventListener('animationend', () => launch.classList.remove('bouncing'), { once: true });
		}
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

	document.addEventListener('keydown', e => {
		if (e.key !== 'Escape') return;
		// The window in front: All Apps leaves edit mode first, then closes.
		const top = topWindow();
		if (top === 'allApps' && bmEditing) { exitBmEdit(); return; }
		if (top) { closeWindow(top); return; }
		if (desktopEditing) exitDesktopEdit();
	});
}

// ─────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────
loadSettings();
loadState();
applyLanguage(settings.language);
renderDesktopIcons();
renderDock();
setupDesktopIconDrag();
setupDockDrag();
setupDockMagnification();
setupDesktopIconPress();
setupLongPress();
setupEvents();
startClock();
startStatus(settings.showIP);
setupCalendar();
setupAllAppsWindow();
setupBookmarkEditDrag();
setupAboutPanel();
setupSettings(applyConfig);
startAutoSync();

// Text that depends on state as well as language, redone on a language
// switch: translatePage has just reset each to its data-i18n default.
onLanguageChange(() => {
	$('mbEdit').textContent       = t(desktopEditing ? 'menu.doneEditing' : 'menu.editDesktop');
	$('allAppsTitle').textContent = t(pickMode ? 'apps.pickTitle' : 'apps.title');
	$('bmEditBtn').textContent    = t(bmEditing ? 'apps.done' : 'apps.edit');
	if ($('allApps').classList.contains('open')) renderAllBookmarks();
});

// ─────────────────────────────────────────────────────────────────────
// Boot splash — a flat cover over the first-run assembly. It lifts on a
// fixed 2.5s timer: each site's own icon files cap at 1s, so by then every
// first-screen tile shows a real icon or its local glyph. The page-aware
// Google lookup races alongside and, when it answers, just swaps in.
// ─────────────────────────────────────────────────────────────────────
(function hideBootScreen() {
	const boot = $('boot');
	if (!boot) return;
	setTimeout(() => {
		boot.classList.add('boot-hidden');
		setTimeout(() => boot.remove(), 500);
		showWelcome();
	}, 2500);
})();
