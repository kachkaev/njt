import "./layout/global.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type * as React from "react";

import { JsClassSwitcher } from "./layout/js-class-switcher";
import { PageLayout } from "./layout/page-layout";

function getBaseUrl() {
  const hostname = process.env["NEXT_PUBLIC_VERCEL_URL"] ?? "njt.vercel.app";
  const protocol = hostname.split(":")[0] === "localhost" ? "http" : "https";

  return `${protocol}://${hostname}`;
}

const title = "njt (npm jump to)";
const description = "a quick navigation tool for npm packages";

export const metadata: Metadata = {
  // Makes `og:image` and friends absolute, which is what the crawlers expect
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  openGraph: { title, description, images: "/og-image.png" },
  twitter: { card: "summary", title, description, images: "/og-image.png" },
  other: { "msapplication-TileColor": "#42a73f" },
  manifest: "/site.webmanifest",
  icons: {
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#42a73f",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line better-tailwindcss/no-unknown-classes -- `no-js` is not a utility: <JsClassSwitcher /> swaps it for `js`, which global.css declares as a custom variant */}
      <body className="no-js">
        {/*
         * These two are plain tags because the metadata API cannot express
         * them: `icons.other` drops `title`, which browsers show as the search
         * engine name, and `other` only emits `name` (not `property`) without
         * resolving the value against `metadataBase`.
         */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="njt"
        />
        <meta property="vk:image" content={`${getBaseUrl()}/og-image.png`} />
        <JsClassSwitcher />
        <PageLayout>
          <Analytics />
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
