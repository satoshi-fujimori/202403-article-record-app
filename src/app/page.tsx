"use client";

import ArticleList from "@/components/ArticleList/ArticleList";
import BrandLogoList from "@/components/BrandLogoList";
import { useState } from "react";
import { logoString } from "./type/type";
import { useAtricle } from "@/components/ArticleList/useArticle";

export default function MainPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<logoString>("react");
  const { qiitaData, handleRecordChange, recordList, isLoading, setIsLoading } =
    useAtricle(selectedKeyword);
  const handleSelectKeyword = (keyword: logoString) => {
    setSelectedKeyword(keyword);
  };
  return (
    <div>
      <BrandLogoList
        selectedKeyword={selectedKeyword}
        handleSelectKeyword={handleSelectKeyword}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <ArticleList
        selectedKeyword={selectedKeyword}
        isLoading={isLoading}
        qiitaData={qiitaData}
        handleRecordChange={handleRecordChange}
        recordList={recordList}
      />
    </div>
  );
}
