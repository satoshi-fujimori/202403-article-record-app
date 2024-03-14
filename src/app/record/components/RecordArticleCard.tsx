import {
  DataWithPreview,
  FormattedQiitaData,
  MyRecord,
  logoString,
} from "@/app/type/type";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  PencilIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { logos } from "@/components/BrandLogoList";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function RecordArticleCard({
  article,
  recordList,
}: {
  article: DataWithPreview;
  recordList: MyRecord[];
}) {
  const foundRecord: MyRecord | undefined = recordList.find(
    (record) => record.articleId === article.id
  );
  const readDate: string = foundRecord?.readDate
    ? new Date(foundRecord?.readDate).toLocaleDateString()
    : "";
  const logo: StaticImport | undefined =
    foundRecord?.tag &&
    logos.find((logo) => logo.name === foundRecord.tag)?.logo;

  return (
    <Card className="sm:mx-20 md:mx-2 my-4 px-4 sm:px-10 py-2 bg-secondary relative">
      {logo && (
        <Image
          src={logo}
          alt="logo"
          width={40}
          height={40}
          className="absolute top-0 right-0 opacity-40"
        />
      )}
      <a href={article?.url} target="_blank">
        <Image
          src={article.image}
          alt="image"
          width={300}
          height={300}
          className="hover:ring-2 my-2"
        />
      </a>
      <p className="my-2 text-sm md:text-md">{article.description}</p>
      <div className="flex justify-between gap-x-2">
        <Badge className="bg-white text-black">
          <HeartIcon className="w-3 text-red-600" />
          {article.likes_count}
        </Badge>
        <div className="flex text-sm">
          <BookOpenIcon className="w-4" />
          {readDate}
        </div>
      </div>
    </Card>
  );
}
