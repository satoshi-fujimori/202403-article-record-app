import {
  DataWithPreview,
  FormattedQiitaData,
  MyRecord,
  RecordProcessType,
} from "@/app/type/type";
import { Card } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import BookIcon from "./BookIcon";
import Image from "next/image";

export default function ArticleCard({
  article,
  handleRecordChange,
  recordList,
}: {
  article: DataWithPreview;
  handleRecordChange: (item: DataWithPreview, type: RecordProcessType) => {};
  recordList: MyRecord[];
}) {
  let isRecorded: boolean = recordList.some(
    (record) => record.articleId === article?.id
  );

  return (
    <Card className="mx-2 sm:mx-20 md:mx-2 my-4 px-4 sm:px-10 py-2 bg-secondary relative">
      {!isRecorded && <Badge className="absolute right-4">New</Badge>}
      <a
        href={article?.url}
        target="_blank"
        onClick={() => !isRecorded && handleRecordChange(article, "opend")}
      >
        <Image
          src={article.image}
          alt="image"
          width={300}
          height={300}
          className="hover:ring-2 my-2"
        />
      </a>
      <p className="my-2 text-sm md:text-md">{article.description}</p>
      <div className="flex justify-between">
        <BookIcon
          article={article}
          recordList={recordList}
          handleRecordChange={handleRecordChange}
        />
        <Badge className="bg-white text-black">
          <HeartIcon className="w-3 text-red-600" />
          {article.likes_count}
        </Badge>
      </div>
      <div className="flex justify-end gap-x-2">
        <div className="flex text-sm">
          <PencilIcon className="w-4" />
          {new Date(article?.created_at)?.toLocaleDateString()}
        </div>
        <div className="flex text-sm">
          <ClockIcon className="w-4" />
          {new Date(article?.updated_at)?.toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
}
