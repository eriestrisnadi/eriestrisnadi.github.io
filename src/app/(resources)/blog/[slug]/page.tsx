import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Image } from "@/components/ui/image";
import { allPosts } from "@/contents";
import PostHeader from "./header";
import { PageNavigation } from "@/components/page-navigation";
import Comments from "@/components/comments";

export interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(({ stem }) => stem === params.slug);

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="prose prose-sm max-w-2xl mx-auto lg:mx-0 transition-colors relative">
      <aside className="absolute left-full lg:block hidden">
        <div className="fixed top-[150px] not-prose pl-6 2xl:pl-12">
          <PageNavigation title="On this article" headings={post.headings} />
        </div>
      </aside>
      <PostHeader
        title={post.title}
        readTime={post.readTime}
        publishedAt={post.publishedAt}
      />
      <hr className="not-prose my-5" />
      {post.cover && (
        <Image
          src={post.cover}
          width={680}
          height={383}
          className="w-full h-auto mt-0 not-prose"
          alt={`${params.slug}-thumb-cover`}
        />
      )}
      <Content />
      <Comments />
    </article>
  );
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = allPosts.find(({ stem }) => stem === params.slug);

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
  return allPosts.map(({ stem }) => ({ slug: stem }));
}
