import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { useCountdown } from "../hooks/useCountdown";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { revealViewport } from "../hooks/useRevealSafetyNet";

interface OdometerTileProps {
  value: number;
  label: string;
  delay?: number;
  isSeconds?: boolean;
}

/**
 * Single countdown tile:
 * - Thin rose-gold border that draws itself on view
 * - Odometer roll from 00 to current value over 1.2s on first entry
 * - Ticks normally afterwards
 */
const OdometerTile: React.FC<OdometerTileProps> = ({
  value,
  label,
  delay = 0,
  isSeconds = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const prefersReduced = Boolean(shouldReduceMotion);
  const [displayNum, setDisplayNum] = useState<number>(prefersReduced ? value : 0);
  const [hasRolled, setHasRolled] = useState<boolean>(prefersReduced);
  const [isInView, setIsInView] = useState<boolean>(false);
  const tileRef = useRef<HTMLDivElement | null>(null);

  // Trigger odometer roll when entering view
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayNum(value);
      setHasRolled(true);
      return;
    }

    if (!isInView || hasRolled) {
      if (hasRolled) {
        setDisplayNum(value);
      }
      return;
    }

    const startTime = performance.now();
    const duration = 1200; // 1.2s roll
    const target = value;

    let animId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeProgress * target);
      setDisplayNum(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayNum(target);
        setHasRolled(true);
      }
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [isInView, value, hasRolled, delay, shouldReduceMotion]);

  const formattedValue = String(hasRolled ? value : displayNum).padStart(2, "0");

  return (
    <div
      ref={tileRef}
      className="relative flex flex-col items-center"
    >
      <motion.div
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once: true, amount: 0.3 }}
        className={`relative w-16 h-20 min-[360px]:w-18 min-[360px]:h-22 sm:w-22 sm:h-26 md:w-24 md:h-28 rounded-lg bg-cream paper-grain-cream flex flex-col items-center justify-center shadow-panel overflow-hidden transition-all duration-300 ${
          isSeconds ? "ring-1 ring-rose-gold/40" : ""
        }`}
      >
        {/* Thin-line border that draws itself */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="6"
            stroke="#C8998A"
            strokeWidth="1.2"
            initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
          />
        </svg>

        {/* Number Display with Odometer Roll & Flip Tick */}
        <div className="relative h-8 min-[360px]:h-10 sm:h-12 w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={formattedValue}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : hasRolled
                  ? { y: -16, opacity: 0 }
                  : { y: 16, opacity: 0 }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { y: 16, opacity: 0 }
              }
              transition={{ duration: hasRolled ? 0.35 : 0.1, ease: "easeOut" }}
              className="font-heading font-normal text-mauve text-2xl min-[360px]:text-3xl sm:text-4xl leading-none select-none drop-shadow-sm"
            >
              {formattedValue}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Small Horizontal Seam Line */}
        <div className="w-full h-[0.5px] bg-rose-gold/25 my-1 pointer-events-none" />

        {/* Label: Cormorant SC, tracking 0.3em, small */}
        <span className="font-label tracking-[0.3em] text-[9px] min-[360px]:text-[10px] sm:text-xs text-rose-gold uppercase font-normal select-none">
          {label}
        </span>
      </motion.div>
    </div>
  );
};

/**
 * Countdown Section (~100svh):
 * Blush band (#F4D9D6).
 *
 * Distinct Animation:
 * - Thin-line tiles draw their borders on view
 * - Each number rolls like an odometer from 00 to current value over 1.2s
 * - Afterwards ticks normally
 * - Reduced motion: simple fade, numbers start directly at value
 */
export const CountdownSection: React.FC = () => {
  const { days, hours, minutes, seconds, state } = useCountdown(inviteConfig.eventISO);

  return (
    <JharokhaPanel id="countdown-section" variant="blush" className="px-4">
      <div className="w-full max-w-lg flex flex-col items-center justify-center text-center px-2 py-4">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          {/* Label (Font Size 1: 11px): Cormorant SC, tracking 0.3em */}
          <span
            data-reveal="countdown-label"
            className="font-label tracking-[0.3em] text-[11px] sm:text-xs uppercase text-rose-gold font-normal block mb-2"
          >
            ANTICIPATION
          </span>
          {/* Heading (Font Size 2: 24px): Cormorant Garamond italic, plum */}
          <h3
            data-reveal="countdown-heading"
            className="font-body italic text-xl sm:text-2xl md:text-3xl font-normal royal-foil-heading"
          >
            Counting down to our special day
          </h3>
        </motion.div>

        {/* State: Today */}
        {state === "today" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative px-8 py-5 rounded-xl border border-rose-gold/50 bg-cream paper-grain-cream shadow-panel text-center"
          >
            <h4 className="font-names text-3xl sm:text-4xl text-mauve mb-1">
              Alhamdulillah
            </h4>
            <p className="font-label tracking-[0.3em] text-xs sm:text-sm text-rose-gold uppercase font-normal">
              Today is the day!
            </p>
          </motion.div>
        )}

        {/* State: Passed */}
        {state === "passed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-5 rounded-xl border border-rose-gold/40 bg-cream paper-grain-cream shadow-panel text-center"
          >
            <h4 className="font-names text-3xl sm:text-4xl text-mauve mb-1">
              Alhamdulillah
            </h4>
            <p className="font-body italic text-base sm:text-lg text-plum">
              The Nikkah has taken place, Alhamdulillah.
            </p>
          </motion.div>
        )}

        {/* State: Upcoming - 4 Odometer Tiles */}
        {state === "upcoming" && (
          <div className="grid grid-cols-2 min-[340px]:grid-cols-4 gap-3 sm:gap-4 justify-center items-center">
            <OdometerTile value={days} label="Days" delay={0.1} />
            <OdometerTile value={hours} label="Hours" delay={0.2} />
            <OdometerTile value={minutes} label="Minutes" delay={0.3} />
            <OdometerTile value={seconds} label="Seconds" delay={0.4} isSeconds />
          </div>
        )}

      </div>
    </JharokhaPanel>
  );
};

export default CountdownSection;
