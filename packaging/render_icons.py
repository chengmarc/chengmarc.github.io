"""Render the extension's icons from src/app-icon.svg.

    pip install playwright && playwright install chromium
    python packaging/render_icons.py

Writes packaging/icons/icon-<size>.png at 16, 32, 48 and 128 px, the sizes
manifest.json names. Each is drawn by Chromium straight at its size, not
scaled down from a large render, so small sizes stay crisp.

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


def main():
    src = 'data:image/svg+xml;base64,' + base64.b64encode(SVG.read_bytes()).decode()
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or None)
        for size in SIZES:
            page = browser.new_page(viewport={'width': size, 'height': size})
            page.set_content(f'<body style="margin:0"><img src="{src}" width="{size}" height="{size}" style="display:block"></body>')
            page.screenshot(path=str(ICONS / f'icon-{size}.png'), omit_background=True)
            page.close()
            print(f'wrote icons/icon-{size}.png')
        browser.close()


if __name__ == '__main__':
    main()
