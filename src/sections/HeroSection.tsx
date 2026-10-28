import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { inviteConfig } from "../invite.config";
import { ParticleCanvas } from "../components/ParticleCanvas";
import { FloralGarland } from "../components/FloralGarland";
import { Diya } from "../components/Diya";
import { SectionLanternGarland } from "../components/LanternGarland";

/**
 * Hero Section (~100svh):
 * Royal Mughal Palace Hero:
 * - Hanging garland of 5 lanterns (phone: 3) with varied sizes, chain lengths & phases
 * - Hanging rose & marigold garland (phool ki ladiyan) swaying at top
 * - Ivory background with soft drifting rose petals
 * - Gold multifoil arch frame with apex finial and plinth
 * - Animated brass & clay Diyas with flickering flames at the plinth base
 * - Slow "ink bloom" Bismillah: calligraphy fades in blur-to-sharp with faint radial glow
 * - In the Name of Allah label with gold shimmer
 */
export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero-section"
      className="relative w-full h-[100svh] min-h-[580px] flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 pt-2 pb-6 select-none bg-ivory paper-grain"
    >
      {/* 0. Section Hanging Garland of 5 Lanterns (phone: 3) behind content */}
      <SectionLanternGarland />

      {/* 1. Hanging Rose and Marigold Floral Garland (Phool ki Ladiyan) */}
      <FloralGarland className="absolute top-0 inset-x-0 z-20" />

      {/* Drifting soft petals (max 8 phone, 14 laptop via ParticleCanvas) */}
      <ParticleCanvas />

      {/* Main Arch Frame: Single refined ornament */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] flex-1 flex flex-col items-center justify-center my-auto">
        <svg
          viewBox="0 0 380 470"
          className="w-full h-auto max-h-[62svh] drop-shadow-sm overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroRoseGoldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8998A" />
              <stop offset="30%" stopColor="#E8CFC0" />
              <stop offset="50%" stopColor="#F5E4DB" />
              <stop offset="70%" stopColor="#E8CFC0" />
              <stop offset="100%" stopColor="#C8998A" />
            </linearGradient>
            <radialGradient id="bismillahSoftGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9F5" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#FCECDC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F4D9D6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Slender Outer Arch Frame */}
          <motion.path
            d="M 25 450 L 25 210 C 25 170, 48 160, 68 135 C 88 110, 108 125, 132 95 C 156 70, 172 80, 190 35 C 208 80, 224 70, 248 95 C 272 125, 292 110, 312 135 C 332 160, 355 170, 355 210 L 355 450"
            stroke="url(#heroRoseGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          />

          {/* Inner Parallel Arch Line (dashed) */}
          <motion.path
            d="M 38 450 L 38 215 C 38 180, 58 170, 76 148 C 94 125, 112 138, 134 110 C 156 88, 170 95, 190 55 C 210 95, 224 88, 246 110 C 268 138, 286 125, 304 148 C 322 170, 342 180, 342 215 L 342 450"
            stroke="#C8998A"
            strokeWidth="0.9"
            strokeDasharray="4 3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.65 }}
            transition={{ duration: 2.0, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Crown Apex Diamond */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            transform="translate(190, 26)"
          >
            <rect
              x="-4"
              y="-4"
              width="8"
              height="8"
              fill="#C8998A"
              transform="rotate(45)"
            />
          </motion.g>

          {/* Slender Threshold Ground Line */}
          <motion.g
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeInOut" }}
          >
            <line x1="20" y1="454" x2="360" y2="454" stroke="url(#heroRoseGoldStroke)" strokeWidth="1.5" />
            <line x1="40" y1="458" x2="340" y2="458" stroke="#C8998A" strokeWidth="0.8" strokeOpacity="0.6" />
          </motion.g>
        </svg>

        {/* Center Arch Contents: Bismillah with ink-bloom effect */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 sm:pt-10 px-6 text-center pointer-events-none">
          {/* Gentle Radial Light Halo Blooming */}
          <motion.div
            className="absolute w-52 h-28 sm:w-64 sm:h-36 rounded-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(232, 207, 192, 0.75) 0%, rgba(244, 217, 214, 0.35) 50%, transparent 80%)",
              filter: "blur(14px)",
            }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={shouldReduceMotion ? { opacity: 0.85 } : { opacity: [0, 0.9, 0.75], scale: [0.7, 1.12, 1] }}
            transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
          />

          {/* Slow Ink Bloom: Calligraphy fades in blur-to-sharp */}
          <motion.h2
            className="relative font-arabic text-2xl sm:text-3xl md:text-4xl font-normal leading-loose tracking-widest text-plum drop-shadow-sm"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(14px)", scale: 0.94 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.8, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {inviteConfig.bismillah}
          </motion.h2>

          {/* Ornamental Subline: Cormorant SC, tracking 0.3em, small */}
          <motion.div
            className="flex items-center gap-2.5 mt-2 opacity-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="gold-shimmer-text text-[11px] sm:text-xs tracking-[0.3em] font-label uppercase font-medium">
              In the Name of Allah
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        </div>

        {/* Animated Diyas (Oil Lamps) with flickering flames and scattered petals at plinth base */}
        <div className="absolute -bottom-5 inset-x-0 flex justify-between items-end px-1 sm:px-2 z-20 pointer-events-none">
          <Diya size={46} className="transform -scale-x-100" withPetals={true} />
          <Diya size={46} withPetals={true} />
        </div>
      </div>

      {/* Gentle Scroll Prompt at Bottom */}
      <motion.div
        className="relative z-20 flex flex-col items-center pb-2 cursor-pointer pointer-events-auto"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          const invSection = document.getElementById("invitation-section");
          if (invSection) {
            invSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="font-label tracking-[0.3em] text-[10px] uppercase text-rose-gold mb-1">
          Scroll
        </span>
        <div className="w-6 h-6 rounded-full border border-rose-gold/40 flex items-center justify-center text-rose-gold bg-blush/80 backdrop-blur-sm shadow-sm">
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.8} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
