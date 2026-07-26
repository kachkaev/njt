"use client";

import * as React from "react";

/**
 * Swaps the `no-js` class on `<body>` for `js` once the page is hydrated, which
 * is what the `js` variant in global.css keys off.
 */
export function JsClassSwitcher() {
  React.useEffect(() => {
    document.body.className = document.body.className.replace("no-js", "js");
  }, []);

  // eslint-disable-next-line unicorn/no-null -- a component has to return a node, and `undefined` trips unicorn/no-useless-undefined
  return null;
}
