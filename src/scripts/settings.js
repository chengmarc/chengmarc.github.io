// ─────────────────────────────────────────────────────────────────────
// Settings — wallpaper; browser sync, once or always on; and backup:
// Import, Export and Restore Defaults. Settings are saved apart from the
// desktop state, so Import and Restore Defaults leave them alone.
// ─────────────────────────────────────────────────────────────────────
const SETTINGS_STORE = 'webos_settings';

// Built-in wallpapers. `image` is a file under the site root; `css` is a
// background value. The first is the default, set in styles.css itself.
const WALLPAPERS = [
	{ id: 'default',  name: 'Default',  image: 'src/background.jpeg' },
	{ id: 'midnight', name: 'Midnight', css: 'linear-gradient(160deg, #0f2027, #203a43 50%, #2c5364)' },
	{ id: 'aurora',   name: 'Aurora',   css: 'radial-gradient(ellipse at 20% 15%, #2fbf8f, transparent 55%), radial-gradient(ellipse at 80% 35%, #6a5cff, transparent 55%), linear-gradient(180deg, #0b1026, #1b1440)' },
	{ id: 'sunset',   name: 'Sunset',   css: 'linear-gradient(170deg, #2b1055, #a8327f 55%, #ff9a5a)' },
	{ id: 'ocean',    name: 'Ocean',    css: 'linear-gradient(160deg, #1e3c72, #2a5298 50%, #4ca1af)' },
	{ id: 'forest',   name: 'Forest',   css: 'linear-gradient(160deg, #0b3d2e, #1f6f4a 55%, #8fb35a)' },
	{ id: 'graphite', name: 'Graphite', css: 'linear-gradient(160deg, #1c1d20, #45474c)' },
];

let settings = { wallpaper: 'default', autoSync: false, showIP: true, language: 'auto' };

function loadSettings() {
	try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_STORE)) || {}); } catch (_) {}
}
function saveSettings() {
	try { localStorage.setItem(SETTINGS_STORE, JSON.stringify(settings)); } catch (_) {}
}

// ── Wallpaper ─────────────────────────────────────────────────────────
// Images are resolved against the page, not the stylesheet, so one path
// works on the site and in the extension.
function wallpaperCss(w) {
	return w.image ? 'url("' + new URL(w.image, document.baseURI).href + '") top center / cover' : w.css;
}

function applyWallpaper() {
	const w = WALLPAPERS.find(x => x.id === settings.wallpaper) || WALLPAPERS[0];
	const root = document.documentElement;
	root.classList.toggle('custom-wallpaper', w !== WALLPAPERS[0]);
	if (w === WALLPAPERS[0]) root.style.removeProperty('--wallpaper');
	else root.style.setProperty('--wallpaper', wallpaperCss(w));
}

function renderWallpapers() {
	const grid = $('wallpaperGrid');
	grid.innerHTML = '';
	WALLPAPERS.forEach(w => {
		const preview = el('span', { class: 'wallpaper-preview' });
		preview.style.background = wallpaperCss(w);
		const name = t('wallpaper.' + w.id);
		const btn = el('button', { class: 'wallpaper-swatch', title: name, data: { id: w.id } },
			preview, el('span', { class: 'wallpaper-name', text: name }));
		const sel = w.id === settings.wallpaper;
		btn.classList.toggle('sel', sel);
		btn.setAttribute('aria-pressed', String(sel));
		grid.appendChild(btn);
	});
}

// ── Always-on browser sync (extension only) ───────────────────────────
// While on, the desktop and app categories follow the Bookmarks bar: synced
// on every page load and again whenever a bookmark changes. Icons already on
// the desktop keep their cell (keepIconPositions); edits made here are
// replaced on the next sync.
// onChildrenReordered and onImportEnded are Chrome-only; Firefox skips them.
const BOOKMARK_EVENTS = ['onCreated', 'onRemoved', 'onChanged', 'onMoved', 'onChildrenReordered', 'onImportEnded'];
let autoSyncTimer = null;

// An import or a folder delete fires one event per bookmark: sync once after.
function scheduleAutoSync() {
	clearTimeout(autoSyncTimer);
	autoSyncTimer = setTimeout(runAutoSync, 300);
}

// Sync without asking, and redraw only if something changed: every new tab
// runs this, and most find the Bookmarks bar as they left it.
function runAutoSync() {
	return readBrowserBookmarks().then(cfg => {
		const before = JSON.stringify(S);
		replaceState(cfg);
		if (JSON.stringify(S) === before) return;
		renderDesktopIcons(); renderDock();
		if ($('allApps').classList.contains('open')) renderAllBookmarks();
	}).catch(err => console.warn('Bookmark sync failed:', err));
}

