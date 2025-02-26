import { s } from "velite";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { remarkHeadingId, type Nodes } from "@/lib/remark-heading-id";
import type { Node } from "unist";
import type { Url, UrlObject } from "url";

export interface TocHeading {
  title: string;
  url: Url | UrlObject | string;
  items: TocHeading[];
}

export const toc = () =>
  s.custom().transform(async (_, { meta, addIssue }) => {
    const headings: TocHeading[] = [];
    try {
      const tree = meta.mdast;
      if (!tree) throw new Error("No tree found");
      // @ts-ignore
      remarkHeadingId()(tree);
      
      const stack: { depth: number; heading: TocHeading }[] = [];
      
      visit(tree as Node, "heading", function (node: Nodes) {
        const title = toString(node);
        const slug = node.data?.hProperties?.id;
        const url = slug ? `#${slug}` : '';
        const currentDepth = node.depth;

        const newHeading: TocHeading = { title, url, items: [] };

        // Pop stack until we find a parent with lower depth
        while (stack.length > 0 && currentDepth <= stack[stack.length - 1].depth) {
          stack.pop();
        }

        // Add to root array or parent's items
        if (stack.length === 0) {
          headings.push(newHeading);
        } else {
          stack[stack.length - 1].heading.items.push(newHeading);
        }

        // Push current heading to stack
        stack.push({ depth: currentDepth, heading: newHeading });
      });

      return headings;
    } catch (err: any) {
      addIssue({ fatal: true, code: "custom", message: err.message });
      return null as never;
    }
  });