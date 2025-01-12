import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Plugin } from "unified";
import type { Nodes } from "./remark-heading-id";

export interface PostHeading {
  level: number;
  title: string;
  stem: string;
}

export function contentlayerToc({
  headings,
}: {
  headings: PostHeading[];
}): Plugin {
  return function (tree) {
    visit(tree, "heading", function (node: Nodes) {
      const title = toString(node);
      const level = node.depth;
      const stem = node.data?.hProperties.id;

      // @ts-expect-error
      headings.push({ level, title, stem });
    });
  };
}
