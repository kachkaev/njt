import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

import PageMetadata from "../components/PageMetadata";

const Container = styled.div`
  text-align: center;
`;
const StatusCode = styled.h2`
  font-size: 8em;
  margin: 0;
  font-weight: normal;
  line-height: 1em;
  opacity: 0.2;
`;

const Message = styled.div`
  font-size: 2em;
  margin-bottom: 1.5em;
  opacity: 0.3;
`;

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const message = statusCode === 404 ? "page not found" : "unknown error";

  return (
    <Container>
      <PageMetadata title={message} description="" />

      <StatusCode>{statusCode || "×××"}</StatusCode>
      <Message>{message}</Message>

      <Link href="/">
        <a>🐸→ home page</a>
      </Link>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
