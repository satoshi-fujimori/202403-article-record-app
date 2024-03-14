"use client";

import {
  DataWithPreview,
  FormattedQiitaData,
  MyRecord,
  RecordProcessType,
  logoString,
} from "@/app/type/type";
import * as actions from "@/lib/apis";
import { getPreview } from "@/lib/previewApi";
import { useEffect, useState } from "react";

export function useAtricle(keyword: logoString) {
  const [qiitaData, setQiitaData] = useState<DataWithPreview[]>([]);
  const [recordList, setRecordList] = useState<MyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatData = (item: any): FormattedQiitaData => {
    const {
      title,
      updated_at,
      created_at,
      url,
      id,
      likes_count,
      comments_count,
    } = item;
    const newData: FormattedQiitaData = {
      title,
      updated_at,
      created_at,
      url,
      id,
      likes_count,
      comments_count,
    };
    return newData;
  };

  const formatDataList = (data: any[]): FormattedQiitaData[] => {
    const formattedData: FormattedQiitaData[] = data.map((item) => {
      return formatData(item);
    });
    return formattedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qiitaDataResponse = await actions.getQiitaDataByKeyword(keyword);
        const formattedData = formatDataList(qiitaDataResponse?.data);
        const dataWithPreview = await addPreviewToData(formattedData);
        setQiitaData(dataWithPreview);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // エラーが発生した場合もfalseに設定
      }
      setIsLoading(false);
    };
    fetchData();
    actions.getMyALLRecord().then((res) => {
      res && setRecordList(res);
    });
  }, [keyword]);

  const handleRecordChange = async (
    item: DataWithPreview,
    type: RecordProcessType
  ) => {
    const createdRecord = await actions.makeRecord(item.id, type, keyword);
    let isRecorded: boolean = false;
    const newRecordList: MyRecord[] = recordList.map((record) => {
      if (record.id === createdRecord.id) {
        isRecorded = true;
        return {
          ...createdRecord,
        };
      } else {
        return record;
      }
    });
    !isRecorded && newRecordList.push(createdRecord);
    setRecordList(newRecordList);
  };

  const addPreviewToData = async (
    data: FormattedQiitaData[]
  ): Promise<DataWithPreview[]> => {
    const newDataWithPreview = await Promise.all(
      data.map(async (item) => {
        const preview: any = await getPreview(item.url);
        const {
          description,
          images: [image],
        } = preview;
        return { ...item, description, image };
      })
    );
    return newDataWithPreview;
  };

  return {
    qiitaData,
    handleRecordChange,
    recordList,
    formatData,
    addPreviewToData,
    isLoading,
    setIsLoading,
  };
}
