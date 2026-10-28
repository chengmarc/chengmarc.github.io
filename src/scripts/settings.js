// ─────────────────────────────────────────────────────────────────────
// Settings — wallpaper, language, the location/IP switch, and backup:
// Import, Export and Restore Defaults. Settings are saved apart from the
// desktop state, so Import and Restore Defaults leave them alone.
// ─────────────────────────────────────────────────────────────────────
const SETTINGS_STORE = 'webos_settings';

// Built-in wallpapers, in src/wallpapers/, with a 320x180 thumbnail of each
// under the same name in src/thumbs/ for the Settings swatches (made by
// scripts/render_thumbs.py). Names are places, so they stay
// untranslated. Golden Gate is the default, set in styles/base.css itself; an
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
// Each opening shows the settings as they are now.
function showSettings() {
	renderWallpapers();
	$('showIPToggle').checked = settings.showIP;
}

// `onConfig` puts a whole new config on the desktop (app.js's applyConfig):
// Import and Restore Defaults end there. The Browser Sync section is wired
// by sync.js.
function setupSettings(onConfig) {
	applyWallpaper();

	const panel = $('settingsPanel');
	$('mbSettings').addEventListener('click', e => { e.stopPropagation(); toggleWindow('settings'); });

	$('wallpaperGrid').addEventListener('click', e => {
		const btn = e.target.closest('.wallpaper-swatch');
		if (!btn) return;
		settings.wallpaper = btn.dataset.id;
		saveSettings(); applyWallpaper(); renderWallpapers();
	});

	renderLanguageSelect();
	$('languageSelect').addEventListener('change', e => {
		settings.language = e.target.value;
		saveSettings(); applyLanguage(settings.language);
	});
	onLanguageChange(() => { renderLanguageSelect(); renderWallpapers(); });

	$('showIPToggle').addEventListener('change', e => {
		settings.showIP = e.target.checked;
		saveSettings(); showIPInfo(settings.showIP);
	});

	$('exportBtn').addEventListener('click', exportConfig);
	$('importBtn').addEventListener('click', () => importConfig(onConfig));
	$('restoreBtn').addEventListener('click', () => {
		if (!confirm(t('confirm.restore'))) return;
		// Drop the cached favicons so a restore re-fetches every icon fresh.
		clearFaviconCache();
		onConfig(CFG);
	});

	registerWindow('settings', {
		el: panel, bar: $('settingsBar'), menuItem: $('mbSettings'),
		onOpen: showSettings,
	});
}
