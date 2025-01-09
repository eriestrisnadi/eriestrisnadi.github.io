import { useCallback, useSyncExternalStore } from "react";
import { twc } from "@/lib/utils";

type ScreenType = keyof typeof twc.theme.screens;
interface MediaQueryOptions {
  defaultValue?: boolean;
}

export function useMediaQuery(
  query: ScreenType | string,
  { defaultValue = false }: MediaQueryOptions = {}
): boolean {
  const twScreen = twc.theme.screens?.[query as ScreenType];
  const resolvedQuery = twScreen ? `(min-width: ${twScreen})` : query;

  const subscribe = useCallback(
    (callback: VoidFunction) => {
      const matchMedia = window.matchMedia(resolvedQuery);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [resolvedQuery]
  );

  const getSnapshot = () => {
    return window.matchMedia(resolvedQuery).matches;
  };

  const getServerSnapshot = () => {
    return defaultValue;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
