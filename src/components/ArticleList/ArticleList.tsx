"use client";

import {
  FormattedQiitaData,
  logoString,
  DataWithPreview,
  RecordProcessType,
  MyRecord,
} from "@/app/type/type";
import { useAtricle } from "./useArticle";
import ArticleCard from "./ArticleCard";
import { Loading } from "../LoadingComponent";

export default function ArticleList({
  selectedKeyword,
  isLoading,
  qiitaData,
  handleRecordChange,
  recordList,
}: {
  selectedKeyword: logoString;
  isLoading: boolean;
  qiitaData: DataWithPreview[];
  handleRecordChange: (item: DataWithPreview, type: RecordProcessType) => {};
  recordList: MyRecord[];
}) {
  return isLoading ? (
    <Loading />
  ) : (
    <div className="mx-2 sm:mx-10 md:mx-20 md:grid md:grid-cols-2">
      {qiitaData?.map((item, i) => (
        <ArticleCard
          key={i}
          article={item}
          handleRecordChange={handleRecordChange}
          recordList={recordList}
        />
      ))}
    </div>
  );
}
