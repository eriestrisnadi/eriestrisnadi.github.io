import { makeSource } from "@contentlayer/source-files";
import * as documentTypes from "./src/documents";

export const contentDirPath = "contents";

export default makeSource({
  contentDirPath,
  documentTypes,
});
