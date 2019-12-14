import styled from "styled-components";
import { useRef, useEffect, useCallback } from "react";

const Form = styled.form`
  display: block;
  white-space: nowrap;
  font-size: 2em;
  margin: 20px auto;
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

const FormPrefix = styled.label`
  padding: 0.3em 0 0 0.7em;
  font-family: monospace;
  display: inline-block;
  position: absolute;
  top: 1px;
  left: 0;
  pointer-events: none;
`;
const FormInput = styled.input`
  display: inline-block;
  padding: 0.3em 4em 0.3em 3em;
  background: rgba(27, 31, 35, 0.05);
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
  -webkit-appearance: none;

  ::placeholder {
    color: #aaa;
  }

  :focus {
    outline: none !important;
    border: 1px solid #42a73f;
    box-shadow: 0 0 10px #7cd679;
  }
`;

const FormSubmit = styled.button`
  border: none;
  background: transparent;
  line-height: inherit;
  padding: 0.25em 0.4em 0.3em 0;

  position: absolute;
  top: 1px;
  right: 0;

  :active {
    top: 3px;
  }

  :focus {
    outline: none !important;
  }
`;

const InputForm: React.FunctionComponent<{
  text?: string;
  onTextChange?: (value: string) => void;
}> = ({ text, onTextChange }) => {
  const inputRef = useRef<HTMLInputElement>();

  const focusAndSelectAll = useCallback(() => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(0, input.value.length);
      input.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    focusAndSelectAll();
  }, [focusAndSelectAll]);

  const handleInputChange = useCallback(
    ({ currentTarget: { value } }) => {
      onTextChange?.(value);
    },
    [onTextChange],
  );

  const from = "web";

  return (
    <Form action="/jump">
      <input type="hidden" name="from" value={from} />
      <FormPrefix htmlFor="to">njt</FormPrefix>
      <FormInput
        ref={inputRef}
        id="to"
        name="to"
        placeholder="<package> [destination]"
        value={text}
        onFocus={focusAndSelectAll}
        onChange={handleInputChange}
      />
      <FormSubmit tabIndex={-1}>🐸 →</FormSubmit>
    </Form>
  );
};

export default InputForm;
