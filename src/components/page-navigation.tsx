"use client";

import { PostHeading } from "@/lib/contentlayer-toc";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
  useCallback,
} from "react";
import { useHashLocation } from "@/hooks/use-hash-location";

interface PageNavigationProps {
  headings: PostHeading[];
  title?: string;
  scrollOffset?: number;
}

export function PageNavigation({
  headings,
  title = "On this page",
}: PageNavigationProps) {
  const hashLocation = useHashLocation();
  const [activeHeading, setActiveHeading] = useState<string>(
    hashLocation ?? ""
  );
  const parentRef = useRef<HTMLDivElement>(null);

  function scrollIntoView(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget;
    const element = document.getElementById(
      target.href.substring(target.href.indexOf("#") + 1)
    );

    if (!element) return;

    const offset = parentRef.current?.getBoundingClientRect().top ?? 0;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const onScroll = useCallback(() => {
    let current = "";

    for (const heading of headings) {
      const element = document.getElementById(heading.stem);
      if (!element) continue;

      const offset = Math.ceil(
        parentRef.current?.getBoundingClientRect().top ?? 0
      );
      const top = Math.ceil(element.getBoundingClientRect().top);
      if (top <= offset) current = heading.stem;
    }

    setActiveHeading(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const headingsToRender = headings.filter(({ level }) => level > 1);

  if ((headingsToRender ?? []).length === 0) return null;

  return (
    <div ref={parentRef} className="text-sm">
      <h4 className="mb-4 font-medium text-muted-foreground">{title}</h4>
      <ul className="space-y-2">
        {headingsToRender.map(({ title, level, stem }, index) => (
          <li key={index}>
            <Link
              href={`#${stem}`}
              style={{ marginLeft: (level - 2) * 16 }}
              className={cn(
                "flex hover:text-muted-foreground scroll-m-10",
                stem == activeHeading && "text-primary"
              )}
              scroll={false}
              onClick={scrollIntoView}
            >
              <span className="mr-2 block shrink-0">&bull;</span>
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
