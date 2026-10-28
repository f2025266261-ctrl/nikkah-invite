import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { Lantern } from "./Lantern";
import { useIsDesktopPointer } from "../hooks/useMediaQuery";

interface EnterGateProps {
  isOpen: boolean;
  onOpen: () => void;
}

/**
 * EnterGate:
 * Fallback / Standalone Gate Modal (when used).
 * Fully updated with new color system: blush, cream, mauve, plum, rose-gold, mulberry.
 */
export const EnterGate: React.FC<EnterGateProps> = ({ isOpen, onOpen }) => {
  const isDesktopPointer = useIsDesktopPointer();

  useEffect(() => {
    if (isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="enter-gate-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-blush paper-grain overflow-hidden select-none"
        >
          {/* Subtle Viewport Inset Double Border */}
          <div className="pointer-events-none fixed inset-3 sm:inset-4 md:inset-5 z-40 rose-gold-viewport-border rounded-xl" />

          {/* Hanging Lanterns Left & Right: Exactly 1 pair */}
          <div className="absolute inset-0 pointer-events-none flex justify-between items-start px-4 sm:px-10 md:px-16 lg:px-24 z-20">
            <Lantern size={60} chainLength={35} swingAmplitude={3} swingDelay={0} glow />
            <Lantern size={60} chainLength={35} swingAmplitude={3} swingDelay={0.5} glow />
          </div>

          {/* Center Mughal Gate Architecture & Card */}
          <div className="relative z-10 w-[88%] sm:w-[75%] md:w-[480px] lg:w-[420px] max-h-[90svh] flex flex-col items-center justify-between text-center py-6 sm:py-8">
            <div className="relative w-full flex flex-col items-center">
              <svg
                viewBox="0 0 400 480"
                className="w-full h-auto max-h-[58svh] sm:max-h-[62svh] drop-shadow-sm overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gateRoseGoldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C8998A" />
                    <stop offset="30%" stopColor="#E8CFC0" />
                    <stop offset="50%" stopColor="#F5E4DB" />
                    <stop offset="70%" stopColor="#E8CFC0" />
                    <stop offset="100%" stopColor="#C8998A" />
                  </linearGradient>
                </defs>

                {/* Outer Multifoil Arch Path */}
                <motion.path
                  d="M 30 460 L 30 220 C 30 180, 50 170, 70 145 C 90 120, 110 135, 135 105 C 160 80, 175 90, 200 40 C 225 90, 240 80, 265 105 C 290 135, 310 120, 330 145 C 350 170, 370 180, 370 220 L 370 460"
                  stroke="url(#gateRoseGoldStroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Inner Arch Accent Path */}
                <motion.path
                  d="M 45 460 L 45 225 C 45 190, 62 180, 80 158 C 98 135, 116 148, 140 120 C 162 98, 178 105, 200 60 C 222 105, 238 98, 260 120 C 284 148, 302 135, 320 158 C 338 180, 355 190, 355 225 L 355 460"
                  stroke="#C8998A"
                  strokeWidth="1.0"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                />

                {/* Apex Diamond */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  transform="translate(200, 36)"
                >
                  <rect x="-4" y="-4" width="8" height="8" fill="#C8998A" transform="rotate(45)" />
                </motion.g>

                {/* Base Plinth */}
                <motion.g
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  <line x1="25" y1="464" x2="375" y2="464" stroke="url(#gateRoseGoldStroke)" strokeWidth="2" />
                </motion.g>
              </svg>

              {/* Contents Centered Inside Arch */}
              <div className="absolute inset-0 pt-16 sm:pt-20 flex flex-col items-center justify-center pointer-events-none px-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-arabic text-xl sm:text-2xl text-plum leading-relaxed tracking-wider mb-2"
                >
                  {inviteConfig.bismillah}
                </motion.div>

                <div className="w-16 h-[1px] bg-rose-gold/50 my-2" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="font-names text-5xl sm:text-6xl md:text-7xl text-mauve my-1 sm:my-3 drop-shadow-sm"
                >
                  Y &amp; Z
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="font-label tracking-[0.3em] text-[11px] sm:text-xs text-rose-gold uppercase font-normal mt-1"
                >
                  Nikkah Invitation
                </motion.p>
              </div>
            </div>

            {/* Tap to Open Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="w-full flex flex-col items-center mt-6 sm:mt-8 z-30 pointer-events-auto"
            >
              <button
                type="button"
                onClick={onOpen}
                aria-label="Tap to open the Nikkah invitation"
                className="relative group overflow-hidden min-h-[48px] px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-mulberry via-[#8E4A60] to-mulberry text-cream font-label text-xs sm:text-sm tracking-[0.3em] uppercase font-normal shadow-panel transition-all duration-300 hover:shadow-panel-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-gold/60 cursor-pointer border border-rose-gold/50"
              >
                <span className="relative flex items-center gap-2">
                  <span>◆</span>
                  <span>Tap to Open Invitation</span>
                  <span>◆</span>
                </span>
              </button>

              {isDesktopPointer && (
                <p className="mt-3 text-[11px] text-plum/60 font-body tracking-wider italic">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-cream border border-rose-gold/30 font-sans text-[10px]">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-cream border border-rose-gold/30 font-sans text-[10px]">Space</kbd> to enter
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnterGate;
