import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { slugify } from "./slugify";
import type { Heading, Node } from "mdast";

export type Nodes = Parameters<typeof toString>[0] &
  Node &
  Pick<Heading, "depth">;

export function remarkHeadingId() {
  return function (tree: Node) {
    visit(tree, "heading", function (node: Nodes) {
      const id = node.data?.hProperties?.id
        ? String(node.data.hProperties.id)
        : toString(node as Parameters<typeof toString>[0]);
      const hProperties = Object.assign(
        { id: slugify(id) },
        node.data?.hProperties
      );

      node.data = Object.assign({ hProperties }, node.data);
    });
  };
}
