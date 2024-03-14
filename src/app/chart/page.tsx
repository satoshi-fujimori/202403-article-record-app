import ItemCountList from "./components/ItemCountList";

export const dynamic = "force-dynamic";

export default async function ChartPage() {
  return (
    <div>
      <p className="font-bold text-xl p-2">TREND CHART</p>
      <ItemCountList />
    </div>
  );
}
