"use client";

import { ErrorPageBody } from "./shared/error-page-body";

/**
 * Unlike 404.page.tsx before it, this file cannot set a document title: error
 * boundaries have to be client components, which rules out both `metadata` and
 * a plain `<title>` (the latter would be added to the one from app/layout.tsx
 * rather than replace it). The title thus stays the site-wide default.
 */
export default function Error() {
  return (
    // Anything reaching this boundary has already failed to render, so the
    // response carrying it is a 500
    <ErrorPageBody statusCode={500} message="unknown error" />
  );
}
