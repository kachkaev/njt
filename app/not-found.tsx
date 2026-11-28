import type { Metadata } from "next";

import { ErrorPageBody } from "./shared/error-page-body.js";

const message = "page not found";

export const metadata: Metadata = { title: message, description: "" };

export default function NotFound() {
  return <ErrorPageBody statusCode={404} message={message} />;
}
