import axios from "axios";
import { client } from "@/lib/client";
import { MyRecord, RecordProcessType, logoString } from "@/app/type/type";

//keywordでqiitaApiからアイテム取得
export function getQiitaDataByKeyword(keyword: string) {
  const getData = async (keyword: string) => {
    const limit = 10;
    const url = `https://qiita.com/api/v2/items?page=1&per_page=${limit}&query=${keyword}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
        },
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  return getData(keyword).then((data) => {
    return data;
  });
}

//idでqiitaApiからアイテム取得
export function getQiitaDataById(id: string) {
  const getData = async (id: string) => {
    const url = `https://qiita.com/api/v2/items/${id}`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
        },
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };
  return getData(id).then((data) => {
    return data;
  });
}

//recordを全取得
export async function getMyALLRecord() {
  try {
    const fetchedList = await client.getAllContents({
      endpoint: "my-record",
    });
    const formattedList: MyRecord[] = fetchedList.map((record) => {
      const { id, articleId, readDate, status, tag } = record;
      return {
        id,
        articleId,
        readDate,
        status,
        tag,
      };
    });
    return formattedList;
  } catch (e) {
    console.error(e);
  }
}

//recordをDBへ格納
export async function makeRecord(
  id: string,
  type: RecordProcessType,
  keyword: logoString
) {
  const recordList = await getMyALLRecord();
  let record: MyRecord | undefined = recordList?.find(
    (item) => item.articleId === id
  );
  let isRecord: boolean;
  record ? (isRecord = true) : (isRecord = false);
  if (!record) {
    record = { articleId: id, status: false, tag: keyword };
  }
  switch (type) {
    case "read":
      record = {
        ...record,
        status: true,
        readDate: new Date(),
      };
      break;
    case "notRead":
      record = {
        ...record,
        readDate: undefined,
      };
      break;
  }
  if (isRecord) {
    const { id } = await client.update({
      endpoint: "my-record",
      contentId: record.id,
      content: record,
    });
  } else {
    const { id } = await client.create({
      endpoint: "my-record",
      content: record,
    });
    record = {
      ...record,
      id,
    };
  }
  return record;
}
