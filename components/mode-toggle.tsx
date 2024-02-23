"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={changeTheme} className="overflow-hidden relative">
      <div className="absolute animate-rise-up dark:animate-rise-down dark:rotate-180 top-2 space-y-5">
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-180" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
