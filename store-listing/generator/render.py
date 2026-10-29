"""Render the store screenshots and promo tiles from the live page.

    pip install playwright && playwright install chromium
    python store-listing/generator/render.py

Writes, from index.html:
    store-listing/desktop/screenshot-1-desktop.png    1280x800, High Sierra, the desktop
    store-listing/desktop/screenshot-2-settings.png   1280x800, Tahoe, Settings open
    store-listing/desktop/screenshot-3-apps.png       1280x800, Big Sur, All Apps open
and the promo tiles, laid out by promo.html around a desktop captured here:
    store-listing/promo-440x280.png    the store's search tile: the whole desktop, on
                                       High Sierra, with the "Synced" window
    store-listing/promo-1400x560.png   the marquee: the pitch, beside screenshot 1 with the same window

Every capture starts from a fresh profile, in English, with the clock stopped
at 09:41. The location/IP chip shows, as it does by default, but with made-up
answers (San Francisco, and 203.0.113.42 from the range reserved for
documentation), so your own city and IP never end up in a store image. The
page acts as the extension (its APIs stubbed), so Settings shows Browser Sync
and the welcome window can appear. Site icons come from the network, as for a
visitor; offline, the local fallback tiles show.

Run from anywhere. Set CHROMIUM_PATH to use a Chromium other than Playwright's.
"""
import base64
import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

GENERATOR = Path(__file__).resolve().parent
LISTING = GENERATOR.parent
ROOT = LISTING.parent

SCREENSHOT = (1280, 800)
# (file, wallpaper id from settings.js, what's open)
SHOTS = [
    ('screenshot-1-desktop.png',  'high-sierra', None),
    ('screenshot-2-settings.png', 'tahoe',       'settings'),
    ('screenshot-3-apps.png',     'big-sur',     'apps'),
]

# The search tile's desktop: the sample desktop on High Sierra, captured at the
# tile's own shape (440x280, scaled 2.5x), at a size where all its icons
# fit above the dock. The location/IP chip is off here, since
# at this scale it would only clutter the menu bar.
TILE_DESKTOP = (1100, 700)

# What the IP and location services answer in the captures, instead of the truth.
FAKE_IP = {'ip': '203.0.113.42'}
FAKE_PLACE = {'success': True, 'ip': '203.0.113.42', 'city': 'San Francisco', 'region': 'California',
              'country': 'United States', 'country_code': 'US'}

# Where the page keeps its settings and desktop (SETTINGS_STORE in settings.js,
# STORE in state.js); the captures seed both before the page loads.
SETTINGS_KEY = 'webos_settings'
STATE_KEY = 'webos_v1'

BOOT = 1300        # ms: the boot splash lifts at 1s
ICONS = 15000      # ms: the longest wait for site icons (each probe gives up at 5s)
SETTLE = 700       # ms: a window's spring-in animation, with room to spare

# Runs before the page's own scripts, in its own scope: the page declares
# globals like `settings` itself.
SETUP = """(() => {
    // The extension's APIs, as far as the page needs them for these captures.
    window.chrome = { permissions: { request: () => Promise.resolve(false), contains: () => Promise.resolve(false) } };
    // Stop the clock at 09:41 today.
    const RealDate = Date, FIXED = new RealDate().setHours(9, 41, 0, 0);
    window.Date = class extends RealDate {
        constructor(...a) { super(...(a.length ? a : [FIXED])); }
        static now() { return FIXED; }
    };
    const seed = %s;
    localStorage.setItem(seed.settingsKey, JSON.stringify(seed.settings));
    if (seed.state) localStorage.setItem(seed.stateKey, JSON.stringify(seed.state));
})();"""

# What this script takes for granted about the page. Each check returns true,
# or what has changed; a capture stops on the first page that fails one, so
# a renamed key or id can't quietly produce images of the wrong thing.
CHECKS = """([settingsKey, stateKey, wallpaper]) => [
    SETTINGS_STORE === settingsKey || `settings.js stores settings under ${SETTINGS_STORE}, not ${settingsKey}`,
    STORE === stateKey || `state.js stores the desktop under ${STORE}, not ${stateKey}`,
    WALLPAPERS.some(w => w.id === wallpaper) || `settings.js has no wallpaper "${wallpaper}"`,
    !!document.getElementById('welcome') || 'index.html has no #welcome window',
    typeof openWindow === 'function' || 'windows.js has no openWindow()',
    typeof openAllBookmarks === 'function' || 'bookmarks.js has no openAllBookmarks()',
].filter(r => r !== true)"""


def capture(browser, size, wallpaper, open_=None, state=None, show_ip=True):
    """The page at `size`, as PNG bytes. `state` replaces the sample desktop."""
    width, height = size
    page = browser.new_page(viewport={'width': width, 'height': height}, locale='en-US')
    page.add_init_script(SETUP % json.dumps({
        'settings': {'wallpaper': wallpaper, 'language': 'en', 'showIP': show_ip, 'autoSync': False},
        'state': state, 'settingsKey': SETTINGS_KEY, 'stateKey': STATE_KEY,
    }))
    page.route('https://api.ipify.org/**', lambda r: r.fulfill(json=FAKE_IP))
    page.route('https://ipwho.is/**', lambda r: r.fulfill(json=FAKE_PLACE))
    page.goto((ROOT / 'index.html').as_uri())
    changed = page.evaluate(CHECKS, [SETTINGS_KEY, STATE_KEY, wallpaper])
    if changed:
        raise SystemExit('render.py no longer matches the page:\n  ' + '\n  '.join(changed))
    page.wait_for_timeout(BOOT)
    try:
        page.wait_for_load_state('networkidle', timeout=ICONS)
    except Exception:  # an icon host that never answers: capture with what's there
        pass
    if open_ != 'welcome':
        # A fresh profile is a first run, so the welcome window opens: put it away.
        page.evaluate("document.getElementById('welcome').classList.remove('open')")
    if open_ == 'settings':
        page.evaluate("openWindow('settings')")
    if open_ == 'apps':
        page.evaluate("openAllBookmarks()")
    page.mouse.move(width - 1, height // 2)   # away from icons and the dock
    page.wait_for_timeout(SETTLE)
    png = page.screenshot()
    page.close()
    return png


def promo(browser, name, layout, size, desktop_png):
    """promo.html at `size`, with `desktop_png` as the desktop it shows."""
    width, height = size
    page = browser.new_page(viewport={'width': width, 'height': height})
    page.goto((GENERATOR / 'promo.html').as_uri() + '?' + layout)
    page.evaluate("""src => new Promise(done => {
        const img = document.getElementById('desktop');
        img.onload = done; img.src = src;
    })""", 'data:image/png;base64,' + base64.b64encode(desktop_png).decode())
    page.evaluate('document.fonts.ready')
    page.screenshot(path=str(LISTING / name))
    page.close()
    print('wrote ' + name)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None)
        shots = {}
        for name, wallpaper, open_ in SHOTS:
            shots[name] = capture(browser, SCREENSHOT, wallpaper, open_)
            (LISTING / 'desktop' / name).write_bytes(shots[name])
            print('wrote desktop/' + name)
        tile_desktop = capture(browser, TILE_DESKTOP, 'high-sierra', show_ip=False)
        promo(browser, 'promo-440x280.png', 'small', (440, 280), tile_desktop)
        promo(browser, 'promo-1400x560.png', 'marquee', (1400, 560), shots['screenshot-1-desktop.png'])
        browser.close()


if __name__ == '__main__':
    main()
