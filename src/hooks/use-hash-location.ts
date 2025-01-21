import { useCallback, useSyncExternalStore } from "react";

interface HashLocationOptions {
  defaultValue?: string;
}

export function useHashLocation({
  defaultValue,
}: HashLocationOptions = {}): HashLocationOptions["defaultValue"] {
  const subscribe = useCallback((callback: VoidFunction) => {
    window.addEventListener("hashchange", callback);
    return () => {
      window.removeEventListener("hashchange", callback);
    };
  }, []);

  const getSnapshot = () => {
    return window.location.hash.substring(
      window.location.hash.indexOf("#") + 1
    );
  };

  const getServerSnapshot = () => {
    return defaultValue;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
