import { createGlobalStyle, css } from "styled-components";
import normalize from "styled-normalize";

const base = css`
  body {
    color: #24292e;
    font-family: "-apple-system", BlinkMacSystemFont, Avenir Next, Avenir,
      Helvetica, sans-serif;
    margin: 0;
    line-height: 1.4em;

    &.dark-mode {
      background: #24292e;
      color: #fff;
    }
  }

  a {
    color: #0366d6;
    text-decoration: none;

    .dark-mode & {
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
    .dark-mode & {
      background: rgba(127, 127, 127, 0.3);
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${base}
`;
