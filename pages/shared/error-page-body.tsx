import Link from "next/link";

export function ErrorPageBody({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  return (
    <div className="pt-6 text-center">
      <h2 className="m-0 text-[8em] font-normal leading-[1em] opacity-20">
        {statusCode}
      </h2>
      <div className="mb-6 text-[2em] opacity-30">{message}</div>

      <Link href="/">🐸 → home page</Link>
    </div>
  );
}
