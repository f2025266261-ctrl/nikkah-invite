import type { ReactNode } from "react";
import React from "react";
import { JaliPattern } from "./JaliPattern";
import { SectionSideLanterns, SectionLanternGarland } from "./LanternGarland";
import { RoyalNiche } from "./RoyalNiche";

interface JharokhaPanelProps {
  id?: string;
  variant?: "ivory" | "crimson" | "blush" | "deep-blush";
  children: ReactNode;
  className?: string;
  withTopDivider?: boolean;
  lanternMode?: "side" | "garland" | "none";
}

/**
 * JharokhaPanel:
 * Frames invitation sections in an authentic Mughal palace setting
 * with section-bound lanterns, gold boundaries, and a real <RoyalNiche>
 * (cusped 5-foil arch, rose-gold foil frame, spandrel arabesques, keystone, plinth base & corner florals).
 */
export const JharokhaPanel: React.FC<JharokhaPanelProps> = ({
  id,
  variant = "ivory",
  children,
  className = "",
  withTopDivider = true,
  lanternMode = "side",
}) => {
  const isCrimson = variant === "crimson";

  return (
    <section
      id={id}
      className={`relative w-full min-h-[90svh] flex flex-col items-center justify-center py-10 sm:py-14 md:py-16 px-3 sm:px-6 transition-colors duration-500 overflow-hidden ${
        isCrimson
          ? "bg-gradient-to-b from-crimson-deep via-crimson to-crimson-deep text-cream paper-grain-crimson"
          : "bg-ivory text-plum paper-grain"
      } ${className}`}
    >
      {/* 0. Section Lanterns (z-0, strictly behind card and text) */}
      {lanternMode === "side" && <SectionSideLanterns />}
      {lanternMode === "garland" && <SectionLanternGarland />}

      {/* 1. Internal Jali Pattern (gold on crimson, subtle gold on ivory) */}
      <JaliPattern
        opacity={isCrimson ? 0.08 : 0.05}
        strokeColor={isCrimson ? "#D9B877" : "#B8935A"}
        parallax={false}
        className="absolute inset-0 z-0"
      />

      {/* 2. Top Boundary Divider (rose-gold diamond divider) */}
      {withTopDivider && (
        <div className="absolute top-0 inset-x-0 flex items-center justify-center -translate-y-1/2 z-20 pointer-events-none select-none">
          <div
            className={`h-[1px] w-28 sm:w-44 md:w-60 bg-gradient-to-r from-transparent ${
              isCrimson ? "to-gold-light" : "to-rose-gold/80"
            }`}
          />
          <span
            className={`mx-3 text-[10px] sm:text-xs rotate-45 inline-block leading-none ${
              isCrimson ? "text-gold-light" : "text-rose-gold"
            }`}
          >
            ◆
          </span>
          <div
            className={`h-[1px] w-28 sm:w-44 md:w-60 bg-gradient-to-l from-transparent ${
              isCrimson ? "to-gold-light" : "to-rose-gold/80"
            }`}
          />
        </div>
      )}

      {/* 3. The Royal Niche (Mughal Palace Jharokha replacing old rounded-rectangle) */}
      <RoyalNiche variant={isCrimson ? "crimson" : "cream"}>
        {children}
      </RoyalNiche>
    </section>
  );
};

export default JharokhaPanel;
