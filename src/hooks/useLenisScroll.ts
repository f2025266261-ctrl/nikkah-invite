import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Singleton reference to the active Lenis instance
let globalLenis: Lenis | null = null;

export function getGlobalLenis(): Lenis | null {
  return globalLenis;
}

/**
 * Initializes and manages Lenis smooth scroll and synchronizes it with GSAP ScrollTrigger:
 * lenis.on('scroll', ScrollTrigger.update);
 * gsap.ticker.add((time) => lenis.raf(time * 1000));
 * gsap.ticker.lagSmoothing(0);
 */
export function useLenisScroll() {
  useEffect(() => {
    // If reduced motion is requested, do not run smooth scrolling
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    if (globalLenis) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    globalLenis = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker to Lenis requestAnimationFrame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    // Initial refresh
    ScrollTrigger.refresh();

    // Call ScrollTrigger.refresh() after fonts are ready
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Call ScrollTrigger.refresh() on window load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    // Call ScrollTrigger.refresh() on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
}

/**
 * Hook to access the active Lenis instance for programmatic scrolling (e.g. lenis.scrollTo).
 */
export function useLenisInstance(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(() => globalLenis);

  useEffect(() => {
    setLenis(globalLenis);
    const interval = setInterval(() => {
      if (globalLenis !== lenis) {
        setLenis(globalLenis);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [lenis]);

  return lenis;
}
