import type * as React from "react";

export function ExternalLink({
  children,
  href,
  ...rest
}: React.ComponentProps<"a">) {
  return (
    <a href={href} {...rest}>
      {children ?? href?.replace(/^https?:\/\//i, "").replace(/^www\./i, "")}
    </a>
  );
}
