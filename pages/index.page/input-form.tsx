import * as React from "react";

export function InputForm({
  text,
  onTextChange,
}: {
  text?: string;
  onTextChange?: (value: string) => void;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const previousToValueRef = React.useRef<string>(undefined);
  const toInputRef = React.useRef<HTMLInputElement>(null);

  function handleInputChange({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>): void {
    previousToValueRef.current = value;
    onTextChange?.(value);
  }
  const focusAndSelectAll = React.useCallback(() => {
    const input = toInputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      input.setSelectionRange(0, input.value.length);
    }
  }, [toInputRef]);

  React.useEffect(() => {
    if (previousToValueRef.current !== text) {
      focusAndSelectAll();
    }
    if (typeof previousToValueRef.current === "string" && formRef.current) {
      formRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
    previousToValueRef.current = text;
  }, [focusAndSelectAll, text, previousToValueRef, formRef]);

  const [from, setFrom] = React.useState("noscript");
  const fromInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- expected use (state change on mount)
    setFrom("bookmark");
  }, []);

  function handleFormSubmit() {
    if (fromInputRef.current) {
      fromInputRef.current.value = "web";
    }

    return true;
  }

  return (
    <form
      ref={formRef}
      className="input-form"
      action="/jump"
      onSubmitCapture={handleFormSubmit}
    >
      <input ref={fromInputRef} type="hidden" name="from" value={from} />
      <label className="input-form-label" htmlFor="to">
        njt
      </label>
      <input
        ref={toInputRef}
        className="input-form-input"
        id="to"
        name="to"
        placeholder="<package> [destination]"
        value={text}
        onFocus={focusAndSelectAll}
        onChange={handleInputChange}
      />
      <button type="submit" className="input-form-submit" tabIndex={-1}>
        🐸 →
      </button>
    </form>
  );
}
