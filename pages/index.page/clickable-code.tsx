import type * as React from "react";

export function ClickableCode(props: React.ComponentProps<"code">) {
  return (
    <code {...props} className={`clickable-code ${props.className ?? ""}`} />
  );
}
