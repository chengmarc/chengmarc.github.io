# Releasing the browser extension

Packages the website as a **New Tab** extension for Chrome, Edge and Firefox. The extension ships the same `index.html` and `src/` as the site; these folders add the manifest, icons and store material.

```
packaging/
  manifest.json     MV3 manifest (Chrome/Edge); build.py adds Firefox's gecko settings
  build.py          stages the packages in build/ and zips them into dist/
  icons/            16/32/48/128 px, rendered from src/app-icon.svg
store-listing/
  LISTING.md        store listing text and privacy answers
  PRIVACY.md        privacy policy (linked from the store listings)
  promo-*.png       the promo tiles (generator/promo.html lays them out)
  desktop/          the screenshots, 1280x800
  generator/        render.py renders the screenshots and the promo tiles
docs/badges/        store badges shown in the README
```

## Build

```
python packaging/build.py
```

Produces `dist/bookmark-os-chrome-<version>.zip` (Chrome Web Store and Edge Add-ons) and `dist/bookmark-os-firefox-<version>.zip` (Firefox Add-ons). Bump `version` in `packaging/manifest.json` before each store upload.

In the packaged copy, the page title is set to "New Tab". The Firefox build also sets the homepage to the same page, because Firefox opens new windows on the homepage rather than the new tab page.

## Test locally

- **Chrome / Edge:** open `chrome://extensions` (or `edge://extensions`), turn on Developer mode, click **Load unpacked**, pick `build/chrome/`, then open a new tab.
- **Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, pick `dist/bookmark-os-firefox-*.zip`, then open a new tab.

## Publish

| Store | Upload | Dashboard |
|---|---|---|
| Chrome Web Store | `bookmark-os-chrome-*.zip` | https://chrome.google.com/webstore/devconsole (one-time $5 registration) |
| Edge Add-ons | `bookmark-os-chrome-*.zip` | https://partner.microsoft.com/dashboard/microsoftedge |
| Firefox Add-ons | `bookmark-os-firefox-*.zip` | https://addons.mozilla.org/developers/ |

Refresh the images after a UI change, then check them before uploading:

```
pip install playwright && playwright install chromium
python store-listing/generator/render.py
```

Listing text and privacy answers are in [`store-listing/LISTING.md`](../store-listing/LISTING.md); the promo tiles are beside it, the screenshots in `store-listing/desktop/`.
