import { getMdxMatters } from "@/lib/mdx";
import { blogConfig } from "@/config/site";
import type { Post } from "@/app/(resources)/blog/types";

export async function GET() {
  const posts = (await getMdxMatters<Post>(blogConfig.contentPath)).filter(
    ({ featured }) => featured
  );

  return Response.json(posts);
}
