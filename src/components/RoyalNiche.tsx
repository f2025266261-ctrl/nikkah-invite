import type { ReactNode } from "react";
import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Small ornamental header (lotus/diamond flanked by two leaves)
 * placed above each Royal Niche card title.
 */
export const NicheHeaderOrnament: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = "#C8998A", className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 pointer-events-none select-none my-1.5 ${className}`}
    >
      {/* Left Leaf / Tendril */}
      <svg
        viewBox="0 0 32 14"
        className="w-7 h-3 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 32 7 C 22 7, 16 12, 4 10 C 14 6, 20 2, 32 7 Z"
          fill={color}
          opacity="0.85"
        />
        <circle cx="5" cy="5" r="1.5" fill={color} />
        <path
          d="M 18 6 C 14 2, 8 2, 4 4"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Central Star Diamond / Lotus Accent */}
      <div className="relative flex items-center justify-center">
        <span
          className="text-[11px] leading-none rotate-45 inline-block drop-shadow-sm"
          style={{ color }}
        >
          ◆
        </span>
        <span
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#F3DDD0" }}
        />
      </div>

      {/* Right Leaf / Tendril (mirrored) */}
      <svg
        viewBox="0 0 32 14"
        className="w-7 h-3 overflow-visible transform -scale-x-100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 32 7 C 22 7, 16 12, 4 10 C 14 6, 20 2, 32 7 Z"
          fill={color}
          opacity="0.85"
        />
        <circle cx="5" cy="5" r="1.5" fill={color} />
        <path
          d="M 18 6 C 14 2, 8 2, 4 4"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export interface RoyalNicheProps {
  children: ReactNode;
  className?: string;
  variant?: "cream" | "crimson" | "blush";
  withHeaderOrnament?: boolean;
}

/**
 * RoyalNiche: Real Mughal Jharokha / Palace Niche Component
 *
 * SHAPE: Tall cusped multifoil (five-foil / panj-mehrab) arch on top of straight sides.
 * Phone: ~92vw wide, min-height 78svh.
 * Laptop: ~600px wide, min-height 82svh.
 *
 * 8 LAYERS:
 * 1. Soft cast shadow + faint warm radial glow behind the arch.
 * 2. Outer frame: 7px rose-gold FOIL band (#F3DDD0, #C8998A, #A8705F, #E8CFC0) with bevel highlights.
 * 3. 6px cream gap + 1px thin rose-gold inner line.
 * 4. Cream paper (#FBF3EA) with fine grain (feTurbulence 4%), watermark at 5%, and inner shadow.
 * 5. SPANDRELS: triangular corners filled with fine islimi arabesque at 70% opacity.
 * 6. KEYSTONE: 8-pointed khatam star medallion + kalash finial at the apex.
 * 7. BASE: stepped plinth with moulding; laptop gets two slim pillars with capitals at sides.
 * 8. Corner florals: blush-rose clusters with sage leaves and baby's-breath at top-left and bottom-right.
 *
 * LIGHT: top-left light shaft, page vignette, 10 drifting gold-dust specks, and 2 swaying pendants.
 */
export const RoyalNiche: React.FC<RoyalNicheProps> = ({
  children,
  className = "",
  variant = "cream",
  withHeaderOrnament = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const uid = rawId.replace(/[:]/g, "");

  // Palette stays blush, cream, mauve, plum, rose-gold
  const paperBgColor =
    variant === "crimson"
      ? "#6E1F34"
      : variant === "blush"
      ? "#F4D9D6"
      : "#FBF3EA";

  // Main 5-foil cusped arch path in 600 x 840 viewBox
  const archPathD =
    "M 28 788 " +
    "L 28 256 " +
    "C 28 220 70 186 110 192 " +
    "C 130 150 175 106 210 116 " +
    "C 235 70 275 80 300 48 " +
    "C 325 80 365 70 390 116 " +
    "C 425 106 470 150 490 192 " +
    "C 530 186 572 220 572 256 " +
    "L 572 788 " +
    "Z";

  // Inset inner line path (offset by ~7px inward)
  const innerArchPathD =
    "M 35 781 " +
    "L 35 258 " +
    "C 35 224 74 192 112 198 " +
    "C 132 158 174 116 210 125 " +
    "C 236 82 274 90 300 60 " +
    "C 326 90 364 82 390 125 " +
    "C 426 116 468 158 488 198 " +
    "C 526 192 565 224 565 258 " +
    "L 565 781 " +
    "Z";

  // Pre-calculated fixed positions for 10 drifting gold-dust specks
  const dustMotes = [
    { left: "18%", top: "24%", delay: 0, dur: 4.8 },
    { left: "32%", top: "18%", delay: 1.2, dur: 5.5 },
    { left: "45%", top: "30%", delay: 0.6, dur: 5.0 },
    { left: "26%", top: "42%", delay: 2.1, dur: 6.2 },
    { left: "60%", top: "26%", delay: 1.7, dur: 5.2 },
    { left: "38%", top: "54%", delay: 0.9, dur: 4.9 },
    { left: "70%", top: "38%", delay: 2.4, dur: 5.8 },
    { left: "52%", top: "68%", delay: 1.4, dur: 6.5 },
    { left: "22%", top: "62%", delay: 0.3, dur: 5.4 },
    { left: "65%", top: "58%", delay: 1.9, dur: 6.0 },
  ];

  return (
    <div
      className={`relative w-[92vw] max-w-[600px] min-h-[78svh] lg:min-h-[82svh] mx-auto flex flex-col items-center justify-center transition-all ${className}`}
    >
      {/* ============================================================== */}
      {/* LAYER 1: Soft Cast Shadow + Faint Warm Glow Behind the Arch     */}
      {/* ============================================================== */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[48px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255, 227, 184, 0.42) 0%, rgba(244, 217, 214, 0.22) 50%, transparent 75%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-2 inset-y-4 rounded-3xl -z-10"
        style={{
          boxShadow:
            "0 24px 60px -12px rgba(122, 68, 85, 0.22), 0 12px 28px -6px rgba(168, 112, 95, 0.16)",
        }}
      />

      {/* ============================================================== */}
      {/* SVG PALACE NICHE ARCHITECTURE: LAYERS 2 THROUGH 7              */}
      {/* ============================================================== */}
      <svg
        viewBox="0 0 600 840"
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible z-0"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Layer 2: 7px Rose-Gold FOIL Gradient (#F3DDD0, #C8998A, #A8705F, #E8CFC0) */}
          <linearGradient
            id={`foilGrad-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F3DDD0" />
            <stop offset="30%" stopColor="#C8998A" />
            <stop offset="65%" stopColor="#A8705F" />
            <stop offset="85%" stopColor="#E8CFC0" />
            <stop offset="100%" stopColor="#C8998A" />
          </linearGradient>

          {/* Bevel Highlight (Light on top-left) */}
          <linearGradient
            id={`bevelLight-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFF9F5" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F3DDD0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C8998A" stopOpacity="0" />
          </linearGradient>

          {/* Bevel Shadow (Dark on bottom-right) */}
          <linearGradient
            id={`bevelDark-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5E3326" stopOpacity="0" />
            <stop offset="60%" stopColor="#7A4455" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A2E35" stopOpacity="0.8" />
          </linearGradient>

          {/* Plinth Base Metal Moulding Gradient */}
          <linearGradient
            id={`plinthGrad-${uid}`}
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#C8998A" />
            <stop offset="25%" stopColor="#F3DDD0" />
            <stop offset="50%" stopColor="#E8CFC0" />
            <stop offset="75%" stopColor="#C8998A" />
            <stop offset="100%" stopColor="#A8705F" />
          </linearGradient>

          {/* Layer 4: Fine Grain Filter (feTurbulence 4%) */}
          <filter
            id={`paperGrainFilter-${uid}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.78  0 0 0 0 0.60  0 0 0 0 0.54  0 0 0 0.04 0"
              in="noise"
              result="coloredNoise"
            />
            <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
          </filter>

          {/* Layer 4: Faint Rose-Gold Jali Watermark Pattern at 5% opacity */}
          <pattern
            id={`jaliWatermark-${uid}`}
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 18 0 L 36 18 L 18 36 L 0 18 Z"
              fill="none"
              stroke="#C8998A"
              strokeWidth="0.8"
              opacity="0.05"
            />
            <rect
              x="12"
              y="12"
              width="12"
              height="12"
              fill="none"
              stroke="#C8998A"
              strokeWidth="0.6"
              opacity="0.05"
            />
            <rect
              x="12"
              y="12"
              width="12"
              height="12"
              fill="none"
              stroke="#C8998A"
              strokeWidth="0.6"
              transform="rotate(45 18 18)"
              opacity="0.05"
            />
          </pattern>

          {/* Layer 4: Inner Shadow Recess Gradient */}
          <radialGradient
            id={`innerShadowGrad-${uid}`}
            cx="50%"
            cy="42%"
            r="56%"
          >
            <stop offset="68%" stopColor="#7A4455" stopOpacity="0" />
            <stop offset="88%" stopColor="#7A4455" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#5E3326" stopOpacity="0.14" />
          </radialGradient>

          {/* Top-Left Light Shaft Diagonal Gradient */}
          <linearGradient
            id={`lightShaftGrad-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#FBF3EA" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#FBF3EA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------------- */}
        {/* LAYER 5: SPANDRELS (Corner Islimi Arabesque at 70%)       */}
        {/* -------------------------------------------------------- */}
        <g stroke="#C8998A" strokeWidth="1.1" fill="none" opacity="0.70">
          {/* Top-Left Spandrel Arabesque */}
          <g>
            <path d="M 16 230 C 24 165 52 110 115 62 C 165 24 235 12 280 8" />
            <path d="M 52 152 C 34 122 44 94 74 102 C 92 108 88 126 70 128" />
            <path d="M 100 106 C 82 76 102 46 136 60 C 152 68 146 88 126 90" />
            <path d="M 158 68 C 148 38 178 24 208 38 C 224 46 218 64 198 66" />
            <path d="M 210 38 C 230 18 256 16 272 26" />
            {/* Arabesque Buds & Florets */}
            <circle cx="74" cy="102" r="2.2" fill="#E8CFC0" />
            <circle cx="136" cy="60" r="2.2" fill="#E8CFC0" />
            <circle cx="208" cy="38" r="2.2" fill="#E8CFC0" />
            <circle cx="272" cy="26" r="2" fill="#E8CFC0" />
            {/* Secondary Leaf Accents */}
            <path
              d="M 64 135 C 72 130 78 136 74 142 Z"
              fill="#C8998A"
              opacity="0.8"
            />
            <path
              d="M 118 92 C 126 88 132 94 128 100 Z"
              fill="#C8998A"
              opacity="0.8"
            />
            <path
              d="M 186 52 C 194 48 200 54 196 60 Z"
              fill="#C8998A"
              opacity="0.8"
            />
          </g>

          {/* Top-Right Spandrel Arabesque (Mirrored) */}
          <g transform="translate(600, 0) scale(-1, 1)">
            <path d="M 16 230 C 24 165 52 110 115 62 C 165 24 235 12 280 8" />
            <path d="M 52 152 C 34 122 44 94 74 102 C 92 108 88 126 70 128" />
            <path d="M 100 106 C 82 76 102 46 136 60 C 152 68 146 88 126 90" />
            <path d="M 158 68 C 148 38 178 24 208 38 C 224 46 218 64 198 66" />
            <path d="M 210 38 C 230 18 256 16 272 26" />
            <circle cx="74" cy="102" r="2.2" fill="#E8CFC0" />
            <circle cx="136" cy="60" r="2.2" fill="#E8CFC0" />
            <circle cx="208" cy="38" r="2.2" fill="#E8CFC0" />
            <circle cx="272" cy="26" r="2" fill="#E8CFC0" />
            <path
              d="M 64 135 C 72 130 78 136 74 142 Z"
              fill="#C8998A"
              opacity="0.8"
            />
            <path
              d="M 118 92 C 126 88 132 94 128 100 Z"
              fill="#C8998A"
              opacity="0.8"
            />
            <path
              d="M 186 52 C 194 48 200 54 196 60 Z"
              fill="#C8998A"
              opacity="0.8"
            />
          </g>
        </g>

        {/* -------------------------------------------------------- */}
        {/* LAYER 4: CREAM PAPER (#FBF3EA) RECESSED INTERIOR FIELD    */}
        {/* -------------------------------------------------------- */}
        {/* Base Paper Fill (supports cream, blush, crimson) */}
        <path d={archPathD} fill={paperBgColor} />

        {/* Fine Grain Texture Overlay */}
        <path
          d={archPathD}
          fill={paperBgColor}
          filter={`url(#paperGrainFilter-${uid})`}
          opacity="0.95"
        />

        {/* Faint Rose-Gold Jali Watermark (5% opacity) */}
        <path d={archPathD} fill={`url(#jaliWatermark-${uid})`} />

        {/* Recessed Niche Inner Shadow at Edges */}
        <path d={archPathD} fill={`url(#innerShadowGrad-${uid})`} />

        {/* Top-Left Soft Light Shaft */}
        <path d={archPathD} fill={`url(#lightShaftGrad-${uid})`} />

        {/* -------------------------------------------------------- */}
        {/* LAYER 3: 6px CREAM GAP & 1px THIN ROSE-GOLD INNER LINE    */}
        {/* -------------------------------------------------------- */}
        <path
          d={innerArchPathD}
          stroke="#C8998A"
          strokeWidth="1.1"
          strokeDasharray="4 2.5"
          opacity="0.85"
          fill="none"
        />

        {/* -------------------------------------------------------- */}
        {/* LAYER 2: 7px ROSE-GOLD FOIL BAND FRAME WITH BEVEL EDGES  */}
        {/* -------------------------------------------------------- */}
        {/* Dark Bevel Edge (Bottom-right shadow) */}
        <path
          d={archPathD}
          stroke={`url(#bevelDark-${uid})`}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Main 7px Rose-Gold Foil Band */}
        <path
          d={archPathD}
          stroke={`url(#foilGrad-${uid})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Light Bevel Highlight (Top-left 1px sheen) */}
        <path
          d={archPathD}
          stroke={`url(#bevelLight-${uid})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* -------------------------------------------------------- */}
        {/* LAYER 7: STEPPED PLINTH BASE WITH MOULDING               */}
        {/* -------------------------------------------------------- */}
        {/* Stepped Base Moulding (Tier 1: Rose-Gold Band) */}
        <rect
          x="18"
          y="788"
          width="564"
          height="8"
          rx="1"
          fill={`url(#plinthGrad-${uid})`}
          stroke="#A8705F"
          strokeWidth="0.8"
        />
        <line
          x1="20"
          y1="789"
          x2="580"
          y2="789"
          stroke="#FFF5ED"
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* Stepped Plinth Block (Tier 2: Cream stone with chamfer) */}
        <rect
          x="12"
          y="796"
          width="576"
          height="16"
          rx="1.5"
          fill="#F5E8D8"
          stroke="#C8998A"
          strokeWidth="1"
        />
        <rect
          x="24"
          y="800"
          width="552"
          height="8"
          rx="1"
          fill="#FBF3EA"
          stroke="#E8CFC0"
          strokeWidth="0.6"
        />

        {/* Bottom Tier (Tier 3: Ground base with cast shadow) */}
        <rect
          x="6"
          y="812"
          width="588"
          height="14"
          rx="2"
          fill={`url(#plinthGrad-${uid})`}
          stroke="#8C584A"
          strokeWidth="0.8"
        />
        <ellipse
          cx="300"
          cy="832"
          rx="280"
          ry="6"
          fill="#7A4455"
          opacity="0.18"
        />

        {/* Laptop Only: Two Slim Engaged Pillars with Lotus Capitals */}
        <g className="hidden lg:block">
          {/* Left Pillar */}
          <g>
            {/* Capital */}
            <path
              d="M 12 242 L 32 242 L 28 256 L 16 256 Z"
              fill={`url(#plinthGrad-${uid})`}
              stroke="#A8705F"
              strokeWidth="0.8"
            />
            {/* Shaft with fluting */}
            <rect
              x="16"
              y="256"
              width="12"
              height="532"
              fill="#F5E8D8"
              stroke="#C8998A"
              strokeWidth="0.8"
            />
            <line
              x1="20"
              y1="258"
              x2="20"
              y2="786"
              stroke="#E8CFC0"
              strokeWidth="0.8"
            />
            <line
              x1="24"
              y1="258"
              x2="24"
              y2="786"
              stroke="#A8705F"
              strokeWidth="0.6"
              opacity="0.7"
            />
            {/* Base Plinth */}
            <path
              d="M 14 776 L 30 776 L 32 788 L 12 788 Z"
              fill={`url(#plinthGrad-${uid})`}
              stroke="#A8705F"
              strokeWidth="0.8"
            />
          </g>

          {/* Right Pillar */}
          <g transform="translate(600, 0) scale(-1, 1)">
            <path
              d="M 12 242 L 32 242 L 28 256 L 16 256 Z"
              fill={`url(#plinthGrad-${uid})`}
              stroke="#A8705F"
              strokeWidth="0.8"
            />
            <rect
              x="16"
              y="256"
              width="12"
              height="532"
              fill="#F5E8D8"
              stroke="#C8998A"
              strokeWidth="0.8"
            />
            <line
              x1="20"
              y1="258"
              x2="20"
              y2="786"
              stroke="#E8CFC0"
              strokeWidth="0.8"
            />
            <line
              x1="24"
              y1="258"
              x2="24"
              y2="786"
              stroke="#A8705F"
              strokeWidth="0.6"
              opacity="0.7"
            />
            <path
              d="M 14 776 L 30 776 L 32 788 L 12 788 Z"
              fill={`url(#plinthGrad-${uid})`}
              stroke="#A8705F"
              strokeWidth="0.8"
            />
          </g>
        </g>

        {/* -------------------------------------------------------- */}
        {/* LAYER 6: KEYSTONE KHATAM STAR & KALASH APEX FINIAL       */}
        {/* -------------------------------------------------------- */}
        <g transform="translate(300, 48)">
          {/* Kalash Spire Reaching Upward */}
          <line
            x1="0"
            y1="-10"
            x2="0"
            y2="-38"
            stroke={`url(#foilGrad-${uid})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="0" cy="-38" r="2.5" fill="#F3DDD0" />
          <path
            d="M -3 -34 C -5 -30 5 -30 3 -34"
            stroke={`url(#foilGrad-${uid})`}
            strokeWidth="1.4"
            fill="none"
          />

          {/* Kalash Urn Body */}
          <path
            d="M -7 -14 C -9 -22 9 -22 7 -14 C 8 -11 -8 -11 -7 -14 Z"
            fill={`url(#foilGrad-${uid})`}
            stroke="#A8705F"
            strokeWidth="0.8"
          />
          <rect
            x="-8"
            y="-10"
            width="16"
            height="3"
            rx="0.8"
            fill="#E8CFC0"
          />

          {/* Eight-Pointed Khatam Star Medallion */}
          <rect
            x="-9"
            y="-9"
            width="18"
            height="18"
            rx="1.5"
            fill={`url(#foilGrad-${uid})`}
            stroke="#8C584A"
            strokeWidth="1"
            className="filter drop-shadow-sm"
          />
          <rect
            x="-9"
            y="-9"
            width="18"
            height="18"
            rx="1.5"
            transform="rotate(45)"
            fill={`url(#foilGrad-${uid})`}
            stroke="#8C584A"
            strokeWidth="1"
            className="filter drop-shadow-sm"
          />
          {/* Central Gem Highlight */}
          <circle cx="0" cy="0" r="3.5" fill="#FFE3B8" />
          <circle cx="0" cy="0" r="1.5" fill="#7A4455" />
        </g>
      </svg>

      {/* ============================================================== */}
      {/* PHONE ONLY: 2 SWAYING PENDANTS (Suspended from spandrel eaves)  */}
      {/* ============================================================== */}
      <div className="absolute top-[21%] inset-x-4 sm:inset-x-6 flex justify-between pointer-events-none z-10 lg:hidden">
        {/* Left Pendant */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: [-2.2, 2.2, -2.2] }
          }
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
          className="flex flex-col items-center"
        >
          <div className="w-[1px] h-6 bg-gradient-to-b from-rose-gold to-rose-gold/60" />
          <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-b from-[#F3DDD0] via-[#C8998A] to-[#A8705F] border border-rose-gold/80 shadow-sm" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#E8CFC0] -mt-0.5" />
        </motion.div>

        {/* Right Pendant */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { rotate: [2.2, -2.2, 2.2] }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          style={{ transformOrigin: "top center" }}
          className="flex flex-col items-center"
        >
          <div className="w-[1px] h-6 bg-gradient-to-b from-rose-gold to-rose-gold/60" />
          <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-b from-[#F3DDD0] via-[#C8998A] to-[#A8705F] border border-rose-gold/80 shadow-sm" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#E8CFC0] -mt-0.5" />
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 10 DRIFTING GOLD-DUST MOTES ACROSS LIGHT SHAFT                  */}
      {/* ============================================================== */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
          {dustMotes.map((mote, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FFE3B8] blur-[0.6px]"
              style={{
                left: mote.left,
                top: mote.top,
                boxShadow: "0 0 6px 1px rgba(255, 227, 184, 0.75)",
              }}
              animate={{
                y: [-8, 8, -8],
                x: [-4, 5, -4],
                opacity: [0.2, 0.85, 0.2],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: mote.dur,
                delay: mote.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* LAYER 8: CORNER FLORALS TUCKED OVER THE FRAME                  */}
      {/* ============================================================== */}
      {/* Top-Left Floral Cluster: blush-roses & sage leaves tucked over frame shoulder */}
      <div className="pointer-events-none absolute top-[14%] sm:top-[16%] -left-2 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 z-30 select-none overflow-visible">
        <img
          src="/assets/decor/florals.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-md"
          onError={(e) => {
            // Graceful fallback to SVG if image not yet loaded
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Bottom-Right Floral Cluster: nestled over plinth moulding */}
      <div className="pointer-events-none absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 z-30 select-none overflow-visible transform rotate-180">
        <img
          src="/assets/decor/florals.webp"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-md"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* CONTENT RECESSED INSIDE THE NICHE (Vertically Centered)        */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-14 pt-28 sm:pt-36 pb-14 sm:pb-20 my-auto">
        {withHeaderOrnament && <NicheHeaderOrnament />}
        {children}
      </div>
    </div>
  );
};

export default RoyalNiche;
