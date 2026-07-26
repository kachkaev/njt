/**
 * A non-breaking space, to be used as `{nbsp}` in JSX.
 *
 * `&nbsp;` looks nicer, but cannot be used: Turbopack’s server-side JSX
 * transform drops the leading space of any text node that contains an HTML
 * entity, while the client-side one keeps it. Text such as
 * `<code>njt</code> gives you&nbsp;…` thus renders as `njtgives you` in the
 * prerendered HTML and as `njt gives you` after hydration, which React reports
 * as a hydration mismatch and recovers from by re-rendering the whole tree on
 * the client (https://react.dev/errors/418).
 */
export const nbsp = "\u00A0";
