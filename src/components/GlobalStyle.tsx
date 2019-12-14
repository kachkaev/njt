import { css, createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const base = css`
  body {
    color: #24292e;
    font-family: "-apple-system", BlinkMacSystemFont, Avenir Next, Avenir,
      Helvetica, sans-serif;
    margin: 0;
    line-height: 1.4em;
  }

  a {
    color: #0366d6;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }

  code {
    background: rgba(27, 31, 35, 0.05);
    padding: 0.1em 0.2em;
    border-radius: 3px;
  }

  h3 {
    margin-top: 2em;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${base}
`;

export default GlobalStyle;
