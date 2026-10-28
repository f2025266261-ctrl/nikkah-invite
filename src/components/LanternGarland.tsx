import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Lantern } from "./Lantern";
import { useIsDesktopPointer } from "../hooks/useMediaQuery";

/**
 * Hanging Garland of 5 lanterns (phone: 3) for Hero and Closing sections ONLY.
 * - Varied sizes (small, medium, large)
 * - Varied chain lengths
 * - Staggered swing phases
 * - Positioned INSIDE section, z-0 behind cards/text, never overlapping content.
 */
export const SectionLanternGarland: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const isDesktopPointer = useIsDesktopPointer();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 24 });

  useEffect(() => {
    if (!isDesktopPointer) return;
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 12;
      const normY = (e.clientY / window.innerHeight - 0.5) * 8;
      mouseX.set(normX);
      mouseY.set(normY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktopPointer, mouseX, mouseY]);

  return (
    <div
      className={`pointer-events-none absolute top-0 inset-x-0 z-0 flex items-start justify-between px-3 sm:px-6 md:px-12 lg:px-16 overflow-visible ${className}`}
    >
      {/* --- Phone / Tablet: Garland of 3 Lanterns (Hidden on Laptop >= 1024px) --- */}
      <div className="w-full flex lg:hidden items-start justify-between overflow-visible">
        {/* 1. Left (Medium, chain 28) */}
        <div className="flex-shrink-0">
          <Lantern
            size={52}
            chainLength={28}
            swingDelay={0}
            swingAmplitude={2.6}
            glow
          />
        </div>

        {/* 2. Center-top (Small, high chain 14 - keeps >24px clear of card) */}
        <div className="flex-shrink-0">
          <Lantern
            size={42}
            chainLength={14}
            swingDelay={0.9}
            swingAmplitude={2.2}
            glow
          />
        </div>

        {/* 3. Right (Large, chain 36) */}
        <div className="flex-shrink-0">
          <Lantern
            size={60}
            chainLength={36}
            swingDelay={1.8}
            swingAmplitude={3.0}
            glow
          />
        </div>
      </div>

      {/* --- Laptop: Garland of 5 Lanterns with Varied Sizes & Chains (Hidden on Phone/Tablet) --- */}
      <motion.div
        className="w-full hidden lg:flex items-start justify-between overflow-visible"
        style={isDesktopPointer ? { x: smoothX, y: smoothY } : undefined}
      >
        {/* 1. Far Left (Medium, chain 38) */}
        <Lantern
          size={68}
          chainLength={38}
          swingDelay={0}
          swingAmplitude={2.4}
          glow
        />

        {/* 2. Mid Left (Large, chain 58) */}
        <Lantern
          size={84}
          chainLength={58}
          swingDelay={0.8}
          swingAmplitude={3.0}
          glow
        />

        {/* 3. Center (Small, short chain 18 - stays high above card/arch) */}
        <Lantern
          size={50}
          chainLength={18}
          swingDelay={1.5}
          swingAmplitude={2.0}
          glow
        />

        {/* 4. Mid Right (Large, chain 66) */}
        <Lantern
          size={82}
          chainLength={66}
          swingDelay={2.2}
          swingAmplitude={3.2}
          glow
        />

        {/* 5. Far Right (Medium, chain 44) */}
        <Lantern
          size={70}
          chainLength={44}
          swingDelay={1.1}
          swingAmplitude={2.5}
          glow
        />
      </motion.div>
    </div>
  );
};

/**
 * Side Lanterns for all other sections (Invitation, Names, DateTime, Countdown, Venue, DressCode).
 * - Laptop only: ONE lantern per side in outer margin, beside the card (not above it), hung on long chain.
 * - Phone: NO lanterns in these sections (ornament lives in card frame instead).
 * - Positioned INSIDE section, z-0 behind cards/text, >24px clear of any content.
 */
export const SectionSideLanterns: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const isDesktopPointer = useIsDesktopPointer();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  useEffect(() => {
    if (!isDesktopPointer) return;
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 8;
      const normY = (e.clientY / window.innerHeight - 0.5) * 6;
      mouseX.set(normX);
      mouseY.set(normY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktopPointer, mouseX, mouseY]);

  return (
    <div
      className={`pointer-events-none absolute top-0 inset-x-0 h-full hidden lg:flex items-start justify-between px-6 xl:px-14 2xl:px-20 z-0 overflow-visible ${className}`}
    >
      {/* Left side lantern hung from top edge on long chain */}
      <motion.div
        className="flex-shrink-0"
        style={isDesktopPointer ? { x: smoothX, y: smoothY } : undefined}
      >
        <Lantern
          size={72}
          chainLength={72}
          swingDelay={0}
          swingAmplitude={2.5}
          glow
        />
      </motion.div>

      {/* Right side lantern hung from top edge on long chain */}
      <motion.div
        className="flex-shrink-0"
        style={isDesktopPointer ? { x: smoothX, y: smoothY } : undefined}
      >
        <Lantern
          size={76}
          chainLength={90}
          swingDelay={1.4}
          swingAmplitude={2.8}
          glow
        />
      </motion.div>
    </div>
  );
};
