import * as React from "react";

export const ExternalLink: React.FunctionComponent<
  React.HTMLProps<HTMLAnchorElement>
> = ({ children, href, ...rest }) => {
  return (
    <a href={href} {...rest}>
      {children ?? href?.replace(/^https?:\/\//i, "").replace(/^www\./i, "")}
    </a>
  );
};
