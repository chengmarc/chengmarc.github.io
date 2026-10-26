"""Render the store screenshots and promo tiles from the live page.

    pip install playwright && playwright install chromium
    python store-listing/generator/render.py

Writes, from index.html:
    store-listing/desktop/screenshot-1-desktop.png    1280x800, Tahoe, the desktop
    store-listing/desktop/screenshot-2-settings.png   1280x800, Golden Gate, Settings open
    store-listing/desktop/screenshot-3-sync.png       1280x800, Sequoia, the "Keep in sync?" window
and then, from promo.html (which frames screenshot 1):
    store-listing/promo-440x280.png, store-listing/promo-1400x560.png

Every shot starts from a fresh profile: the sample desktop, English, and the
clock stopped at 09:41. The location/IP chip shows, as it does by default, but
with made-up answers (San Francisco, and 203.0.113.42 from the range reserved
for documentation), so your own city and IP never end up in a store image. The page acts as the extension (its APIs stubbed), so
Settings shows Browser Sync and the welcome window can appear. Site icons come
from the network, as for a visitor; offline, the local fallback tiles show.

Run from anywhere. Set CHROMIUM_PATH to use a Chromium other than Playwright's.
"""
import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

GENERATOR = Path(__file__).resolve().parent
LISTING = GENERATOR.parent
ROOT = LISTING.parent
SIZE = {'width': 1280, 'height': 800}

# (file, wallpaper id from settings.js, what's open)
SHOTS = [
    ('screenshot-1-desktop.png',  'tahoe',       None),
    ('screenshot-2-settings.png', 'golden-gate', 'settings'),
    ('screenshot-3-sync.png',     'sequoia',     'welcome'),
]
PROMOS = [('promo-440x280.png', 440, 280, 'small'), ('promo-1400x560.png', 1400, 560, 'marquee')]

# What the IP and location services answer in the shots, instead of the truth.
FAKE_IP = {'ip': '203.0.113.42'}
FAKE_PLACE = {'success': True, 'ip': '203.0.113.42', 'city': 'San Francisco', 'region': 'California',
              'country': 'United States', 'country_code': 'US'}

BOOT = 2800        # ms: the boot splash lifts at 2.5s
ICONS = 15000      # ms: the longest wait for site icons (each probe gives up at 5s)
SETTLE = 700       # ms: a window's spring-in animation, with room to spare

# Runs before the page's own scripts, in its own scope: the page declares
# globals like `settings` itself.
SETUP = """(() => {
    // The extension's APIs, as far as the page needs them for these shots.
    window.chrome = { permissions: { request: () => Promise.resolve(false), contains: () => Promise.resolve(false) } };
    // Stop the clock at 09:41 today.
    const RealDate = Date, FIXED = new RealDate().setHours(9, 41, 0, 0);
    window.Date = class extends RealDate {
        constructor(...a) { super(...(a.length ? a : [FIXED])); }
        static now() { return FIXED; }
    };
    localStorage.setItem('webos_settings', JSON.stringify(%s));
})();"""


def shoot(browser, name, wallpaper, open_):
    page = browser.new_page(viewport=SIZE, locale='en-US')
    page.add_init_script(SETUP % json.dumps({'wallpaper': wallpaper, 'language': 'en', 'showIP': True, 'autoSync': False}))
    page.route('https://api.ipify.org/**', lambda r: r.fulfill(json=FAKE_IP))
    page.route('https://ipwho.is/**', lambda r: r.fulfill(json=FAKE_PLACE))
    page.goto((ROOT / 'index.html').as_uri())
    page.wait_for_timeout(BOOT)
    try:
        page.wait_for_load_state('networkidle', timeout=ICONS)
    except Exception:  # an icon host that never answers: shoot with what's there
        pass
    if open_ != 'welcome':
        # A fresh profile is a first run, so the welcome window opens: put it away.
        page.evaluate("document.getElementById('welcome').classList.remove('open')")
    if open_ == 'settings':
        page.evaluate("openWindow('settings')")
    page.mouse.move(SIZE['width'] - 1, SIZE['height'] // 2)   # away from icons and the dock
    page.wait_for_timeout(SETTLE)
    page.screenshot(path=str(LISTING / 'desktop' / name))
    page.close()
    print('wrote desktop/' + name)


def promo(browser, name, width, height, layout):
    page = browser.new_page(viewport={'width': width, 'height': height})
    page.goto((GENERATOR / 'promo.html').as_uri() + '?' + layout)
    page.wait_for_load_state('networkidle')
    page.evaluate('document.fonts.ready')
    page.screenshot(path=str(LISTING / name))
    page.close()
    print('wrote ' + name)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None)
        for shot in SHOTS:
            shoot(browser, *shot)
        for tile in PROMOS:
            promo(browser, *tile)
        browser.close()


if __name__ == '__main__':
    main()
