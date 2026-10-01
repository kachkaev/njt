---
"njt": major
---

Rewrite the CLI in TypeScript on top of Effect 4, bundled with Vite

- The published package now ships a single bundled `dist/cli.js`; the `main.js` programmatic API is gone — the package is a CLI only
- Node.js 22.13 or newer is now required (was 20)
- Behavior is unchanged: `njt <package> [destination]` opens the destination in your browser, `.` still resolves the nearest `package.json`, and `NJT_BROWSER` / `BROWSER` are still respected
