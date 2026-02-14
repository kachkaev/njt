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
      <h2 className="error-status-code">{statusCode}</h2>
      <div className="error-message">{message}</div>

      <Link href="/">🐸 → home page</Link>
    </div>
  );
}
