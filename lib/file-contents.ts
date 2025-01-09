import { join, parse } from "node:path";
import { existsSync, readdirSync } from "node:fs";

export function getFileContents(path: string, extension?: string) {
  if (!existsSync(path)) {
    return [];
  }

  const files = readdirSync(path).map((name) => parse(join(path, name)));

  if (typeof extension !== "string") return files;

  return files.filter((file) => file.ext === extension);
}
