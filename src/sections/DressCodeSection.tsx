import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { BrideIllustration, GroomIllustration } from "../components/DressIllustration";
import { revealViewport } from "../hooks/useRevealSafetyNet";

/**
 * Dress Code Section (~100svh):
 * Placed after Venue section and before Closing section.
 * Phone-first, minimal royal palace aesthetic.
 *
 * Layout:
 * - Small letter-spaced label "DRESS CODE"
 * - Cormorant Garamond italic line in mauve
 * - Two figures side-by-side, each inside a thin rose-gold arch niche on cream:
 *     Bride on the left, Groom on the right.
 * - Under them, a row of six 28px swatch circles with thin rose-gold rings.
 * - Detail text (plum, max 36ch wide, centred).
 *
 * Animation (fabric drape):
 * - Figures unveil top-to-bottom with a clip-path inset reveal + 12px rise (bride first, groom 0.2s later)
 * - Swatches pop in with small spring scale (0.06s stagger)
 * - Text lines fade up
 * - Reduced motion: fade only
 */
export const DressCodeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [brideImgError, setBrideImgError] = useState(false);
  const [groomImgError, setGroomImgError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { title, line, detail, swatches } = inviteConfig.dressCode;

  // Animation variants for fabric drape
  const brideVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 12, clipPath: "inset(0% 0% 100% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.85,
        ease: "easeOut",
        delay: 0.15,
      },
    },
  };

  const groomVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 12, clipPath: "inset(0% 0% 100% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.85,
        ease: "easeOut",
        delay: 0.35, // 0.2s later than bride
      },
    },
  };

  return (
    <JharokhaPanel id="dresscode-section" variant="blush" className="px-2 sm:px-4 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12">
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center text-center px-1 sm:px-2">
        {/* 1. Small Letter-Spaced Label "DRESS CODE" */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-1"
        >
          <span
            data-reveal="dresscode-title"
            className="font-label tracking-[0.3em] text-[11px] sm:text-xs uppercase text-rose-gold font-normal"
          >
            {title}
          </span>
        </motion.div>

        {/* 2. Headline in Cormorant italic (mauve #B06B7E) */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-3 sm:mb-4 px-2"
        >
          <h3
            data-reveal="dresscode-line"
            className="font-body italic text-base sm:text-lg md:text-xl royal-foil-heading leading-snug"
          >
            {line}
          </h3>
        </motion.div>

        {/* 3. Two Side-by-Side Arched Niches on Cream (Bride Left, Groom Right) */}
        <div className="flex items-start justify-center gap-2.5 sm:gap-5 w-full my-1 sm:my-2">
          {/* Bride Column */}
          <div className="flex flex-col items-center w-full max-w-[150px] xs:max-w-[170px] sm:max-w-[200px] md:max-w-[220px]">
            {/* Bride Arch Niche */}
            <div className="relative w-full aspect-[1/2.1] rounded-t-full rounded-b-xl sm:rounded-b-2xl bg-cream border border-rose-gold/60 shadow-panel overflow-hidden p-1 sm:p-1.5 flex flex-col items-center justify-end">
              {/* Inner concentric thin arch line */}
              <div className="pointer-events-none absolute inset-1 sm:inset-1.5 rounded-t-full rounded-b-lg sm:rounded-b-xl border border-rose-gold/30 z-20" />
              
              {/* Apex Diamond Accent */}
              <div className="pointer-events-none absolute top-1.5 inset-x-0 flex justify-center text-[7px] text-rose-gold/70 select-none z-20">
                ◆
              </div>

              {/* Ambient top-left soft light sheen */}
              <div className="pointer-events-none absolute inset-0 rounded-t-full bg-gradient-to-br from-white/40 via-transparent to-rose-gold/5 z-20" />

              {/* Fabric Drape Reveal Animation */}
              <motion.div
                data-reveal="dresscode-bride"
                variants={brideVariants}
                initial={isMounted && !shouldReduceMotion ? "hidden" : "visible"}
                whileInView="visible"
                viewport={revealViewport}
                className="absolute inset-0 z-10 w-full h-full flex items-end justify-center overflow-hidden pb-1 pt-3"
              >
                {/* Subtle Idle Sway */}
                <motion.div
                  animate={isMounted && !shouldReduceMotion ? { rotate: [-0.6, 0.6, -0.6] } : undefined}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom center" }}
                  className="w-full h-full flex items-end justify-center"
                >
                  {!brideImgError ? (
                    <img
                      src={`${import.meta.env.BASE_URL}assets/dress/bride.webp`}
                      alt="Bride dress inspiration: pastel lehenga"
                      loading="lazy"
                      onError={() => setBrideImgError(true)}
                      className="w-full h-full max-h-[88%] object-contain object-bottom drop-shadow-[0_6px_14px_rgba(122,68,85,0.16)] select-none pointer-events-none"
                    />
                  ) : (
                    <BrideIllustration className="w-full h-full max-h-[88%] object-contain object-bottom" />
                  )}
                </motion.div>
              </motion.div>
            </div>

            {/* Bride Caption */}
            <div className="mt-2 text-center select-none">
              <span
                data-reveal="dresscode-caption-bride"
                className="font-label tracking-[0.3em] text-[10px] sm:text-xs uppercase text-plum/90 font-medium"
              >
                The Bride
              </span>
            </div>
          </div>

          {/* Groom Column */}
          <div className="flex flex-col items-center w-full max-w-[150px] xs:max-w-[170px] sm:max-w-[200px] md:max-w-[220px]">
            {/* Groom Arch Niche */}
            <div className="relative w-full aspect-[1/2.1] rounded-t-full rounded-b-xl sm:rounded-b-2xl bg-cream border border-rose-gold/60 shadow-panel overflow-hidden p-1 sm:p-1.5 flex flex-col items-center justify-end">
              {/* Inner concentric thin arch line */}
              <div className="pointer-events-none absolute inset-1 sm:inset-1.5 rounded-t-full rounded-b-lg sm:rounded-b-xl border border-rose-gold/30 z-20" />
              
              {/* Apex Diamond Accent */}
              <div className="pointer-events-none absolute top-1.5 inset-x-0 flex justify-center text-[7px] text-rose-gold/70 select-none z-20">
                ◆
              </div>

              {/* Ambient top-left soft light sheen */}
              <div className="pointer-events-none absolute inset-0 rounded-t-full bg-gradient-to-br from-white/40 via-transparent to-rose-gold/5 z-20" />

              {/* Fabric Drape Reveal Animation (0.2s later than bride) */}
              <motion.div
                data-reveal="dresscode-groom"
                variants={groomVariants}
                initial={isMounted && !shouldReduceMotion ? "hidden" : "visible"}
                whileInView="visible"
                viewport={revealViewport}
                className="absolute inset-0 z-10 w-full h-full flex items-end justify-center overflow-hidden pb-1 pt-3"
              >
                {/* Subtle Idle Sway */}
                <motion.div
                  animate={isMounted && !shouldReduceMotion ? { rotate: [-0.6, 0.6, -0.6] } : undefined}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom center" }}
                  className="w-full h-full flex items-end justify-center"
                >
                  {!groomImgError ? (
                    <img
                      src={`${import.meta.env.BASE_URL}assets/dress/groom.webp`}
                      alt="Groom dress inspiration: cream sherwani"
                      loading="lazy"
                      onError={() => setGroomImgError(true)}
                      className="w-full h-full max-h-[88%] object-contain object-bottom drop-shadow-[0_6px_14px_rgba(122,68,85,0.16)] select-none pointer-events-none"
                    />
                  ) : (
                    <GroomIllustration className="w-full h-full max-h-[88%] object-contain object-bottom" />
                  )}
                </motion.div>
              </motion.div>
            </div>

            {/* Groom Caption */}
            <div className="mt-2 text-center select-none">
              <span
                data-reveal="dresscode-caption-groom"
                className="font-label tracking-[0.3em] text-[10px] sm:text-xs uppercase text-plum/90 font-medium"
              >
                The Groom
              </span>
            </div>
          </div>
        </div>

        {/* 4. Row of Six Swatch Circles (28px each, thin rose-gold ring, spring scale stagger) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 my-3 sm:my-4 flex-wrap">
          {swatches.map((color, idx) => (
            <motion.div
              key={`${color}-${idx}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              viewport={revealViewport}
              transition={
                shouldReduceMotion
                  ? { duration: 0.3, delay: 0.35 + idx * 0.05 }
                  : {
                      type: "spring",
                      stiffness: 420,
                      damping: 18,
                      delay: 0.45 + idx * 0.06,
                    }
              }
              className="relative w-7 h-7 rounded-full border border-rose-gold/70 ring-1 ring-rose-gold/25 shadow-sm transition-transform duration-200 hover:scale-115 flex-shrink-0"
              style={{ backgroundColor: color }}
              title={`Recommended tone ${color}`}
            >
              {/* Subtle top-light gradient sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/5 via-transparent to-white/40 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* 5. Detail Text (plum #7A4455, max 36ch wide, centred) */}
        <motion.div
          initial={isMounted && !shouldReduceMotion ? { opacity: 0, y: 10 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-1 px-3"
        >
          <p
            data-reveal="dresscode-detail"
            className="font-body text-xs sm:text-sm text-plum/85 max-w-[36ch] mx-auto text-center leading-relaxed"
          >
            {detail}
          </p>
        </motion.div>
      </div>
    </JharokhaPanel>
  );
};

export default DressCodeSection;
