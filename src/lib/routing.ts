import { ServerResponse } from "http";
import Router from "next/router";

interface RedirectToOptions {
  res?: ServerResponse;
}

export const redirectTo = (
  destinationUrl: string,
  { res }: RedirectToOptions,
) => {
  if (res) {
    res.writeHead(302, {
      Location: destinationUrl,
    });
    res.end();
  } else {
    Router.push(destinationUrl);
  }
};
