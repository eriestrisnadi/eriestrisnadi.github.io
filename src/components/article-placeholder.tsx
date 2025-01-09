import { type HTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ArticlePlaceholderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
}

export default function ArticlePlaceholder({
  className,
  size = 3,
}: ArticlePlaceholderProps) {
  return Array.from({ length: size }, (_, i) => i).map((key) => (
    <Skeleton
      key={`article-placeholder-${key}`}
      className={cn("w-80 h-96 rounded-xl", className)}
    />
  ));
}
