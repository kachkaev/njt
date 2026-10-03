# njt browser extension

Adds `njt` as an address bar keyword in Chrome, Edge and Firefox, with suggestions as you type:

```txt
njt prettier       → lists all destinations
njt prettier p     → narrows them down to p, pp, …
```

Suggestions come from [`/suggest`](../app/suggest/route.ts), so new destinations show up without updating the extension.
Only the `njt` keyword is fixed by the manifest.
Entering the text goes through `/jump`, just like the website and the CLI.

## Trying it locally

1.  Optionally, point `baseUrl` in [`background.js`](background.js) at `http://localhost:3000` and run `pnpm dev`.
1.  Load the extension:
    - Chrome / Edge: open `chrome://extensions`, enable developer mode, “Load unpacked”, select this folder
    - Firefox: open `about:debugging#/runtime/this-firefox`, “Load Temporary Add-on…”, select [`manifest.json`](manifest.json)
1.  Type `njt`, then a space (or Tab in Chrome), then `prettier`.
