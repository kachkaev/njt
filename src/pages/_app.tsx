import { AppProps } from "next/app";
import PageLayout from "../ui/PageLayout";
import useDarkMode from "use-dark-mode";
import { useEffect } from "react";

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
