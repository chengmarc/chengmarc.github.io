"""Make the Settings swatches: a 320x180 thumbnail of each wallpaper.

    pip install pillow
    python scripts/render_thumbs.py

Writes src/thumbs/<name>.jpg for every src/wallpapers/<name>.jpg. Each is
cropped from the top, as the wallpaper itself is laid out (`top center /
cover` in settings.js), so the swatch shows what the desktop will.

Run from anywhere.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
WALLPAPERS = ROOT / 'src' / 'wallpapers'
THUMBS = ROOT / 'src' / 'thumbs'
SIZE = (320, 180)


def main():
    for wallpaper in sorted(WALLPAPERS.glob('*.jpg')):
        with Image.open(wallpaper) as im:
            thumb = ImageOps.fit(im.convert('RGB'), SIZE, Image.LANCZOS, centering=(0.5, 0))
        thumb.save(THUMBS / wallpaper.name, 'JPEG', quality=80, progressive=True, optimize=True)
        print('wrote thumbs/' + wallpaper.name)


if __name__ == '__main__':
    main()
