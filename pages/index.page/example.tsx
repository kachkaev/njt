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
        <span className="example-remark">({remark})</span>
      </span>
      <span className="example-link-row">
        🐸 → <ExternalLink href={url} />
      </span>
    </p>
  );
}
