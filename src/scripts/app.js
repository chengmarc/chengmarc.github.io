// ─────────────────────────────────────────────────────────────────────
// Config reset — shared by Import, Restore and Sync
// ─────────────────────────────────────────────────────────────────────
function applyConfig(cfg) {
	replaceState(cfg);
	renderDesktopIcons(); renderDock(); resetAllBookmarks();
	exitDesktopEdit();
}

// ─────────────────────────────────────────────────────────────────────
// Event wiring
// ─────────────────────────────────────────────────────────────────────
function setupEvents() {
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

	$('dock').addEventListener('click', e => {
		const del  = e.target.closest('.dock-icon-delete');
		const icon = e.target.closest('.dock-icon');
		if (del) { e.preventDefault(); e.stopPropagation(); removeDockItem(+del.dataset.dockIdx); return; }
		if (desktopEditing && icon) { e.preventDefault(); return; }
		// The built-in apps open their window; links open themselves.
		if (icon && icon.dataset.app === 'allApps')  openAllBookmarks();
		if (icon && icon.dataset.app === 'settings') toggleWindow('settings');
		if (icon) {
			icon.classList.remove('bouncing');
			void icon.offsetWidth;
			icon.classList.add('bouncing');
			icon.addEventListener('animationend', () => icon.classList.remove('bouncing'), { once: true });
		}
	});

	document.addEventListener('keydown', e => {
		if (e.key !== 'Escape') return;
		// The window in front first, then desktop edit mode.
		const top = topWindow();
		if (top) { escapeWindow(top); return; }
		if (desktopEditing) exitDesktopEdit();
	});
}

// ─────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────
loadSettings();
const firstRun = loadState();
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
setupSync(applyConfig, firstRun);

// Text that depends on state as well as language, redone on a language
// switch: translatePage has just reset it to its data-i18n default.
onLanguageChange(() => {
	$('mbEdit').textContent = t(desktopEditing ? 'menu.doneEditing' : 'menu.editDesktop');
});

// ─────────────────────────────────────────────────────────────────────
// Boot splash — a flat cover over the first-run assembly. It lifts on a
// fixed 1s timer, the same cap as each site's own icon files (whose probes
// start just before, as the icons render), so by then every first-screen
// tile shows a real icon or its local glyph. The page-aware Google lookup
// races alongside and, when it answers, just swaps in.
// ─────────────────────────────────────────────────────────────────────
(function hideBootScreen() {
	const boot = $('boot');
	if (!boot) return;
	setTimeout(() => {
		boot.classList.add('boot-hidden');
		setTimeout(() => boot.remove(), 500);
		showWelcome();
	}, 1000);
})();
