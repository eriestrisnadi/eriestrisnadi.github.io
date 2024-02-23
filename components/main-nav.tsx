"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src={siteConfig.links.avatar}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
          alt="avatar"
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {navigationConfig.mainNav?.map(
          (item) =>
            item.href && (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith?.(item.href)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </div>
  );
}
