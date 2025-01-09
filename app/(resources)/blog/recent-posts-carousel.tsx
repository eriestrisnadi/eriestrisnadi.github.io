import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import { fadeLeft } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import { GET } from "@/app/(data)/blog/recent-posts.json/route";
import type { Post } from "@/app/(resources)/blog/types";

export default async function RecentPostsCarousel() {
  // TODO: needs refactor
  const posts: Post[] = await fetcher<Post[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/recent-posts.json`
  ).catch(() => fetcher(GET()));

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
