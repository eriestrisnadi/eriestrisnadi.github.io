"use client";

import { useEffect, useState } from "react";
import { HORIZONTAL, VERTICAL, type Position } from "@/lib/utils";
import { Profile } from "@/components/profile";
import MenuToggle from "@/components/menu-toggle";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SiteHeaderProps {
  onToggleMenu?: (value: boolean) => void;
}

export function SiteHeader({ onToggleMenu }: SiteHeaderProps) {
  const [position, setPosition] = useState<Position>();
  const isLargeDevice = useMediaQuery("lg");

  function toggleMenu() {
    setPosition(position === HORIZONTAL ? VERTICAL : HORIZONTAL);
  }

  useEffect(() => {
    setPosition(!isLargeDevice ? HORIZONTAL : VERTICAL);
  }, [isLargeDevice]);

  useEffect(() => {
    onToggleMenu?.(position !== HORIZONTAL);
  }, [position, onToggleMenu]);

  return (
    <div className="border-b lg:border-none border-border/40 dark:border-border flex items-start p-4 lg:px-0 gap-4">
      <Profile position={position} />
      <MenuToggle
        onClick={toggleMenu}
        value={position !== HORIZONTAL}
        className="mt-2"
      />
    </div>
  );
}
