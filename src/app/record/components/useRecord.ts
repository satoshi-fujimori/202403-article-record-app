import { useAtricle } from "@/components/ArticleList/useArticle";
import { useState, useEffect } from "react";
import * as actions from "@/lib/apis";
import type { DataWithPreview, MyRecord } from "@/app/type/type";

export function useRecord() {
  const { formatData, addPreviewToData } = useAtricle("react");
  const [qiitaData, setQiitaData] = useState<DataWithPreview[]>([]);
  const [recordList, setRecordList] = useState<MyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    actions.getMyALLRecord().then((res) => {
      if (res) {
        setRecordList(res);
        const readList = res.filter((item) => item.status);
        const promises = readList.map((record) =>
          actions
            .getQiitaDataById(record.articleId)
            .then((res) => formatData(res?.data))
        );
        Promise.all(promises).then((formattedData) => {
          addPreviewToData(formattedData).then((dataWithPreview) => {
            setQiitaData(dataWithPreview);
          });
        });
      }
    });
    setIsLoading(false);
  }, []);

  return { qiitaData, recordList, isLoading };
}
