"""Render every designed image of the extension from the live page, into
promo/out/, by where each goes.

    pip install playwright && playwright install chromium
    python promo/generator/render.py [--no-store]

Writes, from index.html, the images the three stores share (none kept in git):
    promo/out/store/screenshot-1-desktop.png    1280x800, High Sierra, the desktop
    promo/out/store/screenshot-2-apps.png       1280x800, Tahoe, All Apps open
    promo/out/store/screenshot-3-settings.png   1280x800, El Capitan, Settings open
and the promo tiles, laid out by promo.html around a desktop captured here:
    promo/out/store/promo-440x280.png    the store's search tile: the whole desktop, on
                                         High Sierra, with the "Synced" window
    promo/out/store/promo-1400x560.png   the marquee: the pitch, beside screenshot 1 with the same window
    promo/out/social-preview.png         GitHub's preview of the repository, uploaded in its
                                         Settings: the marquee's layout at 1280x640
and portfolio.html's square tile for a job profile's portfolio:
    promo/out/portfolio.png              1080x1080, screenshot 1 with the same window
and copies the screenshots into docs/screenshots/, which git keeps: the README
shows them, and the site's og:image is the first.

With --no-store, only the social preview and the portfolio tile, from the
screenshot 1 in docs/screenshots/, in a few seconds.

Every capture starts from a fresh profile, in English, with the clock stopped
at 09:41. The country chip shows, as it does by default, but with a made-up
answer (the United States), so your own country never ends up in a store
image. The
page acts as the extension (its APIs stubbed), so Settings shows Browser Sync
and the welcome window can appear. Site icons come from the network, as for a
visitor; offline, the gray placeholder shows.

Run from anywhere. Set CHROMIUM_PATH to use a Chromium other than Playwright's.
"""
import base64
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

GENERATOR = Path(__file__).resolve().parent
ROOT = GENERATOR.parents[1]
STORE = ROOT / 'promo' / 'out' / 'store'
README_SHOTS = ROOT / 'docs' / 'screenshots'

SCREENSHOT = (1280, 800)
# (file, wallpaper id from settings.js, what's open)
SHOTS = [
    ('screenshot-1-desktop.png',  'high-sierra', None),
    ('screenshot-2-apps.png',     'tahoe',       'apps'),
    ('screenshot-3-settings.png', 'el-capitan',  'settings'),
]

# The search tile's desktop: the sample desktop on High Sierra, captured at the
# tile's own shape (440x280, scaled 2.6x), tall enough for the grid's five
# rows above the dock (grid.js), so its icons sit as they do in screenshot 1.
# The country chip is off here, since at this scale it would only clutter
# the menu bar.
TILE_DESKTOP = (1144, 728)

# What the location service answers in the captures, instead of the truth.
FAKE_PLACE = {'success': True, 'country': 'United States', 'country_code': 'US'}

# Where the page keeps its settings and desktop (SETTINGS_STORE in settings.js,
# STORE in state.js); the captures seed both before the page loads.
SETTINGS_KEY = 'webos_settings'
STATE_KEY = 'webos_v1'

BOOT = 1300        # ms: the boot splash lifts at 1s
ICONS = 15000      # ms: the longest wait for site icons (each probe gives up at 5s)
LOOKUP = 8000      # ms: the longest wait for icons first shown in an opened window
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
    typeof openAllApps === 'function' || 'apps.js has no openAllApps()',
].filter(r => r !== true)"""


def capture(browser, size, wallpaper, open_=None, state=None, show_country=True):
    """The page at `size`, as PNG bytes. `state` replaces the sample desktop."""
    width, height = size
    page = browser.new_page(viewport={'width': width, 'height': height}, locale='en-US')
    page.add_init_script(SETUP % json.dumps({
        'settings': {'wallpaper': wallpaper, 'language': 'en', 'showLocation': show_country, 'autoSync': False},
        'state': state, 'settingsKey': SETTINGS_KEY, 'stateKey': STATE_KEY,
    }))
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
        page.evaluate("openAllApps()")
    if open_ in ('settings', 'apps'):
        # Tiles that weren't on the desktop start their icon lookup only now.
        # Wait until none shows the gray placeholder; a site with no icon
        # keeps it, hence the cap.
        try:
            page.wait_for_function(
                "![...document.querySelectorAll('.icon-sharp')].some(i => i.src.endsWith('placeholder-glyph.svg'))",
                timeout=LOOKUP)
        except Exception:
            pass
    page.mouse.move(width - 1, height // 2)   # away from icons and the dock
    page.wait_for_timeout(SETTLE)
    png = page.screenshot()
    page.close()
    return png


def promo(browser, out, layout, size, desktop_png):
    """promo.html at `size`, with `desktop_png` as the desktop it shows,
    saved at `out` (a path relative to the repository)."""
    width, height = size
    page = browser.new_page(viewport={'width': width, 'height': height})
    page.goto((GENERATOR / 'promo.html').as_uri() + '?' + layout)
    page.evaluate("""src => new Promise(done => {
        const img = document.getElementById('desktop');
        img.onload = done; img.src = src;
    })""", 'data:image/png;base64,' + base64.b64encode(desktop_png).decode())
    page.evaluate('document.fonts.ready')
    page.screenshot(path=str(ROOT / out))
    page.close()
    print('wrote ' + out)


def page_shot(browser, out, page_name, size):
    """A page beside this script at `size`, saved at `out` (relative to the repository)."""
    width, height = size
    page = browser.new_page(viewport={'width': width, 'height': height})
    page.goto((GENERATOR / page_name).as_uri())
    page.wait_for_load_state('networkidle')
    page.evaluate('document.fonts.ready')
    (ROOT / out).parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(ROOT / out))
    page.close()
    print('wrote ' + out)


def main():
    no_store = '--no-store' in sys.argv[1:]
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None)
        if no_store:
            shots = {'screenshot-1-desktop.png': (README_SHOTS / 'screenshot-1-desktop.png').read_bytes()}
        else:
            shots = {}
            STORE.mkdir(parents=True, exist_ok=True)
            README_SHOTS.mkdir(parents=True, exist_ok=True)
            for name, wallpaper, open_ in SHOTS:
                shots[name] = capture(browser, SCREENSHOT, wallpaper, open_)
                (STORE / name).write_bytes(shots[name])
                (README_SHOTS / name).write_bytes(shots[name])
                print('wrote promo/out/store/' + name + ', docs/screenshots/' + name)
            tile_desktop = capture(browser, TILE_DESKTOP, 'high-sierra', show_country=False)
            promo(browser, 'promo/out/store/promo-440x280.png', 'small', (440, 280), tile_desktop)
            promo(browser, 'promo/out/store/promo-1400x560.png', 'marquee', (1400, 560), shots['screenshot-1-desktop.png'])
        promo(browser, 'promo/out/social-preview.png', 'social', (1280, 640), shots['screenshot-1-desktop.png'])
        page_shot(browser, 'promo/out/portfolio.png', 'portfolio.html', (1080, 1080))
        browser.close()


if __name__ == '__main__':
    main()
