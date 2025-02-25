"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { SiteHeader } from "@/components/site-header";
import { ModeToggle } from "@/components/mode-toggle";
import MenuToggle from "@/components/menu-toggle";
import { Profile } from "@/components/profile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, HORIZONTAL, VERTICAL, type Position } from "@/lib/utils";

function HorizontalNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const isLargeDevice: string | boolean = useMediaQuery("lg", {
    defaultValue: "",
  } as any);
  const isInitial = typeof isLargeDevice === "string";

  useEffect(() => {
    setShowMenu(isInitial || isLargeDevice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLargeDevice]);

  return (
    <header
      className={cn(
        "sticky top-0 space-y-2 lg:pt-8 bg-background shrink-0 w-full h-full items-center lg:sticky z-50 lg:px-4",
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

function VerticalNavigation() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 space-y-2 lg:py-4 bg-background lg:w-1/5 shrink-0 lg:block lg:sticky lg:top-4 z-50",
        showMenu && "fixed w-full h-full"
      )}
    >
      <SiteHeader onToggleMenu={setShowMenu} />
      <Navigation
        position={VERTICAL}
        className={cn("px-4 hidden lg:px-0 lg:flex", showMenu && "flex")}
      />
      <ModeToggle className="fixed bottom-0 right-0 rounded-b-none rounded-r-none" />
    </header>
  );
}

export default function AppNavigation({
  position = HORIZONTAL,
}: {
  position?: Position;
}) {
  return position === HORIZONTAL ? (
    <HorizontalNavigation />
  ) : (
    <VerticalNavigation />
  );
}
