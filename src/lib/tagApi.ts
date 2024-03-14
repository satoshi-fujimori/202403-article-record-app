"use server";

import axios from "axios";
import { tagSelections } from "@/app/chart/components/tagsSelection";
import { client } from "./client";
import { ArticleCountByMonth } from "@/app/type/type";

//QiitaApiからタグ一覧を取得
export async function getAllTags() {
  const tags: string[] = [];
  const url = `https://qiita.com//api/v2/tags?page=1&per_page=100&sort=count`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

//qiitaApiからタグと年月でアイテムを取得
export async function getArticleCountByTag(
  tag: string,
  year: string,
  month: string
): Promise<number> {
  const formattedMonth: string = Number(month) < 10 ? `0${month}` : month;
  const endDate = new Date(Number(year), Number(month), 0).getDate();
  const url: string = `https://qiita.com/api/v2/items?page=1&per_page=2&query=created:>=${year}-${formattedMonth}-01 created:<=${year}-${formattedMonth}-${endDate} tag:${tag}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
      },
    });
    return Number(res.headers["total-count"]);
  } catch (e) {
    console.error(e);
    return 0;
  }
}

//DBにタグ、年、数のオブジェクトを格納
export async function addItemCount(item: ArticleCountByMonth) {
  try {
    const { id } = await client.create({
      endpoint: "tags",
      content: item,
    });
    return id;
  } catch (e) {
    throw e;
  }
}

/*
//tagとyearMonthが一致するitemをカウントした数値を返す
export async function getSavedItemsByTagsYear(tag: string, yearMonth: string) {
  const items: SavedItems[] = await client.getAllContents({
    endpoint: "tags",
  });
  const filteredItems: SavedItems[] = items.filter((item) => {
    item.tag === tag && item.yearMonth === yearMonth;
  });
  return filteredItems.length;
}*/

//DBの全ての年別itemの数を返す
export async function getAllSavedItems(): Promise<ArticleCountByMonth[]> {
  const items: ArticleCountByMonth[] = await client.getAllContents({
    endpoint: "tags",
  });
  return items;
}

export async function getSavedItemsById(
  id: string
): Promise<ArticleCountByMonth> {
  const item: ArticleCountByMonth = await client.get({
    endpoint: "tags",
    contentId: id,
  });
  return item;
}
