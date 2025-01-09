import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Image } from "@/components/ui/image";
import { allPosts } from "@/contents";
import PostHeader from "./header";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find(({ stem }) => stem === params.slug);

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="prose prose-sm transition-colors mx-auto">
      <PostHeader
        title={post.title}
        readTime={post.readTime}
        publishedAt={post.publishedAt}
      />
      <hr className="my-5" />
      {post.cover && (
        <Image
          src={post.cover}
          width={680}
          height={383}
          className="w-full h-auto mt-0"
          alt={`${params.slug}-thumb-cover`}
        />
      )}
      <Content />
    </article>
  );
}

export async function generateStaticParams() {
  return allPosts.map(({ stem }) => ({ slug: stem }));
}
