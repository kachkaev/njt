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
      className="input-form relative block w-full max-w-full whitespace-nowrap pt-5 leading-[1em]"
      action="/jump"
      onSubmitCapture={handleFormSubmit}
    >
      <input ref={fromInputRef} type="hidden" name="from" value={from} />
      <label
        className="pointer-events-none absolute top-[21px] left-0 inline-block p-[0.3em_0_0_0.7em] font-mono"
        htmlFor="to"
      >
        njt
      </label>
      <input
        ref={toInputRef}
        className="m-0 box-border inline-block w-full max-w-full appearance-none rounded-[5px] border border-solid border-input-border bg-input-bg p-[0.3em_4em_0.3em_3em] font-mono leading-inherit text-inherit placeholder:text-muted focus:border-primary focus:shadow-[0_0_10px_var(--color-primary-glow)] focus:outline-none!"
        id="to"
        name="to"
        placeholder="<package> [destination]"
        value={text}
        onFocus={focusAndSelectAll}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="absolute top-[21px] right-0 cursor-pointer border-none bg-transparent p-[0.25em_0.4em_0.3em_0] leading-inherit text-inherit active:top-[22px] focus:outline-none!"
        tabIndex={-1}
      >
        🐸 →
      </button>
    </form>
  );
}
