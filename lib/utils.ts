import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export const HORIZONTAL: "horizontal" = "horizontal";
export const VERTICAL: "vertical" = "vertical";

export type Position = typeof HORIZONTAL | typeof VERTICAL;

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
