import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig.js";
import tailwindConfig from "@/tailwind.config";
import { siteConfig } from "@/config/site";

export const HORIZONTAL: "horizontal" = "horizontal";
export const VERTICAL: "vertical" = "vertical";
export const ASCENDING: "asc" = "asc";
export const DESCENDING: "desc" = "desc";

export type Position = typeof HORIZONTAL | typeof VERTICAL;
export type SortBy = typeof ASCENDING | typeof DESCENDING;

export const IS_SERVER = typeof window === "undefined";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twc = resolveConfig(tailwindConfig);

export function resolveUrl(value: string, baseUrl: string = "/") {
  return value.startsWith("http") || value.startsWith("/")
    ? value
    : [baseUrl, value].join("/");
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function chunks<T extends any[]>(list: T, size = list.length / 2) {
  return [...Array(Math.ceil(list.length / size))].map((_) =>
    list.splice(0, size)
  );
}

export function isEvenValue<
  Even extends any = boolean,
  Odd extends any = boolean
>(
  value: number,
  evenAsValue: Even = true as Even,
  oddAsValue: Odd = false as Odd
) {
  return value % 2 == 0 ? evenAsValue : oddAsValue;
}

export function compareDate(
  dateLeft: Date | string,
  dateRight: Date | string,
  sortBy: SortBy = DESCENDING
): number {
  const diff =
    +(dateLeft instanceof Date ? dateLeft : new Date(dateLeft)) -
    +(dateRight instanceof Date ? dateRight : new Date(dateRight));

  if (sortBy === ASCENDING) {
    if (diff < 0) return -1;
    else if (diff > 0) return 1;
  } else {
    if (diff > 0) return -1;
    else if (diff < 0) return 1;
  }

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

export const dateFormatter = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
  timeZone: siteConfig.timeZone,
}).format;

export function parseDate(value: number | string | Date) {
  try {
    return value instanceof Date ? value : new Date(value);
  } catch (_err) {
    return undefined;
  }
}

export function getTimezoneOffset(timeZone: string) {
  return Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
    timeZone,
  })
    .formatToParts()
    .find(({ type }) => type === "timeZoneName")?.value;
}
