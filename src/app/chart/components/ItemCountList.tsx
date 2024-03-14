"use client";

import { useChart } from "../useChart";
import { useEffect, useState } from "react";
import { tagSelections } from "./tagsSelection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ChartArea from "./ChartArea";
import { ArticleCountByMonth, MergedData } from "@/app/type/type";
import { Loading } from "@/components/LoadingComponent";

export default function ItemCountList() {
  const { getItemsCount, savedItems } = useChart();
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedSecondTag, setSelectedSecondTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [totalCountData, setTotalCountData] = useState<
    ArticleCountByMonth[] | MergedData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearSelections: string[] = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  const mergeData = async (
    fetchedTotalCountData: ArticleCountByMonth[]
  ): Promise<MergedData[]> => {
    const secondTotalData: ArticleCountByMonth[] = await getItemsCount(
      selectedSecondTag,
      selectedYear
    );
    const mergedDataList: MergedData[] = fetchedTotalCountData.map((data) => {
      const { tag, articleCount, year, month } = data;
      const formattedData: MergedData = {
        tag: tag,
        tag2: "",
        articleCount: articleCount,
        articleCount2: 0,
        year,
        month,
      };
      const secondData: ArticleCountByMonth | undefined = secondTotalData.find(
        (data) => data.month === month
      );
      if (secondData) {
        formattedData.tag2 = secondData.tag;
        formattedData.articleCount2 = secondData.articleCount;
      }
      return formattedData;
    });
    return mergedDataList;
  };

  const handleClick = async () => {
    setIsLoading(true);
    const fetchedTotalCountData: ArticleCountByMonth[] = await getItemsCount(
      selectedTag,
      selectedYear
    );
    if (selectedSecondTag) {
      const mergedDataList = await mergeData(fetchedTotalCountData);
      setTotalCountData(mergedDataList);
    } else {
      setTotalCountData(fetchedTotalCountData);
    }
    setIsLoading(false);
  };
  const handleChangeTag = (value: string): void => {
    setSelectedTag(value);
  };
  const handleChangeSecondTag = (value: string): void => {
    setSelectedSecondTag(value);
  };
  const handleChangeYear = (year: string): void => {
    setSelectedYear(year);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="sm:flex">
      <div className="flex flex-col mb-4">
        <div className="flex sm:flex-col sm:gap-y-4 sm:justify-end gap-x-4 p-2">
          <Select value={selectedYear} onValueChange={handleChangeYear}>
            <SelectTrigger className="w-fit sm:w-full text-xs text-gray-400">
              <SelectValue placeholder="...select year" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              {yearSelections.reverse().map((yearSelection) => (
                <SelectItem key={yearSelection} value={yearSelection}>
                  {yearSelection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTag} onValueChange={handleChangeTag}>
            <SelectTrigger className="w-fit sm:w-full text-xs text-gray-400">
              <SelectValue placeholder="...1st select tag" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              {tagSelections.map((tagSelection) => (
                <SelectItem key={tagSelection} value={tagSelection}>
                  {tagSelection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedSecondTag}
            onValueChange={handleChangeSecondTag}
          >
            <SelectTrigger className="w-fit sm:w-full text-xs text-gray-400">
              <SelectValue placeholder="...2nd select tag" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              {tagSelections.map((tagSelection) => (
                <SelectItem key={tagSelection} value={tagSelection}>
                  {tagSelection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="p-2">
          <Button onClick={handleClick} className="block w-fit ml-auto mr-2">
            選択
          </Button>
        </div>
      </div>
      <ChartArea
        totalCountData={totalCountData}
        selectedSecondTag={selectedSecondTag}
        selectedTag={selectedTag}
      />
    </div>
  );
}
