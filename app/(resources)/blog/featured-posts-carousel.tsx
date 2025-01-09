import { blogConfig } from "@/config/site";
import ArticleCard from "@/components/article-card";
import Carousel from "@/components/ui/carousel";
import Divider from "@/components/ui/divider";
import { fadeLeft } from "@/lib/animation";
import { getMdxMatters } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import type { Post } from "@/app/(resources)/blog/types";

export default async function FeaturedPostsCarousel() {
  const posts: Post[] = (
    await getMdxMatters<Post>(blogConfig.contentPath)
  ).filter(({ featured }) => featured);

  return (
    <>
      <Carousel
        containerProps={{
          className: cn("-mx-8 px-8 space-y-0", !posts?.length && "hidden"),
          variants: fadeLeft,
        }}
        containerActionProps={{
          className:
            "mt-0 [&>button]:absolute [&>button>svg]:w-8 [&>button>svg]:h-8 [&>button]:top-1/2 [&>button]:-translate-y-1/2 [&>button]:h-full [&>button]:from-background [&>button]:-from-50% [&>button]:to-75% [&>button]:rounded-none hover:[&>button]:bg-transparent [&>button]:w-20 first-of-type:[&>button]:left-8 first-of-type:hover:[&>button]:bg-gradient-to-r last-of-type:[&>button]:right-8 last-of-type:hover:[&>button]:bg-gradient-to-l",
        }}
      >
        {posts?.map(({ slug, readTime, ...postProps }) => (
          <ArticleCard
            {...postProps}
            key={`${postProps.title}-${postProps.createdAt.toString()}`}
            href={`/blog/${slug}`}
            linkProps={{ className: "w-full shrink-0" }}
            containerProps={{ className: "w-full h-96" }}
            imageProps={{ className: "h-auto bottom-1/2 translate-y-1/2" }}
          />
        ))}
      </Carousel>
      <Divider className={cn(!posts?.length && "hidden")} />
    </>
  );
}
