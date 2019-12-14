import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import GlobalStyle from "../components/GlobalStyle";
import InputForm from "../components/InputForm";
import Example from "../components/Example";
import ExternalLink from "../components/ExternalLink";

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
  & > * {
    margin: 0 8px;
  }
`;

const IndexPage = () => {
  const title = "njt (npm jump to)";
  const description = "package navigation shortcuts you dreamed about";
  const [inputText, setInputText] = useState("");

  const handleExampleClick = useCallback(
    (text) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setInputText("");
      setTimeout(() => setInputText(text), 0);
    },
    [setInputText],
  );

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

  `}</Markdown>

      <h3>Examples</h3>
      <Example
        to="prettier"
        remark="no specified destination"
        url="https://www.npmjs.com/package/prettier"
        onToClick={handleExampleClick}
      />
      <Example
        to="prettier h"
        remark="homepage"
        url="https://prettier.io"
        onToClick={handleExampleClick}
      />
      <Example
        to="prettier s"
        remark="source"
        url="https://github.com/prettier/prettier"
        onToClick={handleExampleClick}
      />
      <Example
        to="prettier c"
        remark="changelog"
        url="https://github.com/prettier/prettier/blob/master/CHANGELOG.md"
        onToClick={handleExampleClick}
      />
      <Example
        to="prettier y"
        remark="yarn"
        url="https://yarnpkg.com/package/prettier"
        onToClick={handleExampleClick}
      />
    </Container>
  );
};

export default IndexPage;
