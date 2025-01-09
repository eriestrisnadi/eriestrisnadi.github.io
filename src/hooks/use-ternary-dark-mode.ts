import {
  useIsomorphicLayoutEffect,
  useTernaryDarkMode as useBaseTernaryDarkMode,
  type TernaryDarkModeOptions,
  type TernaryDarkModeReturn,
} from "usehooks-ts";

const LOCAL_STORAGE_KEY = "theme";

export function useTernaryDarkMode({
  initializeWithValue,
  defaultValue = "dark",
  localStorageKey = LOCAL_STORAGE_KEY,
}: TernaryDarkModeOptions = {}): TernaryDarkModeReturn {
  const darkModeState = useBaseTernaryDarkMode({
    defaultValue,
    localStorageKey,
    initializeWithValue,
  });

  useIsomorphicLayoutEffect(() => {
    if (darkModeState.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeState.isDarkMode]);

  return darkModeState;
}
