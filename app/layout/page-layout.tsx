import type * as React from "react";

import { ExternalLink } from "../shared/external-link";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    // `box-content` keeps the 20px gutters outside of the 35em text column,
    // which is what the layout looked like before Preflight made everything
    // `border-box`
    <div className="relative mx-auto box-content max-w-[35em] min-w-[270px] px-5 pb-[50px]">
      <div className="pt-20 pb-10 max-[700px]:pt-10 max-[700px]:pb-5 max-[550px]:pt-2.5 max-[550px]:pb-0">
        <h1 className="text-center text-[48px] leading-[1.4em] font-bold">
          🐸 njt 🐸
        </h1>
        <div className="text-center font-bold">🐸 npm jump to&nbsp; 🐸</div>
        <div className="mx-auto mt-2.5 text-center *:mx-2">
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
