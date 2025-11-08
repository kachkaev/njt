import * as React from "react";
import { styled } from "styled-components";

const verticalFormPadding = 20;

const Form = styled.form`
  display: block;
  white-space: nowrap;
  font-size: 2em;
  padding: ${verticalFormPadding}px 0 0;
  width: 100%;
  max-width: 100%;
  position: relative;
  line-height: 1em;

  @media (max-width: 600px) {
    font-size: 1.8em;
  }
  @media (max-width: 550px) {
    font-size: 1.6em;
  }
  @media (max-width: 510px) {
    font-size: 1.5em;
  }
  @media (max-width: 450px) {
    font-size: 1.4em;
  }
  @media (max-width: 420px) {
    font-size: 1.3em;
  }
  @media (max-width: 400px) {
    font-size: 1.25em;
  }
  @media (max-width: 370px) {
    font-size: 1.1em;
  }
  @media (max-width: 350px) {
    font-size: 1em;
  }
`;

const Label = styled.label`
  padding: 0.3em 0 0 0.7em;
  font-family: monospace;
  display: inline-block;
  position: absolute;
  top: ${verticalFormPadding + 1}px;
  left: 0;
  pointer-events: none;
`;

const Input = styled.input`
  display: inline-block;
  padding: 0.3em 4em 0.3em 3em;
  color: inherit;
  line-height: inherit;
  font-family: monospace;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid rgba(127, 127, 127, 0.5);
  border-radius: 5px;
  -webkit-appearance: none;
  /* transition: all 0.2s ease-in-out; */

  background: rgba(27, 31, 35, 0.05);

  @media (prefers-color-scheme: dark) {
    background: rgba(127, 127, 127, 0.3);
  }

  ::placeholder {
    color: rgba(127, 127, 127, 0.7);
  }

  :focus {
    outline: none !important;
    border: 1px solid #42a73f;
    box-shadow: 0 0 10px #7cd679;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: transparent;
  line-height: inherit;
  padding: 0.25em 0.4em 0.3em 0;
  cursor: pointer;
  color: inherit;

  position: absolute;
  top: ${verticalFormPadding + 1}px;
  right: 0;

  :active {
    top: ${verticalFormPadding + 2}px;
  }

  :focus {
    outline: none !important;
  }
`;

export const InputForm: React.FunctionComponent<{
  text?: string;
  onTextChange?: (value: string) => void;
}> = ({ text, onTextChange }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const previousToValue = React.useRef<string>(undefined);
  const toInputRef = React.useRef<HTMLInputElement>(null);

  const focusAndSelectAll = React.useCallback(() => {
    const input = toInputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      input.setSelectionRange(0, input.value.length);
    }
  }, [toInputRef]);

  const handleInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({ currentTarget: { value } }) => {
      previousToValue.current = value;
      onTextChange?.(value);
    },
    [onTextChange],
  );

  React.useEffect(() => {
    if (previousToValue.current !== text) {
      focusAndSelectAll();
    }
    if (typeof previousToValue.current === "string" && formRef.current) {
      formRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
    previousToValue.current = text;
  }, [focusAndSelectAll, text, previousToValue, formRef]);

  const [from, setFrom] = React.useState("noscript");
  const fromInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFrom("bookmark");
  }, []);
  const handleFormSubmit = () => {
    if (fromInputRef.current) {
      fromInputRef.current.value = "web";
    }

    return true;
  };

  return (
    <Form ref={formRef} action="/jump" onSubmitCapture={handleFormSubmit}>
      <input ref={fromInputRef} type="hidden" name="from" value={from} />
      <Label htmlFor="to">njt</Label>
      <Input
        ref={toInputRef}
        id="to"
        name="to"
        placeholder="<package> [destination]"
        value={text}
        onFocus={focusAndSelectAll}
        onChange={handleInputChange}
      />
      <SubmitButton tabIndex={-1}>🐸 →</SubmitButton>
    </Form>
  );
};
