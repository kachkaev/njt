import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
  padding: 5px 8px;
  border-radius: 5px;
  margin: 0 5px;
  color: #666;
  text-decoration: none;
  border: #ccc;
  background: #eee;

  :hover {
    background: #e5e5e5;
  }
  :active {
    color: #333;
  }
`;

const InputSection = styled.div`
  display: block;
  text-align: center;
`;

const InputForm = styled.form`
  display: inline-block;
  white-space: nowrap;
  border: 1px solid #ccc;
  font-size: 2em;
  border-radius: 5px;
  margin: 20px auto;
  font-family: monospace;
  position: relative;
  overflow: hidden;
  line-height: 2em;
`;

const InputPrefix = styled.span`
  padding: 0 0 0 0.7em;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
const Input = styled.input`
  font-size: inherit;
  background: white;
  display: inline-block;
  padding: 0em 4em 0em 3em;
  background: #eee;
  line-height: inherit;
  font-family: monospace;
  border: 0px solid white;
  width: 15em;

  ::placeholder {
    color: #aaa;
  }
`;
const InputSuffix = styled.button`
  border: none;
  font-size: inherit;
  background: transparent;
  line-height: inherit;
  padding-right: 0.4em;

  position: absolute;
  top: 0;
  right: 0;
`;

const IndexPage = () => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <div className="hero">
        <h1 className="title">🐸 njt 🐸</h1>
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

        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
              Helvetica, sans-serif;
          }
          ul {
            display: flex;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 16px;
          }
          li {
            display: flex;
            padding: 6px 8px;
          }
          a {
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }

          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
        `}</style>
      </div>
    </div>
  );
};

export default IndexPage;
