import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  override render() {
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
