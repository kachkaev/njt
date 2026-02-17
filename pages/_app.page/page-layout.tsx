import type * as React from "react";

import { ExternalLink } from "../shared/external-link";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-[560px] min-w-[270px] px-5 pb-[50px]">
      <div className="py-10 pt-20 max-[700px]:px-0 max-[700px]:py-5 max-[700px]:pt-10 max-[550px]:px-0 max-[550px]:py-0 max-[550px]:pt-[10px]">
        <h1 className="m-0 text-center text-[48px] leading-[1.4em]">
          🐸 njt 🐸
        </h1>
        <div className="text-center font-bold">🐸 npm jump to&nbsp; 🐸</div>
        <div className="mx-auto mt-[10px] text-center [&>*]:mx-2">
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
