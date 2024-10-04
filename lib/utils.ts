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
