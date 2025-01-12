"use client";

import { PostHeading } from "@/lib/contentlayer-toc";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PageNavigationProps {
  headings: PostHeading[];
  title?: string;
}

export function PageNavigation({ headings, title = 'On this page' }: PageNavigationProps) {
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const heading of headings) {
        const element = document.getElementById(heading.stem);

        if (element && element.getBoundingClientRect().top < 200)
          current = heading.stem;
      }
      setActiveHeading(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const headingsToRender = headings.filter(({ level }) => level > 1);

  if ((headingsToRender ?? []).length === 0) return null;

  return (
    <div className="text-sm">
      <h4 className="mb-4 font-medium text-muted-foreground">{title}</h4>
      <ul className="space-y-2">
        {headingsToRender.map(({ title, level, stem }, index) => (
          <li key={index}>
            <a
              href={`#${stem}`}
              style={{ marginLeft: (level - 2) * 16 }}
              className={cn(
                "flex hover:text-muted-foreground",
                stem == activeHeading && "text-primary"
              )}
            >
              <span className="mr-2 block shrink-0">&bull;</span>
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
