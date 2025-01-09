import { blogConfig } from "@/config/site";
import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import { fadeLeft } from "@/lib/animation";
import { getMdxMatters } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import type { Post } from "@/app/(resources)/blog/types";

export default async function RecentPostsCarousel() {
  const posts: Post[] = await getMdxMatters<Post>(blogConfig.contentPath);

  return (
    <>
      <Carousel
        containerProps={{ className: "-mx-8 px-8", variants: fadeLeft }}
        containerActionProps={{ className: cn(!posts?.length && "hidden") }}
      >
        {!posts?.length && <p className="text-center">No articles yet</p>}
        {posts?.map(({ slug, ...postProps }) => (
          <ArticleCard
            {...postProps}
            key={`${postProps.title}-${postProps.createdAt.toString()}`}
            href={`/blog/${slug}`}
          />
        ))}
      </Carousel>
    </>
  );
}
