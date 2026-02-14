import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import * as React from "react";

import { PageLayout } from "./_app.page/page-layout";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    document.body.className = document.body.className.replace("no-js", "js");
  }, []);

  return (
    <PageLayout>
      <Analytics />
      <Component {...pageProps} />
    </PageLayout>
  );
}
