import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import React from "react";

export { metadata, viewport } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
