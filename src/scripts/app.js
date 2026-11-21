// ─────────────────────────────────────────────────────────────────────
// Config reset — shared by Import, Restore and Sync
// ─────────────────────────────────────────────────────────────────────
function applyConfig(cfg) {
	replaceState(cfg);
	renderDock(); renderDesktopIcons(); resetAllApps();   // the dock first: the grid's rows stop above it
	exitDesktopEdit();
}

// ─────────────────────────────────────────────────────────────────────
// Event wiring
// ─────────────────────────────────────────────────────────────────────
function setupEvents() {
	$('mbBrand').addEventListener('click', e => { e.stopPropagation(); toggleWindow('about'); });

	document.addEventListener('keydown', e => {
		if (e.key !== 'Escape') return;
		// The All Apps launcher covers everything, so it goes first; then the
		// window in front, then desktop edit mode.
		if (isAllAppsOpen()) { escapeAllApps(); return; }
		const top = topWindow();
		if (top) { closeWindow(top); return; }
		exitDesktopEdit();
	});
}

// ─────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────
loadSettings();
const firstRun = loadState();
applyLanguage(settings.language);
renderDock();           // before the icons: the grid's rows stop above it
renderDesktopIcons();
setupDesktopRelayout();
setupDesktopIconDrag();
setupDockDrag();
setupDockMagnification();
setupDesktopIconPress();
setupLongPress();
setupDesktopClicks(app => app === 'allApps' ? openAllApps() : toggleWindow(app));
setupEvents();
startClock();
startStatus(settings.showLocation);
setupCalendar();
setupAllApps(() => settings.autoSync);
setupAboutPanel();
setupSettings(applyConfig);
setupSync(applyConfig, firstRun);

// ─────────────────────────────────────────────────────────────────────
// Boot splash — a flat cover over the first-run assembly. It lifts on a
// fixed 1s timer. Saved icons are on their tiles by then; icons still being
// looked up show the gray placeholder and swap in as they resolve.
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
