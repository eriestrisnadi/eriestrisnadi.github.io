"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTernaryDarkMode } from "@/hooks/use-ternary-dark-mode";
import { cn } from "@/lib/utils";

interface ModeToggleProps
  extends Partial<Pick<HTMLButtonElement, "className">> {
  variant?: "icon";
}

export function ModeToggle({ className, variant }: ModeToggleProps) {
  const { setTernaryDarkMode, isDarkMode } = useTernaryDarkMode({
    defaultValue: "dark",
  });
  const isIcon = variant === "icon";

  function toggleDarkMode() {
    setTernaryDarkMode(isDarkMode ? "light" : "dark");
  }

  return (
    <Button
      variant="ghost"
      size={isIcon ? "icon" : undefined}
      onClick={toggleDarkMode}
      className={cn("overflow-hidden relative", className)}
    >
      <div
        className={cn(
          "absolute animate-rise-up dark:animate-rise-down dark:rotate-180 top-1/2 space-y-5",
          !isIcon && "left-2"
        )}
      >
        <SunIcon className="-translate-y-1/2" />
        <MoonIcon className="translate-y-1/2 rotate-180" />
      </div>
      <span className="sr-only">Toggle theme</span>
      <span className={cn("ml-4 dark:hidden", isIcon && "hidden")}>
        Light Mode
      </span>
      <span
        className={cn("ml-4 hidden dark:inline-block", isIcon && "dark:hidden")}
      >
        Dark Mode
      </span>
    </Button>
  );
}
