import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import { fetcher } from "@/lib/fetcher";
import { GET } from "@/app/(data)/blog/recent-posts.json/route";
import { getMdxFiles } from "@/lib/mdx";
import { slugify } from "@/lib/slugify";
import { Image } from "@/components/ui/image";
import { blogConfig } from "@/config/site";
import { format as durationFormat } from "timeago.js";
import type { Post } from "@/app/(resources)/blog/types";

export default async function Post({ params }: { params: { slug: string } }) {
  const mdxFile = (await getMdxFiles(blogConfig.contentPath)).find(
    ({ name }) => slugify(name) === params.slug
  );

  if (!mdxFile) notFound();

  const { content, frontmatter } = await compileMDX<Post>({
    source: mdxFile.source,
    options: { parseFrontmatter: true },
  });

  const readTime = readingTime(mdxFile.source);
  const publishedAt = frontmatter.publishedAt ?? mdxFile.createdAt;

  return (
    <article className="prose prose-sm transition-colors mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl capitalize font-bold">
          {frontmatter.title}
        </h1>
        <p className="flex justify-between text-muted-foreground my-0">
          <span>{readTime.text}</span>
          <span>
            {durationFormat(
              publishedAt instanceof Date ? publishedAt : new Date(publishedAt)
            )}
          </span>
        </p>
      </div>
      <hr className="my-5" />
      <Image
        src={frontmatter.cover}
        width={680}
        height={383}
        className="w-full h-auto mt-0"
        alt={`${params.slug}-thumb-cover`}
      />
      {content}
    </article>
  );
}

export async function generateStaticParams() {
  // TODO: needs refactor
  const posts: Post[] = await fetcher<Post[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/recent-posts.json`
  ).catch(() => fetcher(GET()));

  return posts.map(({ slug }) => ({ slug }));
}
