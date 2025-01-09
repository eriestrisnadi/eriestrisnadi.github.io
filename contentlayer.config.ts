import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import path from "node:path";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    cover: { type: "string" },
    publishedAt: { type: "date", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    featured: { type: "boolean" },
    author: { type: "string" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: ({ _raw: { flattenedPath } }) => `/${flattenedPath}`,
    },
    stem: {
      type: "string",
      resolve: ({ _raw: { flattenedPath } }) => path.parse(flattenedPath).name,
    },
    readTime: {
      type: "string",
      resolve: ({ body: { raw } }) =>
        readingTime(raw, {
          wordsPerMinute: 265,
        }).text,
    },
  },
}));

export default makeSource({
  contentDirPath: "contents",
  documentTypes: [Post],
});
