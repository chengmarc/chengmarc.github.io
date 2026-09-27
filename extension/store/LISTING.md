# Store listing — Bookmark OS

Copy-paste text and answers for the Chrome Web Store, Edge Add-ons and Firefox Add-ons dashboards.

## Name
Bookmark OS

## Summary (132 characters max)
Your bookmarks as a macOS-style desktop on every new tab. No account, no permissions — everything stays in your browser.

## Category
Chrome / Edge: **Productivity** · Firefox: **Tabs**

## Description

Bookmark OS turns your new tab page into a clean, macOS-style desktop for the sites you use every day.

• A desktop of app icons — drag to arrange, add your own, remove what you don't need
• A dock for your favourites, one click away
• All Bookmarks: every link organised into folders, with instant search
• Glassy, colourful icons fetched automatically for every site
• Menu bar with clock and calendar, network and battery status, your location and IP

No account. No sign-in. No permissions.
Everything you set up is saved locally in your browser. Export it to a file, and import it on any other computer or browser to get the exact same desktop.

Open source: https://github.com/chengmarc/chengmarc.github.io
Try it in your browser first: https://chengmarc.com

## Assets (in this folder)
- `screenshot-1-desktop.png` — 1280×800
- `screenshot-2-bookmarks.png` — 1280×800
- `promo-440x280.png` — small promo tile
- Store icon: `../icons/icon-128.png`

## Privacy policy URL
https://github.com/chengmarc/chengmarc.github.io/blob/main/extension/PRIVACY.md

## Chrome Web Store — Privacy practices tab

**Single purpose:** Replaces the new tab page with a customizable desktop of the user's bookmarks.

**Permission justification:** None requested.

**Remote code:** No. All JavaScript is packaged in the extension.

**Data usage:** tick **Location** (the new tab page sends the user's IP address to ipwho.is and api.ipify.org to show approximate location and public IP in the menu bar). Then certify:
- Not sold to third parties
- Not used or transferred for purposes unrelated to the item's single purpose
- Not used or transferred to determine creditworthiness or for lending purposes

## Firefox Add-ons — data collection

The Firefox build declares `bookmarksInfo` as required data collection, because each link's URL is sent to Google's favicon service to fetch its icon. Review this against Mozilla's current definitions when submitting.

## Notes for reviewers (optional field)

The extension has no permissions and no background script. It overrides the new tab page with the bundled `index.html`. Network requests are limited to icon lookups (Google favicon service and each site's own favicon), IP/location display (ipwho.is, api.ipify.org) and a flag image (flagcdn.com).
