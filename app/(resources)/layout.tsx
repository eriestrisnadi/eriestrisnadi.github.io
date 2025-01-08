import type { ReactNode, PropsWithChildren } from "react";

export default function ResourcesLayout({
  navigation,
  children,
}: PropsWithChildren<{ navigation: ReactNode }>) {
  return (
    <div className="relative flex min-h-screen flex-col lg:py-4">
      {navigation}
      <main className="flex-1 flex flex-col p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
