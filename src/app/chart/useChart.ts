"use client";

import { useEffect, useState } from "react";
import * as actions from "@/lib/tagApi";
import { ArticleCountByMonth } from "../type/type";

//import { useState, useEffect } from "react";
//import { getAllTags } from "@/lib/tagApi";

export function useChart() {
  //DBに格納されたitemCountを取得
  const [savedItems, setSavedItems] = useState<ArticleCountByMonth[]>([]);

  //DBに格納されたタグごとの年別アイテム数を取得
  useEffect(() => {
    actions.getAllSavedItems().then((data) => setSavedItems(data));
  }, []); // 空の配列を渡すことで初回のみ実行されるように設定

  //tagごとの月の数のリストを返す　DBになければfetchして同時に格納
  const getItemsCount = async (
    tag: string,
    year: string
  ): Promise<ArticleCountByMonth[]> => {
    const filteredList = savedItems.filter(
      (item) => item.tag === tag && item.year === year
    );
    let articleCountByYear: ArticleCountByMonth[] = filteredList?.map(
      (item) => {
        const { tag, year, month, articleCount } = item;
        const formattedItem: ArticleCountByMonth = {
          tag,
          year,
          month,
          articleCount,
        };
        return formattedItem;
      }
    );
    console.log(articleCountByYear);
    for (let month = 1; month <= 12; month++) {
      if (!articleCountByYear.some((obj) => Number(obj.month) === month)) {
        console.log(`${month}月`);
        const articleCount: number = await actions.getArticleCountByTag(
          tag,
          year,
          month.toString()
        );
        const countByMonth: ArticleCountByMonth = {
          tag,
          year,
          month: month.toString(),
          articleCount: articleCount,
        };
        if (articleCount > 0) {
          const id: string = await actions.addItemCount(countByMonth);
          const { tag, year, month, articleCount } =
            await actions.getSavedItemsById(id);
          setSavedItems([...savedItems, { tag, year, month, articleCount }]);
          articleCountByYear.push(countByMonth);
        }
      }
    }
    articleCountByYear.sort((a, b) => Number(a.month) - Number(b.month));
    return articleCountByYear;
  };

  return { getItemsCount, savedItems };
}
