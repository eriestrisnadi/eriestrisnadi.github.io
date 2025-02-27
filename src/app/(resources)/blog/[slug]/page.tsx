import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Image } from "@/components/ui/image";
import { posts } from "@/contents";
import PostHeader from "./header";
import { PageNavigation } from "@/components/page-navigation";
import Comments from "@/components/comments";
import MDXContent from "@/components/mdx-content";

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const findBySlug =
  (slug: string) =>
  <T extends { slug: string }>({ slug: stem }: T) =>
    slug === stem;

export default async function PostPage({ params }: PostPageProps) {
  const post = posts.find(findBySlug((await params).slug));

  if (!post) notFound();

  return (
    <article className="prose prose-sm max-w-2xl mx-auto lg:mx-0 transition-colors relative">
      <aside className="absolute left-full lg:block hidden">
        <div className="fixed top-[150px] not-prose pl-6 2xl:pl-12">
          <PageNavigation title="On this article" headings={post.toc} />
        </div>
      </aside>
      <PostHeader
        title={post.title}
        readTime={post.metadata.readingTime}
        publishedAt={post.publishedAt}
      />
      <hr className="not-prose my-5" />
      {post.cover && (
        <Image
          src={post.cover}
          width={680}
          height={383}
          className="w-full h-auto mt-0 not-prose"
          alt={`${post.slug}-thumb-cover`}
        />
      )}
      <MDXContent code={post.body.code} />
      <Comments />
    </article>
  );
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = posts.find(findBySlug((await params).slug));

  if (!post) return {};

  const { excerpt: description, publishedAt, tags, author, cover } = post;
  const title = { absolute: post.title };

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "en_US",
      title,
      description,
      tags,
      publishedTime: new Date(publishedAt).toISOString(),
      authors: author ? [author] : undefined,
      images: cover,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover,
    },
  };
}

export async function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
