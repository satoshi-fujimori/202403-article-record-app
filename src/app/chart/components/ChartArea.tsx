import { ArticleCountByMonth, MergedData } from "@/app/type/type";
import ChartWrapper from "./ChartWrapper";
import CountLineChart from "./CountLineChart";

export default function ChartArea({
  totalCountData,
  selectedSecondTag,
  selectedTag,
}: {
  totalCountData: ArticleCountByMonth[] | MergedData[];
  selectedSecondTag: string;
  selectedTag: string;
}) {
  return (
    <>
      <ChartWrapper titleText="Qiita Article Count per Month">
        <CountLineChart
          totalCountData={totalCountData}
          selectedTag={selectedTag}
          selectedSecondTag={selectedSecondTag}
        />
      </ChartWrapper>
    </>
  );
}
