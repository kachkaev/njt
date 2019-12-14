import React, { useState, useCallback } from "react";
import styled from "styled-components";
import InputForm from "../components/InputForm";
import Example from "../components/Example";
import AvailableDestinations from "../components/AvailableDestinations";
import Signature from "../components/Signature";
import PageMetadata from "../components/PageMetadata";

const H2 = styled.h2`
  margin-top: 3em;
  font-size: 1em;
`;

const IndexPage = () => {
  const [inputText, setInputText] = useState("");

  const handleExampleClick = useCallback(
    (text) => {
      setInputText(" ");
      setTimeout(() => setInputText(text), 0);
    },
    [setInputText],
  );

  const handleSelectedDestinationChange = useCallback(
    (destination) => {
      setInputText((currentInputText) => {
        const currentPackage = currentInputText.trim().split(" ", 1)[0];
        return `${currentPackage || "prettier"} ${destination}`;
      });
    },
    [setInputText],
  );

  return (
    <>
      <PageMetadata />

      <InputForm text={inputText} onTextChange={setInputText} />

      <H2>Available destinations</H2>
      <AvailableDestinations
        selectedDestination={inputText.trim().split(" ", 2)[1]}
        onSelectedDestinationChange={handleSelectedDestinationChange}
      />

      <H2>Examples</H2>
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
      <Signature />
    </>
  );
};

export default IndexPage;
