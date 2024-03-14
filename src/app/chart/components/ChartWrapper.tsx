import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
export default function ChartWrapper({
  children,
  titleText = "title",
}: {
  children: ReactNode;
  titleText?: string;
}) {
  return (
    <Card className="flex flex-col gap-y-2 w-11/12 h-4/6 p-4 mx-auto my-4 sm:mt-2 sm:w-3/5 sm:shrink-0 ">
      <p className="block w-full text-left text-lg font-bold">{titleText}</p>
      {children}
    </Card>
  );
}
