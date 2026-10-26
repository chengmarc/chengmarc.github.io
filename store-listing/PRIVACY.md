# Bookmark OS — Privacy Policy

_Last updated: 2026-10-20_

Bookmark OS replaces your browser's new tab page with a desktop of your bookmarks. It has no account, no analytics, no ads, and no server of its own. The developer never receives any of your data.

## What stays on your device

Your desktop icons, dock, bookmark folders, and a cache of site icons are saved in your browser's local storage for this extension. They never leave your browser unless you use **Export**, which saves a file to your own computer. **Import** reads a file you choose; nothing is uploaded. **Sync** reads your browser's Bookmarks bar and saves a copy into the same local storage; it never changes your browser bookmarks.

## What the new tab page requests from other services

Like any web page, the new tab page loads a few things from the internet. Each request is made directly from your browser to that service, which will see your IP address as with any web request:

| Service | Why | What it receives |
|---|---|---|
| `ipwho.is` | Shows your approximate city and country flag in the menu bar | Your IP address |
| `api.ipify.org` | Shows your public IPv4 address in the menu bar | Your IP address |
| `flagcdn.com` | Loads the flag image for your country | Your country code |
| `www.google.com/s2/favicons` | Looks up the icon for each link on screen | The URL of each link being displayed |
| Each linked website | Loads that site's own icon file (e.g. `/favicon.ico`) | A request for its icon |

The first three are only contacted while **Settings → Show location and IP** is on (the default); turn it off and none of them is asked.

These services have their own privacy policies. Bookmark OS does not send them anything beyond what is listed here, and does not set cookies or use tracking of any kind.

## Permissions

The extension requests **no browser permissions at install**. It cannot read your browsing history or the content of other tabs.

If you click **Settings → Sync Now** or turn on **Settings → Always sync with browser**, it asks for the optional **bookmarks** permission so it can read your Bookmarks bar. It only reads bookmarks, and never modifies them: once when you click Sync Now, or, while always-on sync is turned on, each time a new tab opens and whenever a bookmark changes. You can turn always-on sync off in Settings. You can revoke the permission at any time from your browser's extension settings.

## Contact

Questions: marccheng@outlook.com · Source code: https://github.com/chengmarc/chengmarc.github.io
