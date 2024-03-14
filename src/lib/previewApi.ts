"use server";

import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function getPreview(url: string) {
  const previewData = await getLinkPreview(url);
  return previewData;
}
