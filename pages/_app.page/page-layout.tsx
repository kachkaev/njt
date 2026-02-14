import type * as React from "react";

import { ExternalLink } from "../shared/external-link";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-container">
      <div className="page-top-section">
        <h1 className="page-title">🐸 njt 🐸</h1>
        <div className="page-description">🐸 npm jump to&nbsp; 🐸</div>
        <div className="page-external-links">
          <ExternalLink href="https://github.com/kachkaev/njt">
            github
          </ExternalLink>
          <ExternalLink href="https://www.npmjs.com/package/njt">
            npm
          </ExternalLink>
        </div>
        {children}
      </div>
    </div>
  );
}