function watchBookmarks(on) {
	BOOKMARK_EVENTS.forEach(name => {
		const ev = EXT_API.bookmarks && EXT_API.bookmarks[name];
		if (!ev) return;
		if (on) ev.addListener(scheduleAutoSync); else ev.removeListener(scheduleAutoSync);
	});
}

function setAutoSync(on) {
	settings.autoSync = on;
	saveSettings();
	$('autoSyncToggle').checked = on;
	watchBookmarks(on);
	if (on) runAutoSync(); else clearTimeout(autoSyncTimer);
}

// From the toggle's click. The permission request comes first, since Firefox
// only grants permissions straight off a user gesture.
function toggleAutoSync(on) {
	if (!on) { setAutoSync(false); return; }
	EXT_API.permissions.request({ permissions: ['bookmarks'] }).then(granted => {
		const ok = granted && confirm(t('confirm.autoSync'));
		setAutoSync(!!ok);
	}).catch(err => { setAutoSync(false); alert(t('error.syncFailed', { msg: err.message })); });
}

// On load: pick up where the last tab left off, unless the permission has
// since been revoked, which turns the setting off.
function startAutoSync() {
	if (!EXT_API || !settings.autoSync) return;
	EXT_API.permissions.contains({ permissions: ['bookmarks'] })
		.then(granted => setAutoSync(granted))
		.catch(() => setAutoSync(false));
}

// ── Language ──────────────────────────────────────────────────────────
// Automatic first, named with the language it resolves to; then each
// language in its own name, so anyone can find theirs.
function renderLanguageSelect() {
	const select = $('languageSelect');
	select.innerHTML = '';
	select.appendChild(el('option', { value: 'auto', text: t('settings.auto', { name: LANGUAGES[browserLanguage()] }) }));
	for (const [code, name] of Object.entries(LANGUAGES)) select.appendChild(el('option', { value: code, text: name }));
	select.value = LANGUAGES[settings.language] ? settings.language : 'auto';
}

// ── Settings window ───────────────────────────────────────────────────
function openSettingsPanel() {
	renderWallpapers();
	if (EXT_API) $('autoSyncToggle').checked = settings.autoSync;
	$('showIPToggle').checked = settings.showIP;
	$('settingsPanel').classList.add('open');
	$('mbSettings').classList.add('active');
	centerPanel($('settingsPanel'));
}
function closeSettingsPanel() {
	$('settingsPanel').classList.remove('open');
	$('mbSettings').classList.remove('active');
}
function toggleSettingsPanel() {
	$('settingsPanel').classList.contains('open') ? closeSettingsPanel() : openSettingsPanel();
}

// Called first thing at init (app.js), since the menu bar reads settings too.
function setupSettings() {
	applyWallpaper();

	const panel = $('settingsPanel');
	$('mbSettings').addEventListener('click', e => { e.stopPropagation(); toggleSettingsPanel(); });
	$('settingsClose').addEventListener('click', e => { e.stopPropagation(); closeSettingsPanel(); });
	$('settingsMin').addEventListener('click',   e => { e.stopPropagation(); closeSettingsPanel(); });

	$('wallpaperGrid').addEventListener('click', e => {
		const btn = e.target.closest('.wallpaper-swatch');
		if (!btn) return;
		settings.wallpaper = btn.dataset.id;
		saveSettings(); applyWallpaper(); renderWallpapers();
	});

	// Syncing reads the browser's bookmarks, which only the extension can do.
	if (EXT_API) {
		$('syncNowBtn').addEventListener('click', () => syncFromBrowser(applyConfig));
		$('autoSyncToggle').addEventListener('change', e => toggleAutoSync(e.target.checked));
	} else $('settingsSync').remove();

	renderLanguageSelect();
	$('languageSelect').addEventListener('change', e => {
		settings.language = e.target.value;
		saveSettings(); applyLanguage();
	});
	onLanguageChange(() => { renderLanguageSelect(); renderWallpapers(); });

	$('showIPToggle').addEventListener('change', e => {
		settings.showIP = e.target.checked;
		saveSettings(); showIPInfo(settings.showIP);
	});

	$('exportBtn').addEventListener('click', exportConfig);
	$('importBtn').addEventListener('click', () => importConfig(applyConfig));
	$('restoreBtn').addEventListener('click', () => {
		if (!confirm(t('confirm.restore'))) return;
		// Drop the cached favicons so a restore re-fetches every icon fresh.
		clearFaviconCache();
		applyConfig(CFG);
	});

	makeWindowDraggable($('settingsBar'), panel, panel, (left, top) => {
		panel.style.left = left + 'px';
		panel.style.top  = top  + 'px';
	});
}
