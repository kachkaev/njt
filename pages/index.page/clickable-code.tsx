import type * as React from "react";

export function ClickableCode({
  className,
  ...rest
}: React.ComponentProps<"code">) {
  return <code {...rest} className={`clickable-code ${className ?? ""}`} />;
}
