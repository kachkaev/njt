// eslint-disable-next-line import/no-unresolved -- https://github.com/import-js/eslint-plugin-import/issues/1810
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import * as React from "react";

import { PageLayout } from "./_app.page/page-layout";

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
