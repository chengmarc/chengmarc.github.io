# Bookmark OS — browser extension

Packages the website as a **New Tab** extension for Chrome, Edge and Firefox. The extension ships the same `index.html` and `src/` as the site; this folder only adds the manifest, icons and store material.

```
extension/
  manifest.json     MV3 manifest (Chrome/Edge); build.py adds Firefox's gecko settings
  build.py          stages the packages in build/ and zips them into dist/
  icons/            16/32/48/128 px, rendered from src/app-icon.svg
  badges/           store badges shown in the README
  promo/            screenshots and promo tiles (promo.html renders the tiles)
  LISTING.md        store listing text and privacy answers
  PRIVACY.md        privacy policy (linked from the store listings)
```

## Build

```
python extension/build.py
```

Produces `dist/bookmark-os-chrome-<version>.zip` (Chrome Web Store and Edge Add-ons) and `dist/bookmark-os-firefox-<version>.zip` (Firefox Add-ons). Bump `version` in `manifest.json` before each store upload.

In the packaged copy, the page title is set to "New Tab". The Firefox build also sets the homepage to the same page, because Firefox opens new windows on the homepage rather than the new tab page.

## Test locally

- **Chrome / Edge:** open `chrome://extensions` (or `edge://extensions`), turn on Developer mode, unzip `dist/bookmark-os-chrome-*.zip` to a folder, click **Load unpacked**, pick that folder, then open a new tab.
- **Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, pick `dist/bookmark-os-firefox-*.zip`, then open a new tab.

## Publish

| Store | Upload | Dashboard |
|---|---|---|
| Chrome Web Store | `bookmark-os-chrome-*.zip` | https://chrome.google.com/webstore/devconsole (one-time $5 registration) |
| Edge Add-ons | `bookmark-os-chrome-*.zip` | https://partner.microsoft.com/dashboard/microsoftedge |
| Firefox Add-ons | `bookmark-os-firefox-*.zip` | https://addons.mozilla.org/developers/ |

Listing text and privacy answers are in `LISTING.md`; images are in `promo/`.
