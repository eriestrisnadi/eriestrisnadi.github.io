"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn, HORIZONTAL, type Position } from "@/lib/utils";
import { ProfileImage } from "@/components/profile-image";

interface ProfileProps extends Partial<Pick<HTMLDivElement, "className">> {
  position?: Position;
}

export function Profile({ className, position = HORIZONTAL }: ProfileProps) {
  const isHorizontal = position === HORIZONTAL;

  return (
    <div
      className={cn(
        "flex w-full grow items-center gap-4 lg:flex-col lg:items-start lg:gap-0.5",
        isHorizontal
          ? "flex-row lg:flex-row lg:items-center lg:gap-4"
          : "flex-col items-start",
        className
      )}
    >
      <ProfileImage compact={isHorizontal} />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <Link href="/" passHref>
            <h2
              className={cn(
                "flex-grow text-lg font-medium lg:text-xl",
                isHorizontal && "lg:text-lg"
              )}
            >
              {siteConfig.name}
            </h2>
          </Link>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className="text-blue-400"
            height={18}
            width={18}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
          </svg>
        </div>
        <div
          className={cn(
            "text-xs lg:text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 lg:flex",
            isHorizontal && "lg:text-xs"
          )}
        >
          @{siteConfig.author.username}
        </div>
      </div>
    </div>
  );
}
