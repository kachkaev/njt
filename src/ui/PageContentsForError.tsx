import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding-top: 1.5em;
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

export const PageContentsForError: React.VoidFunctionComponent<{
  statusCode: number;
  message: string;
}> = ({ statusCode, message }) => {
  return (
    <Container>
      <StatusCode>{statusCode}</StatusCode>
      <Message>{message}</Message>

      <Link href="/">
        <a>🐸 → home page</a>
      </Link>
    </Container>
  );
};
