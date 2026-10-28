import { useEffect } from "react";

/**
 * Standard Framer Motion viewport configuration for all scroll reveals:
 * - Trigger once
 * - Sensitive 15% intersection threshold
 * - -8% bottom margin so it triggers slightly before hitting the exact bottom
 */
export const revealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;

/**
 * Safety Net:
 * Monitors any reveal elements (marked with [data-reveal] or .reveal-item).
 * If any reveal element has been inside the viewport for 1.2s and its computed opacity
 * is still below 0.9 (or has a hiding clip-path/transform), forces it visible.
 */
export function useRevealSafetyNet() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const timers = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            if (!timers.has(el)) {
              const timerId = window.setTimeout(() => {
                // Check if element is still hidden or partially invisible
                const computed = window.getComputedStyle(el);
                const opacity = parseFloat(computed.opacity || "1");
                const clipPath = computed.clipPath;
                const isClipped = clipPath && clipPath.includes("100%");

                if (opacity < 0.9 || isClipped) {
                  el.style.opacity = "1";
                  el.style.clipPath = "none";
                  el.style.transform = "none";
                  el.setAttribute("data-revealed-by", "safetynet");
                }
                timers.delete(el);
              }, 1200);

              timers.set(el, timerId);
            }
          } else {
            // Cancel timer if scrolled out before 1.2s
            const timerId = timers.get(el);
            if (timerId) {
              clearTimeout(timerId);
              timers.delete(el);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-reveal], .reveal-item, #names-section h2, #invitation-section h1, #invitation-section h2, #invitation-section p, #venue-section h3, #closing-section span, #dresscode-section h3"
      );
      targets.forEach((t) => observer.observe(t));
    };

    observeElements();

    // Re-observe if dynamic elements lazy load
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);
}
