import { format as durationFormat } from "timeago.js";
import type { Post } from "@/contents";
import { HTMLAttributes } from "react";

export interface PostHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    Pick<Post, "title" | "readTime" | "publishedAt"> {}

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
        <span>{readTime}</span>
        <span>{durationFormat(publishedAt)}</span>
      </p>
    </div>
  );
}
