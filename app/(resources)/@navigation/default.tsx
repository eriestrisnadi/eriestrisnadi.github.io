"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { cn, HORIZONTAL, VERTICAL } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";
import { Profile } from "@/components/profile";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function NavigationHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const isLargeDevice: string | boolean = useMediaQuery("lg", {
    defaultValue: "",
  } as any);
  const isInitial = typeof isLargeDevice === "string";

  useEffect(() => {
    setShowMenu(isInitial || isLargeDevice);
  }, [isLargeDevice]);

  return (
    <header
      className={cn(
        "sticky top-0 space-y-2 lg:py-4 bg-background lg:bg-transparent shrink-0 w-full h-full items-center lg:sticky lg:top-4 z-50 lg:px-4",
        !isInitial && showMenu && "fixed"
      )}
    >
      <div className="border-b lg:border-none border-border/40 dark:border-border flex p-4 lg:px-0 gap-4 items-start lg:items-center">
        <Profile
          position={
            isInitial
              ? HORIZONTAL
              : !isLargeDevice
              ? showMenu
                ? VERTICAL
                : HORIZONTAL
              : HORIZONTAL
          }
        />
        {(isInitial || isLargeDevice) && (
          <Navigation
            position={HORIZONTAL}
            className={cn(
              "px-4 w-0 lg:px-0 overflow-hidden transition-[width]",
              (isInitial || showMenu) && "hidden w-full lg:flex"
            )}
          />
        )}
        <MenuToggle
          className="lg:inline-flex lg:mt-0 mt-2"
          onToggle={setShowMenu}
          value={showMenu}
        />
      </div>
      {!isLargeDevice && (
        <Navigation
          position={VERTICAL}
          className={cn(
            "px-4 hidden lg:px-0 transition-[width]",
            showMenu && "flex",
            isInitial && "hidden"
          )}
        />
      )}
      <ModeToggle className="fixed bottom-0 right-0 rounded-b-none rounded-r-none" />
    </header>
  );
}
