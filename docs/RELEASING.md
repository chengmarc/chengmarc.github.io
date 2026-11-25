# Releasing the browser extension

Packages the website as a **New Tab** extension for Chrome, Edge and Firefox. The extension ships the same `index.html` and `src/` as the site; these folders add the manifest, icons and store material.

```
packaging/
  manifest.json     MV3 manifest (Chrome/Edge); build.py adds Firefox's gecko settings
  build.py          stages the packages in build/ and zips them into dist/
  render_icons.py   renders icons/ and Edge's store logo from src/app-icon.svg
  icons/            16/32/48/128 px
promo/
  generator/        render.py renders every image below from the live page;
                    promo.html and portfolio.html lay out the designed ones
  listing/
    LISTING.md      every store dashboard field, per store
    PRIVACY.md      privacy policy (linked from the store listings)
  out/              the images, by where each goes; all kept in git
    store/          what the three stores share: the screenshots at 1280x800
                    (also the README's and the site's og:image), the promo
                    tiles and Edge's logo-300x300.png
    social-preview.png  uploaded in the repo's Settings
    portfolio.png   a square tile for a job profile's portfolio
docs/badges/        store badges shown in the README
```

## Build

The icons are committed, not built, so first check they still match their source. The generator reproduces the committed files byte for byte, so `git status` should show no change to them:

```
pip install playwright && playwright install chromium
python packaging/render_icons.py
git status packaging/icons
python packaging/build.py
```

A change there means the icon was edited without rerunning its generator. Commit the new images.

Produces `dist/home-page-os-chrome-<version>.zip` (Chrome Web Store and Edge Add-ons) and `dist/home-page-os-firefox-<version>.zip` (Firefox Add-ons). Bump `version` in `packaging/manifest.json` before each store upload.

In the packaged copy, the page title is set to "New Tab". The Firefox build also sets the homepage to the same page, because Firefox opens new windows on the homepage rather than the new tab page.

## Test locally

- **Chrome / Edge:** open `chrome://extensions` (or `edge://extensions`), turn on Developer mode, click **Load unpacked**, pick `build/chrome/`, then open a new tab.
- **Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, pick `dist/home-page-os-firefox-*.zip`, then open a new tab.

## Publish

| Store | Upload | Dashboard |
|---|---|---|
| Chrome Web Store | `home-page-os-chrome-*.zip` | https://chrome.google.com/webstore/devconsole (one-time $5 registration) |
| Edge Add-ons | `home-page-os-chrome-*.zip` | https://partner.microsoft.com/dashboard/microsoftedge |
| Firefox Add-ons | `home-page-os-firefox-*.zip` | https://addons.mozilla.org/developers/ |

Refresh the images after a UI change, then check them before uploading:

```
pip install playwright && playwright install chromium
python promo/generator/render.py              # --no-store: only the social preview and portfolio tile
```

Listing text and privacy answers are in [`promo/listing/LISTING.md`](../promo/listing/LISTING.md); the images, screenshots included, are in `promo/out/store/`.
