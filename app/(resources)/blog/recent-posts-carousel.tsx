import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import { fadeLeft } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import type { Post } from "@/app/(resources)/blog/types";

export default async function RecentPostsCarousel() {
  const posts = await fetcher<Post[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/recent-posts.json`
  );

  return (
    <>
      <Carousel
        containerProps={{ className: "-mx-8 px-8", variants: fadeLeft }}
        containerActionProps={{ className: cn(!posts?.length && "hidden") }}
      >
        {!posts?.length && <p className="text-center">No articles yet</p>}
        {posts?.map(({ title, tags, cover, createdAt }) => (
          <ArticleCard
            key={`${title}-${createdAt.toString()}`}
            title={title}
            cover={cover}
            href="/"
            tags={tags}
            createdAt={createdAt}
          />
        ))}
      </Carousel>
    </>
  );
}
