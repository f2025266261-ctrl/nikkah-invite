import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { inviteConfig } from "../invite.config";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { revealViewport } from "../hooks/useRevealSafetyNet";

/**
 * Venue Section (~100svh):
 * Deeper blush band (#EBC4C1).
 * Typography:
 * - Label: Cormorant SC, tracking 0.3em (rose-gold #C8998A)
 * - Venue Name: Cormorant Garamond (plum #7A4455)
 * - Location Subline: Cormorant Garamond italic (plum/rose-gold)
 * - Max three font sizes, content centred, single refined ornament
 */
export const VenueSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <JharokhaPanel id="venue-section" variant="deep-blush" className="px-4">
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center text-center px-2 py-4">
        
        {/* Label (Font Size 1: 11px): Cormorant SC, tracking 0.3em */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 8 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6 }}
          className="mb-1"
        >
          <span
            data-reveal="venue-label"
            className="font-label tracking-[0.3em] text-[11px] sm:text-xs uppercase text-rose-gold font-normal"
          >
            VENUE
          </span>
        </motion.div>

        {/* Dotted Rose-Gold Path Drawing Downward */}
        <div className="flex flex-col items-center my-1">
          <svg
            className="w-2 h-12 sm:h-16 overflow-visible"
            viewBox="0 0 4 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="60"
              stroke="#C8998A"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              strokeLinecap="round"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={revealViewport}
              transition={{ duration: 0.85, ease: "easeInOut", delay: 0.1 }}
            />
          </svg>
        </div>

        {/* Location Pin Icon Badge: Drops with one soft bounce & single ripple */}
        <div className="relative my-2 sm:my-3 flex items-center justify-center">
          {/* Single Ripple Ring */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: [0.7, 1.9], opacity: [0.85, 0] }}
              viewport={revealViewport}
              transition={{ duration: 1.1, delay: 1.15, ease: "easeOut" }}
              className="pointer-events-none absolute w-14 h-14 rounded-full border border-rose-gold/60"
            />
          )}

          {/* Rose-Gold and Cream Pin Badge (Drops with one bounce) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: -36, opacity: 0, scale: 0.8 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
            viewport={revealViewport}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 14,
              delay: 0.85,
            }}
            className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-cream paper-grain-cream border border-rose-gold/70 shadow-panel flex items-center justify-center text-mauve relative z-10"
          >
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-mauve" strokeWidth={1.6} />
          </motion.div>
        </div>

        {/* Venue Text from inviteConfig in plum (Fades up) */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, delay: 1.25, ease: "easeOut" }}
          className="max-w-md my-2"
        >
          <h3
            data-reveal="venue-name"
            className="font-body text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed royal-foil-heading"
          >
            {inviteConfig.venueName}
          </h3>
          {/* Subline */}
          <p
            data-reveal="venue-location"
            className="font-body italic text-sm sm:text-base text-plum/70 mt-1"
          >
            Lahore, Punjab, Pakistan
          </p>
        </motion.div>

        {/* Cream & Rose-Gold Pill Button: "Open in Google Maps" (Fades up) */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
          className="w-full max-w-[280px] pt-3 sm:pt-4"
        >
          <a
            href={inviteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="venue-maps-btn"
            className="group relative overflow-hidden w-full min-h-[48px] px-6 py-2.5 rounded-full border border-rose-gold/60 text-plum bg-cream/90 hover:bg-cream hover:border-rose-gold font-label text-[11px] sm:text-xs tracking-[0.3em] uppercase font-normal shadow-panel flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-panel-lg active:translate-y-0"
          >
            <MapPin className="w-4 h-4 text-rose-gold transition-colors" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-gold/80 transition-colors" />
          </a>
        </motion.div>

      </div>
    </JharokhaPanel>
  );
};

export default VenueSection;
