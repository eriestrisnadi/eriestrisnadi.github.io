import { HTMLAttributes } from "react";
import TimeAgo from "@/components/time-ago";
import type { Post } from "@/contents";

export interface PostHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    Pick<Post, "title" | "publishedAt"> {
  readTime: string | Post["metadata"]["readingTime"];
}

export default async function PostHeader({
  readTime,
  publishedAt,
  ...restProps
}: PostHeaderProps) {
  return (
    <div {...restProps}>
      <h1 className="text-2xl lg:text-3xl capitalize font-bold">
        {restProps.title}
      </h1>
      <p className="flex justify-between text-muted-foreground my-0">
        <span>{typeof readTime === "string" ? readTime : readTime?.text}</span>
        <TimeAgo date={publishedAt} />
      </p>
    </div>
  );
}
