// ─────────────────────────────────────────────────────────────────────
// Browser bookmark sync (extension only) — reading the Bookmarks bar as a
// config, syncing it once (Sync Now) or always (the Settings toggle), and
// the welcome window that offers the latter on a first run.
// ─────────────────────────────────────────────────────────────────────
// The extension API object, or null on the website. `chrome` exists on any
// Chrome page, so check for `permissions`, which only extension pages get.
const EXT_API = (globalThis.browser && globalThis.browser.permissions) ? globalThis.browser
	: (globalThis.chrome && globalThis.chrome.permissions) ? globalThis.chrome : null;
const WELCOME = 'webos_welcome';

// Read the browser's Bookmarks bar as a config. Each folder in the bar becomes
// a category holding every link beneath it, however deep; loose links in the
// bar become desktop icons and also fill an "Uncategorized" category. The dock
// is kept as is. Needs the `bookmarks` permission already granted.
function readBrowserBookmarks() {
	return EXT_API.bookmarks.getTree().then(tree => {
		const bar = tree[0].children.find(n => n.folderType === 'bookmarks-bar' || n.id === 'toolbar_____' || n.id === '1');
		if (!bar) throw new Error(t('error.noBookmarksBar'));

		// Only links the page can open; skips Firefox `place:` queries, bookmarklets, etc.
		const isLink = n => n.url && /^https?:/i.test(n.url);
		const toLink = n => ({ label: n.title || domainFrom(n.url), url: n.url });
		const linksUnder = n => isLink(n) ? [toLink(n)] : (n.children || []).flatMap(linksUnder);

		const desktopIcons = [], blocks = [], loose = [], seen = new Set();
		(bar.children || []).forEach((n, i) => {
			if (isLink(n)) {
				if (seen.has(n.url)) return;
				seen.add(n.url);
				const { label, url } = toLink(n);
				loose.push({ label, url });
				desktopIcons.push({ key: 'icon-' + domainFrom(url).replace(/\./g, '-') + '-' + i, label, url });
			} else if (n.children) {
				blocks.push({ title: n.title, links: linksUnder(n) });
			}
		});
		// A bar with no links at all would wipe the desktop and every category,
		// silently and on every new tab under Always sync: refuse instead.
		if (!loose.length && !blocks.some(b => b.links.length)) throw new Error(t('error.emptyBookmarksBar'));
		// Loose links also get a category, so All Apps lists and searches them.
		if (loose.length) blocks.push({ title: t('apps.uncategorized'), links: loose });
		return keepIconPositions({ desktopIcons, dock: S.dock, bookmarkSections: [{ blocks }] });
	});
}

// A synced icon whose URL is already on the desktop keeps that icon's key and
// grid cell; the rest are left unplaced, for replaceState to put in free cells.
function keepIconPositions(cfg) {
	const current = new Map(S.desktopIcons.map(i => [i.url, i]));
	cfg.desktopIcons.forEach(icon => {
		const old = current.get(icon.url);
		if (old) { icon.key = old.key; icon.col = old.col; icon.row = old.row; }
	});
	return cfg;
}

// Sync once, from a click: hand the Bookmarks bar's config to onConfig.
// `bookmarks` is an optional permission, requested here — first thing, since
// Firefox only allows it straight off a click.
function syncFromBrowser(onConfig) {
	EXT_API.permissions.request({ permissions: ['bookmarks'] }).then(granted => {
		if (!granted) return;
		if (!confirm(t('confirm.sync'))) return;
		return readBrowserBookmarks().then(onConfig);
	}).catch(err => alert(t('error.syncFailed', { msg: err.message })));
}

// ── Always-on browser sync ────────────────────────────────────────────
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
// runs this, and most find the Bookmarks bar as they left it. Unlike a
// replace (applyConfig), it happens unasked, so it leaves the user where they
// were: the selected category, and edit mode if they're in it.
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

// From the toggle's click, or the welcome window's (ask = false: the window
// already asked). The permission request comes first, since Firefox only
// grants permissions straight off a user gesture.
function toggleAutoSync(on, ask = true) {
	if (!on) { setAutoSync(false); return; }
	EXT_API.permissions.request({ permissions: ['bookmarks'] }).then(granted => {
		const ok = granted && (!ask || confirm(t('confirm.autoSync')));
		setAutoSync(!!ok);
	}).catch(err => { setAutoSync(false); alert(t('error.syncFailed', { msg: err.message })); });
}

// On load: pick up where the last tab left off, unless the permission has
// since been revoked, which turns the setting off.
function startAutoSync() {
	if (!settings.autoSync) return;
	EXT_API.permissions.contains({ permissions: ['bookmarks'] })
		.then(granted => setAutoSync(granted))
		.catch(() => setAutoSync(false));
}

// ── Welcome window ────────────────────────────────────────────────────
// First run in the extension: asks whether to keep the desktop in sync with
// the browser, before anything is synced. Called once the boot splash lifts.
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

// ── Setup ─────────────────────────────────────────────────────────────
// `onConfig` puts a synced config on the desktop (app.js's applyConfig).
// `firstRun` (nothing saved yet) flags the welcome window, which then shows
// until the user picks an option, even if this tab is closed first. On the
// website, which can't read bookmarks, the Settings sync section goes.
function setupSync(onConfig, firstRun) {
	if (firstRun) try { localStorage.setItem(WELCOME, '1'); } catch (_) {}
	if (!EXT_API) { $('settingsSync').remove(); return; }
	$('autoSyncToggle').checked = settings.autoSync;
	$('syncNowBtn').addEventListener('click', () => syncFromBrowser(onConfig));
	$('autoSyncToggle').addEventListener('change', e => toggleAutoSync(e.target.checked));
	startAutoSync();
}
