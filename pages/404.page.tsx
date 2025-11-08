import { ErrorPageBody } from "./shared/error-page-body";
import { PageMetadata } from "./shared/page-metadata";

export default function Page() {
  const message = "page not found";

  return (
    <>
      <PageMetadata title={message} description="" />
      <ErrorPageBody statusCode={404} message={message} />
    </>
  );
}
