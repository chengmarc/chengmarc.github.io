# Store listing — Bookmark OS

Copy-paste text and answers for the Chrome Web Store, Edge Add-ons and Firefox Add-ons dashboards.

## Name
Bookmark OS

## Summary (132 characters max)
Turn your browser's bookmarks into a macOS-style desktop on every new tab, kept in sync automatically. No account needed.

The same sentence is the extension's `description` in packaging/manifest.json.

## Category
- Chrome: **Functionality & UI**
- Firefox: **Bookmarks / Tabs**
- Edge: **Productivity**

## Search terms (Edge only)
new tab · bookmarks · bookmark sync · bookmarks bar · bookmark manager · start page · macos desktop

## Description

Bookmark OS turns your browser's own bookmarks into a clean, macOS-style desktop on every new tab, and keeps it in sync.

SYNCED WITH YOUR BOOKMARKS
• Say yes once, and your Bookmarks bar becomes your desktop
• Every bookmark folder becomes an app category; bookmarks outside folders become desktop icons
• Add, rename or move a bookmark in your browser, and the desktop follows: on your next new tab, or right away in one that's open
• Your arrangement stays: icons already on the desktop keep their place
• Read-only: Bookmark OS never changes your browser's bookmarks
• Prefer to arrange things yourself? Skip sync, or sync once from Settings, and edit the desktop by hand

A DESKTOP FOR YOUR NEW TAB
• A dock for your favourites, one click away
• All Apps: every link, organised by folder, with instant search
• Glassy, colourful icons fetched automatically for every site
• Six wallpapers, and windows you can drag and stack, just like macOS
• In English, 简体中文, Español, 日本語, Deutsch and Français, following your browser's language
• Menu bar with clock and calendar, network and battery status, and your location and IP (you can turn it off)

PRIVATE BY DESIGN
No account. No sign-in. No permissions at install: bookmark access is only asked for when you turn on sync.
Everything is saved locally in your browser. Export it to a file, and import it on any other computer or browser to get the exact same desktop.

## Privacy policy URL
https://github.com/chengmarc/chengmarc.github.io/blob/main/store-listing/PRIVACY.md

## Chrome Web Store — Privacy practices tab

**Single purpose:** Replaces the new tab page with a desktop built from, and kept in sync with, the user's browser bookmarks.

**Permission justification:** `bookmarks` (optional, requested at runtime): read when the user clicks Settings → Sync Now, or, if they turn on Settings → Always sync with browser, each time the new tab page opens and whenever a bookmark changes, to rebuild the new tab desktop and folders from their Bookmarks bar. Bookmarks are read only, never changed, and never leave the browser.

**Remote code:** No. All JavaScript is packaged in the extension.

**Data usage:** tick **Location** (the new tab page sends the user's IP address to ipwho.is and api.ipify.org to show approximate location and public IP in the menu bar; on by default, and the user can turn it off in Settings → Show location and IP, which stops those requests). Then certify:
- Not sold to third parties
- Not used or transferred for purposes unrelated to the item's single purpose
- Not used or transferred to determine creditworthiness or for lending purposes

## Firefox Add-ons — data collection

The Firefox build declares `bookmarksInfo` as required data collection, because each link's URL is sent to Google's favicon service to fetch its icon. Review this against Mozilla's current definitions when submitting.

## Notes for reviewers (optional field)

The extension has no install-time permissions and no background script. The optional `bookmarks` permission is requested only when the user clicks Settings → Sync Now or turns on Settings → Always sync with browser; it is used to read the Bookmarks bar, never to write. Always-on sync listens to bookmark events from the new tab page itself, not from a background script. It overrides the new tab page with the bundled `index.html`. Network requests are limited to icon lookups (Google favicon service and each site's own favicon), IP/location display (ipwho.is, api.ipify.org) and a flag image (flagcdn.com).
