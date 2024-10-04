import { useEffect, useLayoutEffect } from "react";
import { IS_SERVER } from "@/lib/utils";

export const useIsomorphicLayoutEffect = typeof IS_SERVER
  ? useLayoutEffect
  : useEffect;
