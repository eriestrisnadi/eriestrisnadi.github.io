import MainLayout from "@/app/(main)/layout";
import { VERTICAL } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export default function ResourceLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <MainLayout position={VERTICAL}>{children}</MainLayout>;
}
