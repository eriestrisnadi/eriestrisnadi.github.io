import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxMatters } from "@/lib/mdx";
import { Image } from "@/components/ui/image";
import { blogConfig } from "@/config/site";
import { format as durationFormat } from "timeago.js";
import type { Post } from "@/app/(resources)/blog/types";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = (await getMdxMatters<Post>(blogConfig.contentPath)).find(
    ({ slug }) => slug === params.slug
  );

  if (!post) notFound();

  const publishedAt = post.publishedAt ?? post.createdAt;

  return (
    <article className="prose prose-sm transition-colors mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl capitalize font-bold">
          {post.title}
        </h1>
        <p className="flex justify-between text-muted-foreground my-0">
          <span>{post.readTime.text}</span>
          <span>
            {durationFormat(
              publishedAt instanceof Date ? publishedAt : new Date(publishedAt)
            )}
          </span>
        </p>
      </div>
      <hr className="my-5" />
      <Image
        src={post.cover}
        width={680}
        height={383}
        className="w-full h-auto mt-0"
        alt={`${params.slug}-thumb-cover`}
      />
      <MDXRemote source={post.source} options={{ parseFrontmatter: true }} />
    </article>
  );
}

export async function generateStaticParams() {
  return (await getMdxMatters<Post>(blogConfig.contentPath)).map(
    ({ slug }) => ({ slug })
  );
}
