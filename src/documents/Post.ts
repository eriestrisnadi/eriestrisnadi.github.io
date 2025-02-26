import { defineCollection, s } from "velite";
import { toc } from "@/documents/schemas/toc";

export const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s.object({
    title: s.string(),
    url: s
      .path()
      .transform((path) => `/${path}`)
      .pipe(s.unique()),
    slug: s
      .custom()
      .transform((_, { meta: { stem } }) => stem)
      .pipe(s.slug("Post", ["blog"])),
    excerpt: s.excerpt(),
    cover: s.union([s.string().url(), s.string()]),
    publishedAt: s.isodate(),
    tags: s.array(s.string()),
    featured: s.boolean().default(false),
    author: s.string().optional(),
    metadata: s
      .metadata()
      .transform(({ readingTime: minutes, ...restMetadata }) => ({
        ...restMetadata,
        readingTime: {
          minutes,
          // TODO: support i18n? or auto determine unit minutes/hours/days/etc?
          text: `${minutes} min${minutes > 1 ? "s" : ""} left`,
        },
      })),
    toc: s.toc(),
    betterToc: toc(),
    body: s.mdx().transform((code, { meta: { content: raw } }) => ({
      raw,
      code,
    })),
  }),
});
