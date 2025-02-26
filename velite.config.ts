import { defineConfig } from "velite";
import { remarkHeadingId } from "@/lib/remark-heading-id";
import { posts } from "@/documents";

export const contentDirPath = "contents";

export default defineConfig({
  root: contentDirPath,
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkHeadingId],
  },
});
