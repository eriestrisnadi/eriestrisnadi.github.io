import Navigation from "@/app/(main)/navigation";
import { cn, HORIZONTAL, VERTICAL, type Position } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export default function MainLayout({
  position = HORIZONTAL,
  children,
}: PropsWithChildren<{ position?: Position }>) {
  const isHorizontal = position === HORIZONTAL;

  return (
    <div
      className={cn(
        "relative flex min-h-screen",
        isHorizontal ? "flex-col lg:flex-row lg:py-4" : "flex-col lg:pb-4"
      )}
    >
      <Navigation position={isHorizontal ? VERTICAL : HORIZONTAL} />
      <main className="flex-1 flex flex-col p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
