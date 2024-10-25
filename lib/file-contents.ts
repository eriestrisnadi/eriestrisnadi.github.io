import { cwd } from "node:process";
import { join } from "node:path";
import { existsSync, readdirSync } from "node:fs";

export function getFileContents(slug: string, extension?: string) {
  const dirPath = join(cwd(), "contents", slug);

  if (!existsSync(dirPath)) {
    return [];
  }

  const files = readdirSync(dirPath).map((name) => ({
    name,
    filePath: join(dirPath, name),
  }));

  if (typeof extension !== "string") return files;

  return files.filter(({ name }) => name.endsWith(extension));
}
