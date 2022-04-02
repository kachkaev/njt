import { AppProps } from "next/app";
import * as React from "react";
import useDarkMode from "use-dark-mode";

import { PageLayout } from "../ui/page-layout";

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
