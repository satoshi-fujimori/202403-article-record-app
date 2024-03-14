export type FormattedQiitaData = {
  title: string;
  updated_at: Date;
  created_at: Date;
  url: string;
  id: string;
  likes_count: number;
  comments_count: number;
};
export type DataWithPreview = FormattedQiitaData & {
  description: string;
  image: string;
};

export type MyRecord = {
  id?: string;
  articleId: string;
  status: boolean;
  readDate?: Date;
  tag: logoString;
};

export type RecordProcessType = "read" | "opend" | "notRead";
export type logoString =
  | "css"
  | "html"
  | "javascript"
  | "react"
  | "next.js"
  | "typescript";

export type ArticleCountByMonth = {
  tag: string;
  articleCount: number;
  year: string;
  month: string;
};

export type MergedData = {
  year: string;
  month: string;
  articleCount: number;
  articleCount2: number;
  tag: string;
  tag2: string;
};
