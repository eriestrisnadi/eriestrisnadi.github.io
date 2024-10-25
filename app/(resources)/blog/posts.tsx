import * as motion from "framer-motion/client";
import SectionHeading from "@/components/section-heading";
import ArticleCard from "@/components/article-card";
import { cn } from "@/lib/utils";
import { fadeLeft } from "@/lib/animation";
import { fetcher } from "@/lib/fetcher";
import { GET } from "@/app/(data)/blog/recent-posts.json/route";
import type { Post } from "@/app/(resources)/blog/types";

const twoSpans = [0, 3];

export default async function Posts() {
  // TODO: needs refactor
  const posts: Post[] = await fetcher<Post[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/recent-posts.json`
  ).catch(() => fetcher(GET()));

  return (
    <motion.div variants={fadeLeft} className="space-y-6">
      <SectionHeading>My latest articles</SectionHeading>
      {!posts?.length && <p className="text-center">No articles yet</p>}
      <div className="grid auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        {posts?.map(({ title, tags, cover, createdAt }, postIndex) => (
          <ArticleCard
            key={`${title}-${createdAt.toString()}`}
            title={title}
            cover={cover}
            href="/"
            tags={tags}
            createdAt={createdAt}
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
