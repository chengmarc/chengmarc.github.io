# Store listing — Bookmark OS

Copy-paste text and answers for the Chrome Web Store, Edge Add-ons and Firefox Add-ons dashboards.

## Name
Bookmark OS

## Summary (132 characters max)
Your bookmarks as a macOS-style desktop on every new tab. No account, no install permissions — everything stays in your browser.

## Category
- Chrome: **Functionality & UI**
- Firefox: **Bookmarks / Tabs**
- Edge: **Productivity**

## Search terms (Edge only)
new tab · new tab page · bookmarks · bookmark manager · speed dial · start page · macos desktop

## Description

Bookmark OS turns your new tab page into a clean, macOS-style desktop for the sites you use every day.

• A desktop of app icons — drag to arrange, add your own, remove what you don't need
• A dock for your favourites, one click away
• All Apps: every link organised into folders, with instant search
• Glassy, colourful icons fetched automatically for every site
• Sync with your browser: rebuild the desktop and folders from your Bookmarks bar in one click, or keep them in step automatically
• Settings: pick a wallpaper
• Menu bar with clock and calendar, network and battery status, your location and IP

No account. No sign-in. No permissions at install — bookmark access is only asked for if you turn on browser sync.
Everything you set up is saved locally in your browser. Export it to a file, and import it on any other computer or browser to get the exact same desktop.

## Privacy policy URL
https://github.com/chengmarc/chengmarc.github.io/blob/main/store-listing/PRIVACY.md

## Chrome Web Store — Privacy practices tab

**Single purpose:** Replaces the new tab page with a customizable desktop of the user's bookmarks.

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
