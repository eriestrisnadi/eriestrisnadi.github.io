import type { HTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { format as durationFormat } from "timeago.js";
import SectionHeading from "@/components/section-heading";
import SectionSubHeading from "@/components/section-sub-heading";
import { Card } from "@/components/ui/card";
import { Image, type ImageProps } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import type { Post } from "@/app/(resources)/blog/types";

interface ArticleCardProps extends Omit<Post, "slug" | "readTime"> {
  href: LinkProps["href"];
  readTime?: Post["readTime"] | string;
  linkProps?: Omit<
    Omit<HTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps,
    "children" | "href"
  > &
    Partial<Pick<LinkProps, "href">>;
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
  imageProps?: Omit<ImageProps, "alt" | "src" | "width" | "height"> &
    Partial<Pick<ImageProps, "alt" | "src" | "width" | "height">>;
}

function ArticleCard({
  title,
  cover,
  createdAt,
  publishedAt: theirPublishedAt,
  href: theirHref,
  tags,
  readTime,
  linkProps: {
    href = theirHref,
    className: linkClassName,
    ...restLinkProps
  } = {},
  containerProps: { className: containerClassName, ...restContainerProps } = {},
  imageProps: {
    src = cover,
    alt = title,
    width = 320,
    height = 400,
    className: imageClassName,
    ...restImageProps
  } = {} as ImageProps,
}: ArticleCardProps) {
  const publishedAt = theirPublishedAt ?? createdAt;

  return (
    <Link key={title} href={href} className={linkClassName} {...restLinkProps}>
      <Card
        className={cn(
          "relative w-80 h-96 group overflow-hidden bg-transparent",
          containerClassName
        )}
        {...restContainerProps}
      >
        {src && (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={cn(
              "absolute h-full w-full transform object-cover object-center transition-transform duration-300 group-hover:scale-[2.5] lg:group-hover:scale-125 group-hover:rotate-12 scale-[1.75] lg:scale-100",
              imageClassName
            )}
            {...restImageProps}
          />
        )}
        <div className="absolute bg-background/50 w-full h-full group-hover:bg-transparent transition-colors"></div>
        <div className="absolute flex flex-col justify-between w-full h-full space-y-5 p-5">
          <div className="flex flex-wrap gap-2">
            {tags?.map?.((tag) => (
              <span
                key={tag}
                className="bg-background/75 py-0.5 px-2.5 text-xs rounded-full"
              >
                # {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col justify-end">
            <SectionHeading className='inline-flex w-max relative z-0 transition-colors after:content-[""] after:w-0 after:h-2/3 after:inline after:absolute after:left-0 after:top-1/3 after:bg-foreground after:-z-10 after:skew-10 after:transition-all group-hover:text-background group-hover:after:w-[calc(100%+1rem)]'>
              {title}
            </SectionHeading>
            <SectionSubHeading className='text-sm text-foreground/70 inline-flex w-max relative z-0 transition-colors after:content-[""] after:w-0 after:h-2/3 after:inline after:absolute after:left-0 after:top-1/3 after:bg-foreground after:-z-10 after:skew-10 after:transition-[width] group-hover:after:delay-150 group-hover:text-background group-hover:after:w-[calc(100%+1rem)]'>
              {[
                durationFormat(
                  publishedAt instanceof Date
                    ? publishedAt
                    : new Date(publishedAt)
                ),
                typeof readTime == "string" ? readTime : readTime?.text,
              ]
                .filter((v) => !!v)
                .join(" | ")}
            </SectionSubHeading>
          </div>
        </div>
      </Card>
    </Link>
  );
}

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
