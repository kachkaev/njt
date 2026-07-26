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
    // The form is 20px away from the top; the label and the submit button are
    // overlaid 1px below that, and the button drops 1px more while pressed.
    <form
      ref={formRef}
      action="/jump"
      onSubmitCapture={handleFormSubmit}
      className="relative block w-full max-w-full pt-5 text-[2em] leading-[1em] whitespace-nowrap max-[600px]:text-[1.8em] max-[550px]:text-[1.6em] max-[510px]:text-[1.5em] max-[450px]:text-[1.4em] max-[420px]:text-[1.3em] max-[400px]:text-[1.25em] max-[370px]:text-[1.1em] max-[350px]:text-[1em]"
    >
      <input ref={fromInputRef} type="hidden" name="from" value={from} />
      <label
        htmlFor="to"
        className="pointer-events-none absolute top-[21px] left-0 inline-block pt-[0.3em] pl-[0.7em] font-field"
      >
        njt
      </label>
      <input
        ref={toInputRef}
        id="to"
        name="to"
        placeholder="<package> [destination]"
        value={text}
        onFocus={focusAndSelectAll}
        onChange={handleInputChange}
        className="inline-block w-full max-w-full appearance-none rounded-[5px] border border-hint-dark bg-tint py-[0.3em] pr-[4em] pl-[3em] font-field placeholder:text-muted focus:border-frog focus:shadow-[0_0_10px_var(--color-frog-glow)] focus:outline-none dark:bg-tint-dark"
      />
      <button
        type="submit"
        tabIndex={-1}
        className="absolute top-[21px] right-0 cursor-pointer pt-[0.25em] pr-[0.4em] pb-[0.3em] pl-0 focus:outline-none active:top-[22px]"
      >
        🐸 →
      </button>
    </form>
  );
}
