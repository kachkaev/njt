import type * as React from "react";
import { createGlobalStyle, css, styled } from "styled-components";
import normalize from "styled-normalize";

import { ExternalLink } from "../shared/external-link";

const base = css`
  body {
    color: #24292e;
    font-family:
      "-apple-system",
      BlinkMacSystemFont,
      Avenir Next,
      Avenir,
      Helvetica,
      sans-serif;
    margin: 0;
    line-height: 1.4em;

    @media (prefers-color-scheme: dark) {
      background: #24292e;
      color: #fff;
    }
  }

  a {
    color: #0366d6;
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: #59a7ff;
    }

    :hover {
      text-decoration: underline;
    }
  }

  code {
    padding: 0.1em 0.2em;
    border-radius: 3px;
    color: inherit;

    background: rgba(27, 31, 35, 0.05);

    @media (prefers-color-scheme: dark) {
      background: rgba(127, 127, 127, 0.3);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO: Remove together with styled components
    normalize
  }
  ${base}
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px 50px;
  position: relative;
  max-width: 35em;
  min-width: 270px;
`;

const TopSection = styled.div`
  padding: 80px 0 40px;

  @media (max-width: 700px) {
    padding: 40px 0 20px;
  }

  @media (max-width: 550px) {
    padding: 10px 0 0px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 48px;
  line-height: 1.4em;
  text-align: center;
`;
const Description = styled.div`
  font-weight: bold;
  text-align: center;
`;

const ExternalLinks = styled.div`
  margin: 10px auto 0;
  text-align: center;
  & > * {
    margin: 0 8px;
  }
`;

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <GlobalStyle />
      <TopSection>
        <Title>🐸 njt 🐸</Title>
        <Description>🐸 npm jump to&nbsp; 🐸</Description>
        <ExternalLinks>
          <ExternalLink href="https://github.com/kachkaev/njt">
            github
          </ExternalLink>
          <ExternalLink href="https://www.npmjs.com/package/njt">
            npm
          </ExternalLink>
        </ExternalLinks>
        {children}
      </TopSection>
    </Container>
  );
}
