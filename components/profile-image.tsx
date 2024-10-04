"use client";

import { useMemo } from "react";
import { Image } from "@/components/ui/image";
import { siteConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/use-media-query";

const DEFAULT_SIZE = 80;
const COMPACT_SIZE = DEFAULT_SIZE / 1.5;

export interface ProfileImageProps {
  compact?: boolean;
}

export function ProfileImage({ compact }: ProfileImageProps) {
  const isLargeDevice = useMediaQuery("lg");
  const size = useMemo(() => {
    if (!isLargeDevice) return !compact ? DEFAULT_SIZE : COMPACT_SIZE;

    return compact ? COMPACT_SIZE : DEFAULT_SIZE;
  }, [compact, isLargeDevice]);

  return (
    <Image
      src={siteConfig.links.avatar}
      width={size}
      height={size}
      variant="rounded"
      alt="avatar"
      className="lg:hover:scale-105"
    />
  );
}

export default ProfileImage;
