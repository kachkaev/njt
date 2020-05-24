import { AppProps } from "next/app";
import React, { useEffect } from "react";
import useDarkMode from "use-dark-mode";

import PageLayout from "../ui/PageLayout";

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.className = (document.body.className ?? "").replace(
      "no-js",
      "js",
    );
  }, []);

  useDarkMode();

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default App;
