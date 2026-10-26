// ─────────────────────────────────────────────────────────────────────
// Settings — wallpaper; browser sync, once or always on; and backup:
// Import, Export and Restore Defaults. Settings are saved apart from the
// desktop state, so Import and Restore Defaults leave them alone.
// ─────────────────────────────────────────────────────────────────────
const SETTINGS_STORE = 'webos_settings';

// Built-in wallpapers, in src/wallpapers/, with a 320x180 thumbnail of each
// under the same name in src/thumbs/ for the Settings swatches. Names are places, so they stay
// untranslated. Golden Gate is the default, set in styles.css itself; an
// unknown saved id (such as an older preset) falls back to it.
const WALLPAPER_DIR = 'src/wallpapers/';
const THUMB_DIR     = 'src/thumbs/';
const WALLPAPERS = [
	{ id: 'yosemite',    name: 'Yosemite',    file: '10.10_yosemite.jpg' },
	{ id: 'el-capitan',  name: 'El Capitan',  file: '10.11_el_capitan.jpg' },
	{ id: 'mojave',      name: 'Mojave',      file: '10.14_mojave.jpg' },
	{ id: 'sequoia',     name: 'Sequoia',     file: '15_sequoia.jpg' },
	{ id: 'tahoe',       name: 'Tahoe',       file: '26_tahoe.jpg' },
	{ id: 'golden-gate', name: 'Golden Gate', file: '27_golden_gate.jpg' },
];
const DEFAULT_WALLPAPER = WALLPAPERS.find(w => w.id === 'golden-gate');

let settings = { wallpaper: DEFAULT_WALLPAPER.id, autoSync: false, showIP: true, language: 'auto' };

function loadSettings() {
	try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_STORE)) || {}); } catch (_) {}
}
function saveSettings() {
	try { localStorage.setItem(SETTINGS_STORE, JSON.stringify(settings)); } catch (_) {}
}

// ── Wallpaper ─────────────────────────────────────────────────────────
// Images are resolved against the page, not the stylesheet, so one path
// works on the site and in the extension.
function wallpaperUrl(path) {
	return 'url("' + new URL(path, document.baseURI).href + '")';
}

function currentWallpaper() {
	return WALLPAPERS.find(w => w.id === settings.wallpaper) || DEFAULT_WALLPAPER;
}

function applyWallpaper() {
	const w = currentWallpaper();
	const root = document.documentElement;
	root.classList.toggle('custom-wallpaper', w !== DEFAULT_WALLPAPER);
	if (w === DEFAULT_WALLPAPER) root.style.removeProperty('--wallpaper');
	else root.style.setProperty('--wallpaper', wallpaperUrl(WALLPAPER_DIR + w.file) + ' top center / cover');
}

function renderWallpapers() {
	const grid = $('wallpaperGrid');
	grid.innerHTML = '';
	WALLPAPERS.forEach(w => {
		const preview = el('span', { class: 'wallpaper-preview' });
		preview.style.background = wallpaperUrl(THUMB_DIR + w.file) + ' center / cover';
		const btn = el('button', { class: 'wallpaper-swatch', title: w.name, data: { id: w.id } },
			preview, el('span', { class: 'wallpaper-name', text: w.name }));
		const sel = w === currentWallpaper();
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
