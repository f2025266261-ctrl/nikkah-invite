import { useEffect, useState } from "react";

/**
 * Hook to match a CSS media query string.
 * Automatically updates when viewport changes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
      return () => mediaQueryList.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(listener);
      return () => mediaQueryList.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Checks if the user is on a desktop pointer device (fine mouse)
 * AND has not requested reduced motion.
 * Returns false on touch devices (phones, tablets) or when reduced-motion is active.
 */
export function useIsDesktopPointer(): boolean {
  const isFinePointer = useMediaQuery("(pointer: fine) and (min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return isFinePointer && !prefersReducedMotion;
}

/**
 * Hook to check if prefers-reduced-motion is enabled.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
