import { ExternalLink } from "../shared/external-link";
import { ClickableCode } from "./clickable-code";

export function Example({
  onToClick,
  remark,
  to,
  url,
}: {
  onToClick?: (text: string) => void;
  remark: string;
  to: string;
  url: string;
}) {
  function handleCodeClick() {
    onToClick?.(to);
  }

  return (
    <p>
      <span>
        <ClickableCode onClick={handleCodeClick}>njt {to}</ClickableCode>{" "}
        <span className="whitespace-nowrap">({remark})</span>
      </span>
      <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
        🐸 → <ExternalLink href={url} />
      </span>
    </p>
  );
}
