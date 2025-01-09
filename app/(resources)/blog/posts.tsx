import { blogConfig } from "@/config/site";
import * as motion from "framer-motion/client";
import SectionHeading from "@/components/section-heading";
import ArticleCard from "@/components/article-card";
import { fadeLeft } from "@/lib/animation";
import { getMdxMatters } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import type { Post } from "@/app/(resources)/blog/types";

const twoSpans = [0, 3];

export default async function Posts() {
  const posts: Post[] = await getMdxMatters<Post>(blogConfig.contentPath);

  return (
    <motion.div variants={fadeLeft} className="space-y-6">
      <SectionHeading>My latest articles</SectionHeading>
      {!posts?.length && <p className="text-center">No articles yet</p>}
      <div className="grid auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        {posts?.map(({ slug, ...postProps }, postIndex) => (
          <ArticleCard
            {...postProps}
            key={`${postProps.title}-${postProps.createdAt.toString()}`}
            href={`/blog/${slug}`}
            linkProps={{
              className: cn(twoSpans.includes(postIndex) && "md:col-span-2"),
            }}
            containerProps={{ className: "w-full h-full" }}
            imageProps={{ className: "h-auto bottom-1/2 translate-y-1/2" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
