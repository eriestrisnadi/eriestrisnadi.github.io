"use client";

import Giscus, { type GiscusProps } from "@giscus/react";
import { useTernaryDarkMode } from "@/hooks/use-ternary-dark-mode";
import { siteConfig } from "@/config/site";

export interface CommentsProps
  extends Omit<
    Partial<GiscusProps>,
    | "repo"
    | "repoId"
    | "category"
    | "categoryId"
    | "reactionsEnabled"
    | "emitMetadata"
    | "strict"
    | "theme"
  > {
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  strict?: boolean;
}

export default function Comments({
  mapping = "pathname",
  reactionsEnabled = false,
  emitMetadata = true,
  strict = false,
  inputPosition = "bottom",
  lang = "en",
  loading = "lazy",
  ...restProps
}: CommentsProps) {
  const { isDarkMode } = useTernaryDarkMode();
  const theme: GiscusProps["theme"] = isDarkMode ? "transparent_dark" : "light";
  const repo =
    `${siteConfig.repository.username}/${siteConfig.repository.name}` as GiscusProps["repo"];

  return (
    <Giscus
      {...restProps}
      repo={repo}
      repoId="MDEwOlJlcG9zaXRvcnkzMDg2OTMwMQ=="
      category="General"
      categoryId="DIC_kwDOAdcHNc4CmLe3"
      mapping={mapping}
      reactionsEnabled={toBooleanString(reactionsEnabled)}
      emitMetadata={toBooleanString(emitMetadata)}
      strict={toBooleanString(strict)}
      inputPosition={inputPosition}
      theme={theme}
      lang={lang}
      loading={loading}
    />
  );
}

function toBooleanString(val: boolean) {
  return val ? "1" : "0";
}
