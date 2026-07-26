import type * as React from "react";

import { cn } from "../shared/cn";

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
      className={cn(
        "border-b border-dotted border-transparent js:cursor-pointer js:border-border js:active:bg-border",
        className,
      )}
      {...rest}
    />
  );
}
