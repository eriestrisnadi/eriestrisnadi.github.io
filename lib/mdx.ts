import { readFileSync, statSync } from "node:fs";
import { cwd } from "node:process";
import { join, resolve } from "node:path";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import readingTime from "reading-time";
import { blogConfig } from "@/config/site";
import { getFileContents } from "@/lib/file-contents";
import { slugify } from "@/lib/slugify";

type PropsWithCwd<P = unknown> = P & { cwd?: string };

export async function getMdxMatters<TFrontmatter = Record<string, unknown>>(
  path: string,
  options?: PropsWithCwd
) {
  const mdxContents = await Promise.all(
    (
      await getMdxFiles(path, options)
    ).map(async ({ source, createdAt, updatedAt, name }) => {
      const vfile = new VFile(source);

      matter(vfile);

      return Object.assign(
        {
          createdAt,
          updatedAt,
          slug: slugify(name),
          readTime: readingTime(source, {
            wordsPerMinute: blogConfig.wordsPerMinute,
          }),
        },
        (vfile.data.matter ?? {}) as TFrontmatter
      );
    })
  );

  return mdxContents;
}

export async function getMdxFiles(path: string, options?: PropsWithCwd) {
  const mdxFiles = await Promise.all(
    getFileContents(resolve(join(options?.cwd ?? cwd(), path)), ".mdx").map(
      async (file) => {
        const filePath = join(file.dir, file.base);
        const source = readFileSync(filePath, "utf-8");
        const { birthtime: createdAt, mtime: updatedAt } = statSync(filePath);

        return Object.assign({ source, createdAt, updatedAt }, file);
      }
    )
  );

  return mdxFiles;
}
