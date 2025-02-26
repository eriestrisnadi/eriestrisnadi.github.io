import Link, { type LinkProps } from "next/link";
import SectionHeading from "@/components/section-heading";
import SectionSubHeading from "@/components/section-sub-heading";
import { Card } from "@/components/ui/card";
import { Image, type ImageProps } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import TimeAgo from "@/components/time-ago";
import type { HTMLAttributes } from "react";
import type { Post } from "@/contents";

interface ArticleCardProps extends Omit<Post, "url" | "readTime" | "metadata"> {
  href: LinkProps["href"];
  readTime?: Post["metadata"]["readingTime"];
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
  publishedAt,
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
                className="bg-background/75 px-0.5 text-xs transition-[background-size,color] bg-gradient-to-t from-foreground to-foreground bg-no-repeat bg-[size:0_2px] even:bg-left-top odd:bg-right-bottom group-hover:bg-[size:100%_2px]"
              >
                {`#${tag}`}
              </span>
            ))}
          </div>
          <div>
            <SectionHeading className="inline relative z-0 transition-[background-size,color] bg-gradient-to-t from-foreground to-foreground bg-no-repeat bg-[size:0_100%] bg-left-bottom group-hover:text-background group-hover:bg-[size:100%_100%]">
              {title}
            </SectionHeading>
            <br />
            <SectionSubHeading className='text-sm text-foreground/70 space-x-2 items-center inline relative z-0 transition-[background-size,color] bg-clip-text bg-gradient-to-b from-foreground from-70% to-30% to-background bg-no-repeat bg-[size:0_100%] bg-right-top after:bg-gradient-to-b after:from-background after:from-70% after:to-30% after:to-foreground after:bg-no-repeat after:bg-[size:0_100%] after:bg-right-top after:transition-[background-size,color] after:content-[""] after:w-full after:h-full after:absolute after:inset-0 after:-z-10 group-hover:text-transparent group-hover:bg-[size:100%_100%] group-hover:after:bg-[size:100%_100%]'>
              <TimeAgo date={publishedAt} />
              <span className="text-xs">&bull;</span>
              <span>
                {typeof readTime == "string" ? readTime : readTime?.text}
              </span>
            </SectionSubHeading>
          </div>
        </div>
      </Card>
    </Link>
  );
}

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
