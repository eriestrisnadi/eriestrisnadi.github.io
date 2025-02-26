import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import { fadeLeft } from "@/lib/animation";
import { cn, compareDate } from "@/lib/utils";
import { posts } from "@/contents";

export default async function RecentPostsCarousel() {
  const recentPosts = posts.sort(({ publishedAt: a }, { publishedAt: b }) =>
    compareDate(a, b)
  );

  return (
    <>
      <Carousel
        containerProps={{ className: "-mx-8 px-8", variants: fadeLeft }}
        containerActionProps={{
          className: cn(!recentPosts?.length && "hidden"),
        }}
      >
        {!recentPosts?.length && <p className="text-center">No articles yet</p>}
        {recentPosts?.map(
          ({ url, metadata: { readingTime }, ...postProps }) => (
            <ArticleCard
              {...postProps}
              readTime={readingTime}
              key={`${postProps.title}-${postProps.publishedAt}`}
              href={url}
            />
          )
        )}
      </Carousel>
    </>
  );
}
