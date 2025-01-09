import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import { fadeLeft } from "@/lib/animation";
import { cn, compareDate } from "@/lib/utils";
import { allPosts } from "@/contents";

export default async function RecentPostsCarousel() {
  const posts = allPosts.sort(({ publishedAt: a }, { publishedAt: b }) =>
    compareDate(a, b)
  );

  return (
    <>
      <Carousel
        containerProps={{ className: "-mx-8 px-8", variants: fadeLeft }}
        containerActionProps={{ className: cn(!posts?.length && "hidden") }}
      >
        {!posts?.length && <p className="text-center">No articles yet</p>}
        {posts?.map(({ url, ...postProps }) => (
          <ArticleCard
            {...postProps}
            key={`${postProps.title}-${postProps.publishedAt}`}
            href={url}
          />
        ))}
      </Carousel>
    </>
  );
}
