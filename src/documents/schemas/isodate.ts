import { s } from "velite";
import { parseDate, getTimezoneOffset } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const isodate = () =>
  s
    .string()
    .refine((value) => parseDate(value) !== undefined, "Invalid date string")
    .transform((value) => `${value} ${getTimezoneOffset(siteConfig.timeZone)}`);
