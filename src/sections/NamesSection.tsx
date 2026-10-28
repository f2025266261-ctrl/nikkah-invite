import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { revealViewport } from "../hooks/useRevealSafetyNet";

/**
 * Names Section (~100svh):
 * Blush band (#F4D9D6).
 * Typography:
 * - Great Vibes for names in mauve (#B06B7E)
 * - Cormorant SC, tracking 0.3em for connector label (rose-gold #C8998A)
 * - Max three font sizes, content centred, single refined ornament
 * - Progressive enhancement: visible by default, animated on mount.
 */
export const NamesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.05,
      },
    },
  };

  const nameVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: shouldReduceMotion ? 0.4 : 1.1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const connectorVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <JharokhaPanel id="names-section" variant="blush" className="px-4">
      <motion.div
        initial={isMounted ? "hidden" : "visible"}
        whileInView="visible"
        viewport={revealViewport}
        variants={containerVariants}
        className="w-full max-w-lg flex flex-col items-center justify-center text-center px-2 py-4 space-y-4 sm:space-y-6"
      >
        {/* Bride Name: Yashfa Ali with handwriting wipe (left-to-right clip-path) */}
        <div className="relative py-1 flex justify-center w-full">
          <motion.div
            variants={nameVariants}
            data-reveal="names-bride"
            className="flex justify-center"
          >
            <h2
              style={{
                fontSize: "clamp(2.5rem, 8.5vw, 4.5rem)",
              }}
              className="font-names royal-foil-heading whitespace-nowrap leading-[1.15] select-none tracking-normal drop-shadow-sm px-2"
            >
              {inviteConfig.bride}
            </h2>
          </motion.div>
        </div>

        {/* Rose-Gold Line Drawing with Connector "with" */}
        <div className="my-2 sm:my-3 flex items-center justify-center gap-3 w-full max-w-[280px]">
          <motion.span
            variants={lineVariants}
            style={{ transformOrigin: "right" }}
            className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/70"
          />
          
          <motion.span
            variants={connectorVariants}
            data-reveal="names-connector"
            className="font-label text-xs sm:text-sm text-rose-gold tracking-[0.3em] uppercase font-normal select-none"
          >
            {inviteConfig.connector}
          </motion.span>

          <motion.span
            variants={lineVariants}
            style={{ transformOrigin: "left" }}
            className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/70"
          />
        </div>

        {/* Groom Name: Zain Saleem with handwriting wipe (left-to-right clip-path) */}
        <div className="relative py-1 flex justify-center w-full">
          <motion.div
            variants={nameVariants}
            data-reveal="names-groom"
            className="flex justify-center"
          >
            <h2
              style={{
                fontSize: "clamp(2.5rem, 8.5vw, 4.5rem)",
              }}
              className="font-names royal-foil-heading whitespace-nowrap leading-[1.15] select-none tracking-normal drop-shadow-sm px-2"
            >
              {inviteConfig.groom}
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </JharokhaPanel>
  );
};

export default NamesSection;
