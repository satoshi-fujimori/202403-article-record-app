import { Button } from "../ui/button";
import classNames from "classnames";
import type { RecordProcessType } from "@/app/type/type";

export default function PopoverContentNotRead({
  onClickButton,
  isProcessing,
}: {
  onClickButton: (type: RecordProcessType) => void;
  isProcessing: boolean;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <p>Did you read this article?</p>
      <Button
        disabled={isProcessing}
        className={classNames(isProcessing && "bg-red-500")}
        onClick={() => onClickButton("read")}
      >
        YES
      </Button>
    </div>
  );
}
