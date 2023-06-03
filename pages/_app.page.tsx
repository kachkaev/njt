import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app.js";
import * as React from "react";

import { PageLayout } from "./_app.page/page-layout.jsx";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    document.body.className = document.body.className.replace("no-js", "js");
  }, []);

  return (
    <PageLayout>
      <Analytics />
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default App;
