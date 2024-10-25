import { getMdxContents } from "@/lib/mdx";
import type { Post } from "@/app/(resources)/blog/types";

export async function GET() {
  const posts = (await getMdxContents<Record<string, unknown>, Post>("blog"))
    .filter(({ frontmatter }) => frontmatter?.featured)
    .map(({ frontmatter, createdAt, updatedAt }) =>
      Object.assign({ createdAt, updatedAt }, frontmatter)
    );

  return Response.json(posts);
}
