"""Package the site as a New Tab browser extension.

The extension ships the exact same index.html / src / media as the website —
this script only adds a manifest and icons, then zips one package per store:

    dist/chrome/                           unpacked, for "Load unpacked" testing
    dist/firefox/                          unpacked, for about:debugging testing
    dist/bookmark-os-chrome-<ver>.zip      Chrome Web Store + Edge Add-ons
    dist/bookmark-os-firefox-<ver>.zip     Firefox Add-ons (AMO)

Run from anywhere:  python extension/build.py
"""
import json
import re
import shutil
import zipfile
from pathlib import Path

EXT  = Path(__file__).resolve().parent
ROOT = EXT.parent
DIST = ROOT / 'dist'

# Website-only files the new tab page never loads: the README screenshot and
# badges (demo.png is referenced only as an absolute og:image URL).
SKIP = {'media/demo.png', 'media/badge-browsers.svg', 'media/badge-demo.svg',
        'media/badge-chrome.png'}

# Firefox needs a stable add-on ID and, for new AMO listings, a declaration of
# what data leaves the browser. Icons are looked up by sending each bookmark's
# URL to Google's favicon service, so bookmark URLs are declared.
GECKO = {
    'id': 'bookmark-os@chengmarc.com',
    'strict_min_version': '140.0',
    'data_collection_permissions': {'required': ['bookmarksInfo']},
}


def stage(target: str, manifest: dict) -> Path:
    out = DIST / target
    shutil.rmtree(out, ignore_errors=True)
    out.mkdir(parents=True)

    # A new tab page should read "New Tab" in the tab strip, not the
    # website's SEO title.
    html = (ROOT / 'index.html').read_text(encoding='utf-8-sig')
    html = re.sub(r'<title>.*?</title>', '<title>New Tab</title>', html, count=1)
    (out / 'index.html').write_text(html, encoding='utf-8')

    for folder in ('src', 'media'):
        for f in (ROOT / folder).rglob('*'):
            rel = f.relative_to(ROOT).as_posix()
            if f.is_file() and rel not in SKIP:
                (out / rel).parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, out / rel)

    shutil.copytree(EXT / 'icons', out / 'icons')
    (out / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    return out


def pack(folder: Path, zip_path: Path) -> None:
    zip_path.unlink(missing_ok=True)
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(folder.rglob('*')):
            if f.is_file():
                z.write(f, f.relative_to(folder).as_posix())


def main() -> None:
    base = json.loads((EXT / 'manifest.json').read_text(encoding='utf-8'))
    version = base['version']
    targets = {
        'chrome':  base,
        'firefox': {**base, 'browser_specific_settings': {'gecko': GECKO}},
    }
    for target, manifest in targets.items():
        folder = stage(target, manifest)
        zip_path = DIST / f'bookmark-os-{target}-{version}.zip'
        pack(folder, zip_path)
        files = sum(1 for f in folder.rglob('*') if f.is_file())
        print(f'{zip_path.relative_to(ROOT)}  {files} files, {zip_path.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
