import { readFileSync, statSync } from "node:fs";
import { serialize } from "next-mdx-remote/serialize";
import { getFileContents } from "@/lib/file-contents";

export async function getMdxContents<
  TScope = Record<string, unknown>,
  TFrontmatter = Record<string, unknown>
>(
  slug: string,
  {
    parseFrontmatter = true,
    ...restOptions
  }: Parameters<typeof serialize>["1"] = {}
) {
  const mdxContents = await Promise.all(
    getFileContents(slug, ".mdx").map(async ({ filePath }) => {
      const source = readFileSync(filePath, "utf-8");
      const { birthtime: createdAt, mtime: updatedAt } = statSync(filePath);
      const serialized = await serialize<TScope, TFrontmatter>(
        source,
        Object.assign({ parseFrontmatter }, restOptions)
      );

      return Object.assign({ createdAt, updatedAt }, serialized);
    })
  );

  return mdxContents;
}
