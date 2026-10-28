import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { PetalBurstCanvas } from "../components/PetalBurstCanvas";
import { revealViewport } from "../hooks/useRevealSafetyNet";

/**
 * Closing Section (~100svh):
 * Blush band (#F4D9D6).
 *
 * Distinct Animation:
 * - Quote reveals word-by-word blur-to-sharp
 * - Then 10 petals gently drift down and settle once at the bottom
 * - Signature block fades up
 * - Reduced motion: simple fade
 */
export const ClosingSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const quoteWords = inviteConfig.quote.split(" ");

  return (
    <JharokhaPanel id="closing-section" variant="blush" lanternMode="garland" className="px-4 overflow-hidden">
      {/* Trigger petal burst when section enters view */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1"
        onViewportEnter={() => setHasEnteredView(true)}
        viewport={revealViewport}
      />

      {/* 10 Falling Soft Petals drifting down & settling once (starts after quote words) */}
      {hasEnteredView && <PetalBurstCanvas delayStart={1.2} />}

      <div className="relative z-20 w-full max-w-lg flex flex-col items-center justify-center text-center px-2 py-4 space-y-4 sm:space-y-6">
        
        {/* Word-by-Word Quote with blur-to-sharp animation */}
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 max-w-md my-2">
          <motion.span
            initial={isMounted && !shouldReduceMotion ? { opacity: 0, filter: "blur(8px)" } : false}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-body italic text-xl sm:text-2xl text-rose-gold/80 leading-none select-none"
          >
            “
          </motion.span>
          {quoteWords.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              initial={
                isMounted && !shouldReduceMotion
                  ? { opacity: 0, filter: "blur(10px)", y: 4 }
                  : false
              }
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={revealViewport}
              transition={{
                duration: 0.55,
                delay: 0.15 + idx * 0.08,
                ease: "easeOut",
              }}
              data-reveal="closing-word"
              className="font-body italic text-base sm:text-lg md:text-xl text-plum leading-relaxed"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={isMounted && !shouldReduceMotion ? { opacity: 0, filter: "blur(8px)" } : false}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={revealViewport}
            transition={{
              duration: 0.5,
              delay: 0.15 + quoteWords.length * 0.08,
              ease: "easeOut",
            }}
            className="font-body italic text-xl sm:text-2xl text-rose-gold/80 leading-none select-none"
          >
            ”
          </motion.span>
        </div>

        {/* Single Refined Ornament: Slender rose-gold divider with central diamond */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, scaleX: 0 } : false}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.85, delay: 0.8, ease: "easeInOut" }}
          className="w-full max-w-[200px] sm:max-w-[260px] my-1"
        >
          <div className="flex items-center justify-center">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/70" />
            <span className="mx-2.5 text-rose-gold text-[9px] rotate-45 inline-block">◆</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/70" />
          </div>
        </motion.div>

        {/* Closing Signature Block (Fades up) */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
          className="my-2 space-y-1"
        >
          {/* Label: Cormorant SC, tracking 0.3em */}
          <p
            data-reveal="closing-label"
            className="font-label tracking-[0.3em] text-[11px] sm:text-xs uppercase text-rose-gold font-normal"
          >
            With Love
          </p>
          {/* Signature: Great Vibes, mauve */}
          <p
            data-reveal="closing-family"
            className="font-names royal-foil-heading text-3xl sm:text-4xl md:text-5xl py-1 drop-shadow-sm"
          >
            The Families of Asghar Bashir
          </p>
        </motion.div>

      </div>
    </JharokhaPanel>
  );
};

export default ClosingSection;
