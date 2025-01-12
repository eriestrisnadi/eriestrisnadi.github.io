import path from "node:path";
import { defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import { bundleMDX } from "mdx-bundler";
import { slugify } from "../lib/slugify";
import { remarkHeadingId } from "../lib/remark-heading-id";
import { type PostHeading, contentlayerToc } from "../lib/contentlayer-toc";

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
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings: PostHeading[] = [];

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              remarkHeadingId,
              [contentlayerToc, { headings }],
            ];

            return opts;
          },
        });

        return [
          { level: 1, title: doc.title, stem: slugify(doc.title) },
          ...headings,
        ];
      },
    },
  },
}));
