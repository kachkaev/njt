import React, { useState } from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import GlobalStyle from "../components/GlobalStyle";
import InputForm from "../components/InputForm";

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px 50px;
  position: relative;
  max-width: 35em;
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
`;

const ExternalLink = styled.a`
  display: inline-block;
  text-decoration: none;
  margin: 0 8px;
`;

const IndexPage = () => {
  const title = "njt (npm jump to)";
  const description = "package navigation shortcuts you dreamed about";
  const [inputText, setInputText] = useState("");

  return (
    <Container>
      <GlobalStyle />
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

      <TopSection>
        <Title>🐸 njt 🐸</Title>
        <Description>🐸 npm jump to  🐸</Description>
        <ExternalLinks>
          <ExternalLink href="https://github.com/kachkaev/njt">
            github
          </ExternalLink>
          <ExternalLink href="https://www.npmjs.com/package/njt">
            npm
          </ExternalLink>
        </ExternalLinks>
      </TopSection>

      <InputForm text={inputText} onTextChange={setInputText} />

      <Markdown>{`
### Available destinations

${
  /* When updating, remember to reflect changes in README.md and cli/cli.js */ ""
}
\`c\` → changelog  
\`h\` → homepage (aliased as \`w\` for website or \`d\` for docs)  
\`i\` → issues (aliased as \`b\` for bugs)  
\`n\` → package info on [npmjs.com](https://www.npmjs.com/)  
\`p\` → pull requests (aliased as \`m\` for merge requests)  
\`r\` → list of github releases  
\`s\` → source (most commonly repository root, but can take you to a subdirectory in case of a monorepo)  
\`t\` → list of git tags  
\`v\` → list of package versions with their publish dates on [npmjs.com](https://www.npmjs.com/)  
\`y\` → package page on [yarnpkg.com](https://yarnpkg.com/) (mirror registry for [npmjs.com](https://www.npmjs.com/))  

Omitting the destination takes you to the package page on [npmjs.com](https://www.npmjs.com/) as if you used \`n\`.

### Examples

\`njt prettier\` (no specified destination)  
🐸 → https://www.npmjs.com/package/prettier

\`njt prettier h\` (homepage)  
🐸 → https://prettier.io

\`njt prettier s\` (source)  
🐸 → https://github.com/prettier/prettier

\`njt prettier c\` (changelog)  
🐸 → https://github.com/prettier/prettier/blob/master/CHANGELOG.md

\`njt prettier y\` (yarn)  
🐸 → https://yarnpkg.com/package/prettier
  `}</Markdown>
    </Container>
  );
};

export default IndexPage;
