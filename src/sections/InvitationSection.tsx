import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { inviteConfig } from "../invite.config";
import { JharokhaPanel } from "../components/JharokhaPanel";
import { revealViewport } from "../hooks/useRevealSafetyNet";

/**
 * Invitation Section (~100svh):
 * Deeper blush band (#EBC4C1).
 *
 * Distinct Animation:
 * - Each line rises from behind an overflow mask (curtain-lift), staggered 0.15s
 * - NIKKAH letter-spacing tightens from 0.6em to 0.3em as it fades in
 * - Reduced motion: simple fade
 * - Progressive enhancement: visible by default in HTML/CSS, animated once mounted.
 */
export const InvitationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const curtainVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const nikkahVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { y: "115%", opacity: 0, letterSpacing: "0.55em" },
    visible: {
      y: "0%",
      opacity: 1,
      letterSpacing: "0.3em",
      transition: {
        duration: shouldReduceMotion ? 0.4 : 0.95,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeInOut",
      },
    },
  };

  return (
    <JharokhaPanel id="invitation-section" variant="deep-blush" className="px-4">
      <motion.div
        initial={isMounted ? "hidden" : "visible"}
        whileInView="visible"
        viewport={revealViewport}
        variants={containerVariants}
        className="w-full max-w-lg flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4"
      >
        {/* 1. Host Line: Curtain-lift from overflow mask */}
        <div className="overflow-hidden py-1 px-2">
          <motion.h2
            variants={curtainVariants}
            data-reveal="invitation-host"
            className="font-body text-xl sm:text-2xl md:text-3xl text-plum font-normal tracking-wide"
          >
            {inviteConfig.hostLine}
          </motion.h2>
        </div>

        {/* 2. "invite you to the": Curtain-lift staggered 0.15s */}
        <div className="overflow-hidden py-0.5">
          <motion.p
            variants={curtainVariants}
            data-reveal="invitation-text"
            className="font-body italic text-base sm:text-lg text-plum/85 tracking-wide"
          >
            {inviteConfig.inviteText}
          </motion.p>
        </div>

        {/* Slender Divider Line */}
        <motion.div
          variants={dividerVariants}
          className="w-full max-w-[200px] sm:max-w-[260px] flex items-center justify-center my-1"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/70" />
          <span className="mx-2.5 text-rose-gold text-[9px] rotate-45 inline-block">◆</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/70" />
        </motion.div>

        {/* 3. "NIKKAH": Curtain-lift with letter-spacing tightening from 0.6em to 0.3em */}
        <div className="overflow-hidden py-1 px-1">
          <motion.h1
            variants={nikkahVariants}
            data-reveal="invitation-title"
            className="font-heading font-normal royal-foil-heading uppercase tracking-[0.3em] text-3xl sm:text-4xl md:text-5xl select-none drop-shadow-sm"
          >
            {inviteConfig.eventTitle}
          </motion.h1>
        </div>

        {/* 4. "of beloved daughter": Curtain-lift staggered 0.15s after NIKKAH */}
        <div className="overflow-hidden py-0.5">
          <motion.p
            variants={curtainVariants}
            data-reveal="invitation-daughter"
            className="font-body italic text-base sm:text-lg text-plum/85 tracking-wide"
          >
            {inviteConfig.daughterLine}
          </motion.p>
        </div>
      </motion.div>
    </JharokhaPanel>
  );
};

export default InvitationSection;
