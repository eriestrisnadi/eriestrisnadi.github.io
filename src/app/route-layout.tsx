"use client";

import React, { useMemo, type PropsWithChildren } from "react";
import MainLayout from "@/app/(main)/layout";
import ResourceLayout from "@/app/(resources)/layout";
import { usePathname } from "next/navigation";

const layoutMap = {
  blog: ResourceLayout,
  default: MainLayout,
};

export default function RouteLayout({
  children,
  variant,
  ...restProps
}: PropsWithChildren<{
  variant?: keyof typeof layoutMap;
}>) {
  const rootPathName = usePathname()?.split("/")?.[1];
  const Layout = useMemo(
    () =>
      layoutMap?.[variant ?? (rootPathName as keyof typeof layoutMap)] ??
      layoutMap.default,
    [rootPathName, variant]
  );

  return <Layout {...restProps}>{children}</Layout>;
}
