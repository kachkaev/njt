import Head from "next/head";
import type * as React from "react";

function getBaseUrl() {
  const hostname = process.env["NEXT_PUBLIC_VERCEL_URL"] ?? "njt.vercel.app";
  const protocol = hostname.split(":")[0] === "localhost" ? "http" : "https";

  return `${protocol}://${hostname}`;
}

export function PageMetadata({
  title = "njt (npm jump to)",
  description = "a quick navigation tool for npm packages",
}: {
  title?: string;
  description?: string;
}) {
  const baseUrl = getBaseUrl();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="twitter:image" content={`${baseUrl}/og-image.png`} />
      <meta property="vk:image" content={`${baseUrl}/og-image.png`} />
    </Head>
  );
}
