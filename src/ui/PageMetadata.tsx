import Head from "next/head";
import React from "react";

export const PageMetadata: React.FunctionComponent<{
  title?: string;
  description?: string;
}> = ({
  title = "njt (npm jump to)",
  description = "package navigation shortcuts you dreamed about",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.siteUrl}/og-image.png`}
      />
      <meta
        property="twitter:image"
        content={`${process.env.siteUrl}/og-image.png`}
      />
      <meta
        property="vk:image"
        content={`${process.env.siteUrl}/og-image.png`}
      />
    </Head>
  );
};
