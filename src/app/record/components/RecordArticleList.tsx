"use client";

import { useRecord } from "./useRecord";
import RecordArticleCard from "./RecordArticleCard";
import { Loading } from "@/components/LoadingComponent";
import { useState } from "react";
import { DataWithPreview } from "@/app/type/type";
import { Input } from "@/components/ui/input";

export default function RecordArticleList() {
  const { qiitaData, recordList, isLoading } = useRecord();
  const [searchWord, setSearchWord] = useState<string>("");
  const renderData: DataWithPreview[] = searchWord
    ? qiitaData.filter((data) => {
        if (
          data.description.toLowerCase().includes(searchWord.toLowerCase()) ||
          data.title.toLowerCase().includes(searchWord.toLowerCase())
        ) {
          return data;
        }
      })
    : qiitaData;
  const handleChangeWord = (value: string) => {
    setSearchWord(value);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Input
        value={searchWord}
        onChange={(e) => handleChangeWord(e.target.value)}
        className="block w-fit mr-10 ml-auto"
        placeholder="...search word"
      />
      <div className="flex gap-x-2">
        <div className="mx-10 md:mx-20 md:grid md:grid-cols-2">
          {renderData?.map((item, i) => (
            <RecordArticleCard key={i} article={item} recordList={recordList} />
          ))}
        </div>
      </div>
    </>
  );
}
