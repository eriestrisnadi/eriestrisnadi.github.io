"use client";

import { useEffect, useState } from "react";
import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { HORIZONTAL, VERTICAL, type Position } from "@/lib/utils";
import { Profile } from "@/components/profile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

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
    <div className="sticky top-0 z-50 border-b lg:border-none border-border/40 dark:border-border flex items-start p-4 lg:px-0 gap-4">
      <Profile position={position} />
      {position && (
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 lg:hidden mt-2 bg-transparent"
          onClick={toggleMenu}
        >
          {position === HORIZONTAL ? (
            <DotsVerticalIcon className="w-6 h-6 animate-rise-down" />
          ) : (
            <Cross2Icon className="w-6 h-6 animate-rise-up" />
          )}
        </Button>
      )}
    </div>
  );
}
