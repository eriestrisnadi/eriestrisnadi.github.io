import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import React from "react";
import NavigationHeader from "./@navigation/default";

export { metadata, viewport } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  navigation,
  children,
}: Readonly<{
  navigation: React.ReactNode;
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
        <div className="relative flex min-h-screen flex-col lg:flex-row lg:py-4">
          {navigation ?? <NavigationHeader />}
          <main className="flex-1 flex flex-col p-8 overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
