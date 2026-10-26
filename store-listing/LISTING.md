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

## Release notes — 1.4.1

For Firefox Add-ons ("Release notes"); the other stores have no such field.

Bookmark OS 1.4.1 — your bookmarks, kept in sync

• Sync with your browser: say yes once and your desktop follows your Bookmarks bar, on every new tab and whenever a bookmark changes. Folders become app categories, bookmarks outside folders become desktop icons, and icons keep their place. Bookmark OS only reads your bookmarks, never changes them.
• New Settings window: six wallpapers, browser sync, a privacy switch for the location and IP in the menu bar (off stops those lookups entirely), and Import / Export / Restore.
• Now in English, 简体中文, Español, 日本語, Deutsch and Français, following your browser's language.
• Windows act like macOS: click to bring one forward, drag it around, press Escape to close the one in front.
• Dock: All Apps and Settings live in the dock and can be rearranged; ChatGPT and Claude can now be removed.
• Refreshed macOS-style icons throughout.
• Fixed: an empty Bookmarks bar no longer clears your desktop.

Your desktop, dock, wallpaper and other settings carry over from the previous version.

## Notes for reviewers

For Firefox Add-ons ("Notes to Reviewer"), Edge Add-ons ("Notes for certification") and the Chrome Web Store, if asked.

Bookmark OS replaces the new tab page with the bundled index.html: a desktop of the user's bookmarks. There is no background script and no remote code; the package's JavaScript is plain, unminified source, the same files as the public repository (https://github.com/chengmarc/chengmarc.github.io).

Permissions
• No permissions at install.
• `bookmarks` is optional and requested at runtime, only from a click: "Keep in Sync" in the first-run welcome window, or Settings → Sync Now / Always sync with browser. It is used only to read the Bookmarks bar (bookmarks.getTree, and bookmark change events while Always sync is on, listened to from the new tab page itself). Bookmarks are never written and never leave the browser.
• Turning Always sync off, or revoking the permission, stops all bookmark reads; a revoked permission switches the setting off on the next new tab.

To test sync
1. Install, add a few bookmarks and a folder to the Bookmarks bar, and open a new tab.
2. The welcome window asks "Keep in sync with your browser?". Click Keep in Sync and allow the bookmarks permission.
3. Loose bookmarks appear as desktop icons, folders as categories in All Apps (dock, first icon). Add or rename a bookmark: the open tab updates within a second.
4. Settings (dock, gear icon) → Browser Sync turns it off again.

Network requests (all from the new tab page)
• Site icons: Google's favicon service (www.google.com/s2/favicons, given each link's URL) and each site's own favicon files.
• Location and IP in the menu bar: ipwho.is, api.ipify.org, and the flag image from flagcdn.com. On by default; Settings → Privacy → Show location and IP turns it off, which stops all three.
• Nothing else. No analytics, no accounts, no server of our own. Settings and the desktop are kept in localStorage.
