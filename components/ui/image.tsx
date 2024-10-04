"use client";

import React, { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

const imageVariants = cva("", {
  variants: {
    variant: {
      default: "",
      rounded: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

import { cn } from "@/lib/utils";

export interface ImageProps
  extends NextImageProps,
    VariantProps<typeof imageVariants> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, src, className, variant, ...rest }, ref) => {
    const [isLoading, setLoading] = useState(true);

    return (
      <div
        className={cn(
          "overflow-hidden",
          isLoading ? "animate-pulse" : "",
          imageVariants({ variant })
        )}
      >
        <NextImage
          ref={ref}
          className={cn(
            "duration-700 ease-in-out",
            isLoading
              ? "scale-[1.02] blur-xl grayscale"
              : "scale-100 blur-0 grayscale-0",
            imageVariants({ variant }),
            className
          )}
          src={src}
          alt={alt}
          loading="lazy"
          quality={100}
          onLoadingComplete={() => setLoading(false)}
          {...rest}
        />
      </div>
    );
  }
);

Image.displayName = NextImage.displayName;

export { Image };
