"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import {
  isValidElement,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Fragment,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import type { TocHeading } from "@/documents/schemas/toc";

interface PageNavigationProps {
  headings: TocHeading[];
  title?: string;
}

export function PageNavigation({
  headings,
  title = "On this page",
}: PageNavigationProps) {
  const hashLocation = useHashLocation();
  const [activeHeading, setActiveHeading] = useState<string>("");
  const parentRef = useRef<HTMLDivElement>(null);
  const parentOffset = useMemo(
    () => parentRef.current?.getBoundingClientRect().top ?? 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parentRef.current?.getBoundingClientRect().top]
  );
  const ids = useMemo(() => extractIds(headings), [headings]);

  const onScroll = useCallback(() => {
    let current = "";

    // if not even reach first heading, early return
    if (
      (document.getElementById(ids?.[0])?.getBoundingClientRect().top ?? 0) >=
      parentOffset * 2
    )
      return setActiveHeading("");

    for (const id of ids) {
      const element = document.getElementById(id);
      if (!element) continue;
      const bottom = Math.ceil(element.getBoundingClientRect().bottom);

      if (bottom >= parentOffset) {
        current = id;
        break;
      }
    }

    setActiveHeading(current);
  }, [ids, parentOffset]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    if (!hashLocation) return;
    if (activeHeading) return;

    scrollIntoView(document.getElementById(hashLocation), parentOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashLocation, parentOffset]);

  if (!headings?.length) return null;

  return (
    <div ref={parentRef} className="text-sm prose">
      <h4 className="mb-4 font-medium text-muted-foreground">{title}</h4>
      <PageNavigationStack
        items={headings}
        activeHeading={activeHeading}
        offset={parentOffset}
      />
    </div>
  );
}

interface PageNavigationStackProps extends Pick<TocHeading, "items"> {
  activeHeading: TocHeading["url"];
  offset?: number;
}

function PageNavigationStack({
  items,
  activeHeading,
  offset,
}: PageNavigationStackProps) {
  if (!items?.length) return null;

  return (
    <ul className="space-y-2">
      {items.map(({ title, items: subItems, url }, index) => (
        <Fragment key={`${url}-${index}`}>
          <li>
            <PageNavigationItem
              href={url as TocHeading["url"]}
              active={
                url.toString().substring(url.toString().indexOf("#") + 1) ==
                activeHeading
              }
              offset={offset}
            >
              {title}
            </PageNavigationItem>
          </li>
          {subItems?.length > 0 && (
            <li className="ml-4">
              <PageNavigationStack
                items={subItems as TocHeading[]}
                activeHeading={activeHeading}
                offset={offset}
              />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}

interface PageNavigationItemProps extends PropsWithChildren {
  href: LinkProps["href"];
  active?: boolean;
  offset?: number;
}

function PageNavigationItem({
  children,
  href,
  active,
  offset,
}: PageNavigationItemProps) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget;
    const element = document.getElementById(
      target.href.substring(target.href.indexOf("#") + 1)
    );

    scrollIntoView(element, offset);
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex hover:text-muted-foreground scroll-m-10",
        active && "text-primary"
      )}
      scroll={false}
      onClick={onClick}
    >
      <span className="mr-2 block shrink-0">&bull;</span>
      {isValidElement(children) ? children : <span>{children}</span>}
    </Link>
  );
}

function scrollIntoView(element: HTMLElement | null, offset: number = 0) {
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const extractIds = (arr: TocHeading[]) => {
  let ids: string[] = [];

  for (const { items, url } of arr) {
    ids.push(url.toString().substring(url.toString().indexOf("#") + 1));

    if (!items.length) continue;

    ids = ids.concat(extractIds(items));
  }

  return ids;
};
