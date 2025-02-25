import AppLayout from "@/app/app-layout";
import { VERTICAL } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export default function ResourceLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <AppLayout position={VERTICAL}>{children}</AppLayout>;
}
