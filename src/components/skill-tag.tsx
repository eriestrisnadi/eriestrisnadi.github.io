"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { Image, type ImageProps } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export interface SkillTagProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ImageProps & { asMask?: boolean };
}

export default function SkillTag({
  className,
  children,
  icon: iconProps,
  ...restProps
}: SkillTagProps) {
  const {
    className: iconClassName,
    alt,
    asMask,
    style,
    src,
    width,
    height,
    ...restIconProps
  } = Object.assign(
    { alt: "", asMask: false, width: 20, height: 20 },
    iconProps
  );

  return (
    <div
      className={cn(
        "flex w-max items-center gap-2 rounded-full border border-border from-accent/30 from-40% dark:to-transparent to-accent bg-gradient-to-tr px-5 py-2 text-[15px] bg-clip-padding backdrop-filter backdrop-blur-md shadow-sm",
        className
      )}
      {...restProps}
    >
      {iconProps &&
        (asMask ? (
          <i
            className={cn(
              "bg-foreground [mask-repeat:no-repeat] [mask-size:100%] [mask-position:center_center] w-5 h-5",
              iconClassName
            )}
            style={{ maskImage: `url('${src}')`, width, height }}
            {...restIconProps}
          />
        ) : (
          <Image
            src={src}
            style={style}
            width={width}
            height={height}
            alt={alt}
            className={cn("w-5 h-5", iconClassName)}
            {...restIconProps}
          />
        ))}
      {children as ReactNode}
    </div>
  );
}
