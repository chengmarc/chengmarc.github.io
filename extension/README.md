# Bookmark OS — browser extension

Packages the website as a **New Tab** extension for Chrome, Edge and Firefox. The extension ships the same `index.html`, `src/` and `media/` as the site; this folder only adds the manifest, icons and store material.

```
extension/
  manifest.json     MV3 manifest (Chrome/Edge); build.py adds Firefox's gecko settings
  build.py          stages and zips the packages into dist/
  icons/            16/32/48/128 px, rendered from media/app-icon.svg
  store/            listing text, screenshots, promo tile
  PRIVACY.md        privacy policy (linked from the store listings)
```

## Build

```
python extension/build.py
```

Produces `dist/bookmark-os-chrome-<version>.zip` (Chrome Web Store and Edge Add-ons) and `dist/bookmark-os-firefox-<version>.zip` (Firefox Add-ons), plus unpacked copies in `dist/chrome/` and `dist/firefox/`. Bump `version` in `manifest.json` before each store upload.

In the packaged copy, the page title is set to "New Tab", and the README-only media (demo screenshot, badges) is left out. The Firefox build also sets the homepage to the same page, because Firefox opens new windows on the homepage rather than the new tab page.

## Test locally

- **Chrome / Edge:** open `chrome://extensions` (or `edge://extensions`), turn on Developer mode, click **Load unpacked**, pick `dist/chrome/`, then open a new tab.
- **Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, pick `dist/firefox/manifest.json`, then open a new tab.

## Publish

| Store | Upload | Dashboard |
|---|---|---|
| Chrome Web Store | `bookmark-os-chrome-*.zip` | https://chrome.google.com/webstore/devconsole (one-time $5 registration) |
| Edge Add-ons | `bookmark-os-chrome-*.zip` | https://partner.microsoft.com/dashboard/microsoftedge |
| Firefox Add-ons | `bookmark-os-firefox-*.zip` | https://addons.mozilla.org/developers/ |

Listing text, screenshots and privacy answers are in `store/LISTING.md`.
