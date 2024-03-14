import { ArticleCountByMonth, MergedData } from "@/app/type/type";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import classNames from "classnames";

export default function CountLineChart({
  totalCountData,
  selectedTag,
  selectedSecondTag,
}: {
  totalCountData: ArticleCountByMonth[] | MergedData[];
  selectedTag: string;
  selectedSecondTag: string;
}) {
  const renderLegend = (props: any) => {
    const legendLabel: string[] = [selectedTag, selectedSecondTag];
    const { payload } = props;
    return (
      <ul>
        {payload.map((entry: any, i: number) => {
          console.log(entry.color);
          return (
            <li
              key={i}
              className={classNames("text-sm ", `text-${entry.color}-500`)}
            >
              {legendLabel[i]}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="min-h-60 shadow-lg rounded-md px-2"
    >
      <LineChart
        width={200}
        height={200}
        data={totalCountData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          className="text-xs"
          /*tickFormatter={(props) => {
          const month: string = (new Date(props).getMonth() + 1).toString();
          const date: string = new Date(props).getDate().toString();
          return `${month}/${date}`;
        }}*/
        />
        <YAxis />
        <Tooltip />
        <Legend
          formatter={(value, entry) => {
            const legendLabels = [selectedTag, selectedSecondTag];
            return legendLabels[entry.value === "articleCount2" ? 1 : 0];
          }}
        />
        <Line type="monotone" dataKey="articleCount" stroke="green" />
        {selectedSecondTag && (
          <Line type="monotone" dataKey="articleCount2" stroke="red" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
