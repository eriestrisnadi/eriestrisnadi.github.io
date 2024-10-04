import { siteConfig } from "@/config/site";
import { ReaderIcon, GitHubLogoIcon, LayersIcon, MixIcon } from "@radix-ui/react-icons";

export const navigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: <MixIcon />,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <LayersIcon />,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: <ReaderIcon />,
    },
    {
      title: "GitHub",
      href: siteConfig.links.github,
      external: true,
      icon: <GitHubLogoIcon />,
    },
  ],
};
