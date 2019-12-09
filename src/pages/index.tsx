import React, { useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {  
  color: #24292e;
  font-family: "-apple-system", BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
  margin: 0;
}

a {
  color: #0366d6;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
}
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  max-width: 35em;
`;

const Title = styled.h1`
  margin: 0;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
  text-align: center;
`;
const Description = styled.div`
  font-weight: bold;
  text-align: center;
`;

const ExternalLinks = styled.div`
  margin: 10px auto 40px;
  text-align: center;
`;

const ExternalLink = styled.a`
  display: inline-block;
  text-decoration: none;
  margin: 0 8px;
`;

const InputSection = styled.div`
  display: block;
  text-align: center;
`;

const InputForm = styled.form`
  display: inline-block;
  white-space: nowrap;
  font-size: 2em;
  margin: 20px auto;
  width: 100%;
  max-width: 100%;
  font-family: monospace;
  position: relative;
  line-height: 1.5em;

  @media (max-width: 600px) {
    font-size: 1.8em;
  }
  @media (max-width: 550px) {
    font-size: 1.5em;
  }
  @media (max-width: 480px) {
    font-size: 1.3em;
  }
  @media (max-width: 420px) {
    font-size: 1em;
  }
`;

const InputPrefix = styled.span`
  padding: 0 0 0 0.7em;
  display: inline-block;
  position: absolute;
  top: 0.2em;
  left: 0;
  pointer-events: none;
`;
const Input = styled.input`
  font-size: inherit;
  background: white;
  display: inline-block;
  padding: 0.2em 4em 0.2em 3em;
  background: #eee;
  color: #24292e;
  line-height: inherit;
  font-family: monospace;
  border: 0px solid white;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;

  ::placeholder {
    color: #aaa;
  }

  :focus {
    outline: none !important;
    border: 1px solid #42a73f;
    box-shadow: 0 0 10px #7cd679;
  }
`;
const InputSuffix = styled.button`
  border: none;
  font-size: inherit;
  background: transparent;
  line-height: inherit;
  padding-right: 0.4em;

  position: absolute;
  top: 0.2em;
  right: 0;
`;

const IndexPage = () => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Container>
      <GlobalStyle />
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

      <InputSection>
        <InputForm action="/jump">
          <InputPrefix>njt</InputPrefix>
          <Input
            ref={inputRef}
            name="to"
            placeholder="<package> [destination]"
          />
          <InputSuffix>🐸 →</InputSuffix>
        </InputForm>
      </InputSection>
    </Container>
  );
};

export default IndexPage;
