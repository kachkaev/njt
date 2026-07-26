import type * as React from "react";

/**
 * A `code` element that only looks interactive once the page is hydrated, i.e.
 * when `<body>` carries the `js` class (see the `js` variant in global.css).
 */
export function ClickableCode({
  className,
  ...rest
}: React.ComponentProps<"code">) {
  return (
    <code
      className={`border-b border-dotted border-transparent js:cursor-pointer js:border-hint js:active:bg-hint dark:js:border-hint-dark dark:js:active:bg-hint-dark ${className ?? ""}`}
      {...rest}
    />
  );
}
