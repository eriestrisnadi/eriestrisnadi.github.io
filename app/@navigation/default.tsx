"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { SiteHeader } from "@/components/site-header";
import { cn, VERTICAL } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export default function NavigationHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={cn(
        "space-y-2 lg:py-4 bg-background lg:bg-transparent lg:w-auto lg:block lg:relative z-50",
        showMenu &&
          "fixed w-full h-full"
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
