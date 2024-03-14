import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export default function LinkPreview() {
  // pass the link directly
  getLinkPreview(
    "https://qiita.com/TsutomuNakamura/items/72d8cf9f07a5a30be048"
  ).then((data) => console.debug(data));
  return <div>preview</div>;
}
