import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format as durationFormat } from "timeago.js";
import { Image } from "@/components/ui/image";
import { allPosts } from "@/contents";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find(({ stem }) => stem === params.slug);

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="prose prose-sm transition-colors mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl capitalize font-bold">
          {post.title}
        </h1>
        <p className="flex justify-between text-muted-foreground my-0">
          <span>{post.readTime}</span>
          <span>{durationFormat(post.publishedAt)}</span>
        </p>
      </div>
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
