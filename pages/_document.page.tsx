import { InlineJs } from "@kachkaev/react-inline-js";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    // eslint-disable-next-line testing-library/render-result-naming-convention -- FIXME: investigate
    const originalRenderPage = ctx.renderPage;

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="MyDocument">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#42a73f" />
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            href="/opensearch.xml"
            title="njt"
          />
          <meta name="msapplication-TileColor" content="#42a73f" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="no-js">
          <InlineJs
            code={`
// https://github.com/donavon/use-dark-mode/blob/8f016f4cdcfe799606b75d45bad7ced50f424ada/noflash.js.txt

(function() {
  // Change these if you use something different in your hook.
  var storageKey = 'darkMode';
  var classNameDark = 'dark-mode';
  var classNameLight = 'light-mode';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }
  
  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
`}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
