import _Link from "next/link.js";

// `next/link` is CommonJS, so under `moduleResolution: NodeNext` TypeScript types its default
// import as the module namespace. Bundlers unwrap `__esModule` at runtime, so the cast is safe.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- https://github.com/microsoft/TypeScript/issues/50058
const Link = _Link as unknown as typeof _Link.default;

export function ErrorPageBody({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  return (
    <div className="pt-6 text-center">
      <h2 className="m-0 text-[8em] leading-[1em] font-normal opacity-20">
        {statusCode}
      </h2>
      <div className="mb-12 text-[2em] opacity-30">{message}</div>

      <Link href="/">🐸 → home page</Link>
    </div>
  );
}
