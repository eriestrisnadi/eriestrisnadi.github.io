import { makeSource } from "@contentlayer/source-files";
import * as documentTypes from "./src/documents";
import { remarkHeadingId } from "./src/lib/remark-heading-id";

export const contentDirPath = "contents";

export default makeSource({
  contentDirPath,
  documentTypes,
  mdx: {
    remarkPlugins: [remarkHeadingId],
  },
  date: {
    timezone: "Asia/Jakarta",
  },
});
