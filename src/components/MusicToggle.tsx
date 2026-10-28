import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";
import { useMusic } from "./MusicProvider";

/**
 * Floating circular music toggle fixed bottom-right.
 * Re-themed to cream, rose-gold, and mauve.
 * Displays animated equalizer bars when playing, and a muted speaker icon when off.
 */
export const MusicToggle: React.FC = () => {
  const { isPlaying, isAvailable, toggleMusic } = useMusic();

  if (!isAvailable) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className="fixed z-50 right-4 sm:right-6 md:right-8 bottom-[calc(env(safe-area-inset-bottom,16px)+16px)] w-12 h-12 rounded-full bg-cream/90 backdrop-blur-md border border-rose-gold/60 text-rose-gold shadow-panel flex items-center justify-center transition-colors hover:bg-cream hover:border-rose-gold hover:text-mauve focus:outline-none focus:ring-2 focus:ring-rose-gold/50 cursor-pointer"
        style={{
          boxShadow: "0 8px 24px -4px rgba(122, 68, 85, 0.2), 0 0 12px 1px rgba(200, 153, 138, 0.25)",
        }}
      >
        {isPlaying ? (
          /* Animated Equalizer Bars in Mauve and Rose-Gold */
          <div className="flex items-end justify-center gap-[3px] h-4 w-5">
            <motion.span
              className="w-[3px] bg-mauve rounded-full origin-bottom"
              animate={{ height: ["4px", "16px", "8px", "14px", "4px"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="w-[3px] bg-rose-gold rounded-full origin-bottom"
              animate={{ height: ["12px", "5px", "16px", "7px", "12px"] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.span
              className="w-[3px] bg-mauve rounded-full origin-bottom"
              animate={{ height: ["6px", "15px", "4px", "16px", "6px"] }}
              transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.span
              className="w-[3px] bg-rose-gold rounded-full origin-bottom"
              animate={{ height: ["14px", "6px", "12px", "4px", "14px"] }}
              transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        ) : (
          /* Muted Icon */
          <VolumeX className="w-5 h-5 text-plum/60" strokeWidth={1.8} />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default MusicToggle;
