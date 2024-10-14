import type { Metadata, Viewport } from "next";
import pkg from "@/package.json";

export const siteConfig = {
  name: pkg.author?.name ?? "Personal Website",
  description: "Let's think about it later",
  url: pkg.homepage,
  ogImage: "",
  author: Object.assign(
    {
      username: "eriestrisnadi",
    },
    pkg.author
  ),
  links: {
    avatar: "https://avatars.githubusercontent.com/u/11029687?v=4",
    github: "https://github.com/eriestrisnadi",
  },
};

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`,
  },
  metadataBase: new URL(siteConfig.url),
  authors: [
    {
      name: siteConfig.author.username,
      url: siteConfig.url,
    },
  ],
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.author.username}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: [
      {
        type: "image/png",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        type: "image/png",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        type: "image/png",
        url: "/favicon-96x96.png",
        sizes: "96x96",
      },
    ],
    apple: [
      {
        type: "image/png",
        url: "/apple-icon.png",
      },
      {
        type: "image/png",
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
      },
      {
        type: "image/png",
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
      },
      {
        type: "image/png",
        url: "/apple-icon-72x72.png",
        sizes: "72x72",
      },
      {
        type: "image/png",
        url: "/apple-icon-76x76.png",
        sizes: "76x76",
      },
      {
        type: "image/png",
        url: "/apple-icon-114x114.png",
        sizes: "114x114",
      },
      {
        type: "image/png",
        url: "/apple-icon-120x120.png",
        sizes: "120x120",
      },
      {
        type: "image/png",
        url: "/apple-icon-144x144.png",
        sizes: "144x144",
      },
      {
        type: "image/png",
        url: "/apple-icon-152x152.png",
        sizes: "152x152",
      },
      {
        type: "image/png",
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
      },
    ],
  },
} satisfies Metadata;

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
} satisfies Viewport;
