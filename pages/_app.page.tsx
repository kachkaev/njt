import useDarkMode from "@fisch0920/use-dark-mode";
import { AppProps } from "next/app";
import * as React from "react";

import { PageLayout } from "./_app.page/page-layout";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  React.useEffect(() => {
    document.body.className = document.body.className.replace("no-js", "js");
  }, []);

  useDarkMode();

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default App;
