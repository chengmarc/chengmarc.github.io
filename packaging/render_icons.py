"""Render the extension's icons from src/app-icon.svg.

    pip install playwright && playwright install chromium
    python packaging/render_icons.py

Writes packaging/icons/icon-<size>.png at 16, 32, 48 and 128 px, the sizes
manifest.json names, and store-listing/logo-300x300.png, the logo Edge
Add-ons asks for (kept out of icons/ so it isn't packaged). Each is drawn by
Chromium straight at its size, not scaled down from a large render, so small
sizes stay crisp.

Run from anywhere. Set CHROMIUM_PATH to use a Chromium other than Playwright's.
"""
import base64
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

PACKAGING = Path(__file__).resolve().parent
ROOT = PACKAGING.parent
SVG = ROOT / 'src' / 'app-icon.svg'
ICONS = PACKAGING / 'icons'
SIZES = [16, 32, 48, 128]
STORE_LOGO = (ROOT / 'store-listing' / 'logo-300x300.png', 300)


def main():
    src = 'data:image/svg+xml;base64,' + base64.b64encode(SVG.read_bytes()).decode()
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None)
        for path, size in [(ICONS / f'icon-{size}.png', size) for size in SIZES] + [STORE_LOGO]:
            page = browser.new_page(viewport={'width': size, 'height': size})
            page.set_content(f'<body style="margin:0"><img src="{src}" width="{size}" height="{size}" style="display:block"></body>')
            page.screenshot(path=str(path), omit_background=True)
            page.close()
            print(f'wrote {path.relative_to(ROOT).as_posix()}')
        browser.close()


if __name__ == '__main__':
    main()
