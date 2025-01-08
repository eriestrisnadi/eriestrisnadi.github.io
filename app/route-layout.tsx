"use client";

import React, {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useMemo,
  type ReactNode,
} from "react";
import MainLayout from "@/app/(main)/layout";
import MainNavigation from "@/app/(main)/@navigation/default";
import ResourceLayout from "@/app/(resources)/layout";
import ResourceNavigation from "@/app/(resources)/@navigation/default";
import { usePathname } from "next/navigation";

const layoutMap = {
  blog: <ResourceLayout navigation={<ResourceNavigation />} />,
  default: <MainLayout navigation={<MainNavigation />} />,
};

export default function RouteLayout({
  children,
  variant,
  ...restProps
}: PropsWithChildren<{
  navigation?: ReactNode;
  variant?: keyof typeof layoutMap;
}>) {
  const rootPathName = usePathname()?.split("/")?.[1];
  const layoutElement = useMemo(
    () =>
      (layoutMap?.[variant ?? (rootPathName as keyof typeof layoutMap)] ??
        layoutMap.default) as ReactElement,
    [rootPathName, variant]
  );

  return cloneElement(
    layoutElement,
    Object.assign({}, layoutElement.props, restProps),
    children
  );
}
