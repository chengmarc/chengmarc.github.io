// ─────────────────────────────────────────────────────────────────────
// Event wiring
// ─────────────────────────────────────────────────────────────────────
function setupEvents() {
	$('mbBookmarks').addEventListener('click', () => {
		$('allApps').classList.contains('open') ? closeAllApps() : openAllBookmarks();
	});
	$('mbBrand').addEventListener('click', e => { e.stopPropagation(); toggleAboutPanel(); });
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
		renderAllBookmarks(); openPickMode('desktop');
	});

	$('mbImport').addEventListener('click', importConfig);
	$('mbExport').addEventListener('click', exportConfig);

	$('mbRestore').addEventListener('click', () => {
		if (!confirm('Restore all icons and bookmarks to default? This cannot be undone.')) return;
		S = clone({ desktopIcons: CFG.desktopIcons, dock: CFG.dock, bookmarkSections: CFG.bookmarkSections });
		ensureIconPositions();
		normalizeBookmarks();
		millerSel = 0;
		// Drop the cached favicons so a restore re-fetches every icon fresh.
		for (const d in faviconCache) delete faviconCache[d];
		faviconFailed.clear();
		try { localStorage.removeItem(FAVICON_STORE); } catch(_) {}
		saveState();
		renderDesktopIcons(); renderDock(); renderAllBookmarks();
		exitDesktopEdit();
	});

	$('dock').addEventListener('click', e => {
		const del  = e.target.closest('.dock-icon-delete');
		const icon = e.target.closest('.dock-icon');
		if (del) { e.preventDefault(); e.stopPropagation(); removeDockItem(+del.dataset.dockIdx); return; }
		if (desktopEditing && icon) { e.preventDefault(); return; }
		const launch = e.target.closest('.dock-icon, .dock-all-apps');
		if (launch) {
			launch.classList.remove('bouncing');
			void launch.offsetWidth;
			launch.classList.add('bouncing');
			launch.addEventListener('animationend', () => launch.classList.remove('bouncing'), { once: true });
		}
	});

	const closeWin  = () => { if (pickMode) closePickMode(); else closeAllApps(); };
	$('tlClose').addEventListener('click', closeWin);
	$('tlMin').addEventListener('click', closeWin);
	$('bmEditBtn').addEventListener('click',    () => { if (bmEditing) exitBmEdit(); else enterBmEdit(); });
	$('pickCancelBtn').addEventListener('click', closePickMode);

	$('allAppsScroll').addEventListener('click', e => {
		const catRen = e.target.closest('.miller-cat-rename');
		if (catRen) { e.stopPropagation(); startRename(catRen); return; }
		const catDel = e.target.closest('.miller-cat-delete');
		if (catDel) {
			const bi = +catDel.dataset.bi, b = cats()[bi];
			if (!b.links.length || confirm('Delete "' + b.title + '" and its ' + b.links.length + ' link(s)?')) catDelete(bi);
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
				const added = pickTarget === 'dock' ? addDockIcon(label, a.href) : addDesktopIcon(label, a.href);
				if (added) { a.classList.add('just-picked'); setTimeout(() => a.classList.remove('just-picked'), 800); }
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
		if ($('aboutPanel').classList.contains('open')) { closeAboutPanel(); return; }
		if (pickMode)       { closePickMode();   return; }
		if (bmEditing)      { exitBmEdit();      return; }
		if ($('allApps').classList.contains('open')) { closeAllApps(); return; }
		if (desktopEditing) { exitDesktopEdit(); return; }
	});
}

// ─────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────
loadState();
renderDesktopIcons();
renderDock();
setupDesktopIconDrag();
setupDockDrag();
setupDockMagnification();
setupDesktopIconPress();
setupLongPress();
setupEvents();
startClock();
startStatus();
setupCalendar();
setupBookmarkWindowDrag();
setupBookmarkEditDrag();
setupAboutPanel();

// ─────────────────────────────────────────────────────────────────────
// Boot splash — a flat cover over the first-run assembly. It lifts on a
// fixed 2.5s timer: stage 1 of favicon resolution (each site's own domain)
// caps at 1s, so by then every first-screen tile shows either its real
// favicon or its local glyph. Stage 2 (Google s2) resolves afterwards and
// its result just swaps in.
// ─────────────────────────────────────────────────────────────────────
(function hideBootScreen() {
	const boot = $('boot');
	if (!boot) return;
	setTimeout(() => {
		boot.classList.add('boot-hidden');
		setTimeout(() => boot.remove(), 500);
	}, 2500);
})();
