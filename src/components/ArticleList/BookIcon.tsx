import { DataWithPreview, FormattedQiitaData } from "@/app/type/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookOpenIcon as BookOpenIconSOutline } from "@heroicons/react/24/outline";
import { BookOpenIcon as BookOpenIconSolid } from "@heroicons/react/24/solid";
import { MyRecord, RecordProcessType } from "@/app/type/type";
import { useState } from "react";
import PopoverContentNotRead from "./PopoverContentNotRead";

export default function BookIcon({
  article,
  recordList,
  handleRecordChange,
}: {
  article: DataWithPreview;
  recordList: MyRecord[];
  handleRecordChange: (item: DataWithPreview, type: RecordProcessType) => {};
}) {
  const statusCheck = (id: string) => {
    const record: MyRecord | undefined = recordList.find(
      (record) => record.articleId === id
    );
    if (record) {
      return record.status;
    } else {
      return false;
    }
  };
  const readStatus: boolean = statusCheck(article.id);

  const readDateCheck = (id: string) => {
    const record: MyRecord | undefined = recordList.find(
      (record) => record.articleId === id
    );
    if (record?.readDate) {
      return new Date(record.readDate).toLocaleDateString();
    }
  };
  const readDateString: string | undefined = readDateCheck(article.id);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const onClickButton = async (type: RecordProcessType) => {
    setIsProcessing(true);
    await handleRecordChange(article, type);
    setIsProcessing(false);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          {readStatus ? (
            <BookOpenIconSolid className="w-6" />
          ) : (
            <BookOpenIconSOutline className="w-6" />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          {readStatus ? (
            <p>you read this article at {readDateString}</p>
          ) : (
            <PopoverContentNotRead
              onClickButton={onClickButton}
              isProcessing={isProcessing}
            />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
