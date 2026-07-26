/**
 * A non-breaking space, to be used as `{nbsp}` in JSX.
 *
 * `&nbsp;` looks nicer, but cannot be used: SWC drops the leading space of any
 * JSX text node that also contains an HTML entity, so
 * `<code>njt</code> gives you&nbsp;…` compiles down to `njtgives you`.
 *
 * The bug is https://github.com/swc-project/swc/issues/11541, fixed by
 * https://github.com/swc-project/swc/pull/11568 and released in `swc_core`
 * 57.0.1. Next.js still pins 57.0.0 (the last release before that fix), which
 * is why the bundled `@next/swc` binary keeps reproducing it – see
 * https://github.com/swc-project/swc/issues/12018 for the same report against
 * Next.js itself.
 *
 * On top of the missing space, `reactCompiler` turns this into a hydration
 * mismatch: client components go through Babel, which gets the whitespace
 * right, while the server render stays on SWC and does not. React reacts to
 * the two disagreeing by throwing away the prerendered HTML and rendering the
 * whole tree client-side (https://react.dev/errors/418), which is expensive.
 *
 * `{" "}` is an equally good workaround, but Prettier collapses it back into a
 * plain space, taking the fix with it.
 */
export const nbsp = "\u00A0";
