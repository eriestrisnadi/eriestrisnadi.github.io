import type { PropsWithChildren } from "react";
import AppLayout from "@/app/app-layout";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return <AppLayout>{children}</AppLayout>;
}
