import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
export { metadata, viewport } from "@/config/site";
import type { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-screen-lg mx-auto lg:px-4 xl:px-0",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
