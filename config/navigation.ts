import { siteConfig } from "./site";

export const navigationConfig = {
  mainNav: [
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "GitHub",
      href: siteConfig.links.github,
      external: true,
    },
  ],
};
