import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface LanternProps {
  /** Width class or pixel style, e.g. 70 or "w-16" */
  size?: number | string;
  /** Whether warm candle flame glow pulses inside */
  glow?: boolean;
  /** Delay before pendulum swing starts (in seconds) */
  swingDelay?: number;
  /** Degrees of swing amplitude (default 3 for gentle swing ±3°) */
  swingAmplitude?: number;
  /** Length of top chain in SVG units (default 40) */
  chainLength?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Rich, realistic royal Mughal Lantern (Fanoos):
 * - Rose-gold metal body (#A8705F, #C8998A, #E8CFC0)
 * - Cusped Mughal cap with tiered finials
 * - Glass panels with warm inner glow (#FFE3B8 at 40%) and delicate candle flicker
 * - Fine jali cut-outs and metallic chamfered ribs
 * - Hanging silk tassel with binding ring and thread fringe
 * - Soft halo radiance and subtle ground shadow
 * - Gentle pendulum swing (±3°) with staggered phase
 */
export const Lantern: React.FC<LanternProps> = ({
  size = 70,
  glow = true,
  swingDelay = 0,
  swingAmplitude = 3,
  chainLength = 40,
  className = "",
  style,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const widthStyle = typeof size === "number" ? `${size}px` : size;
  const uid = React.useId().replace(/:/g, "");

  const totalHeight = 240 + chainLength;
  const capY = chainLength + 20;

  return (
    <motion.div
      className={`relative inline-block origin-top select-none pointer-events-none ${className}`}
      style={{ width: widthStyle, ...style }}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotate: [-swingAmplitude, swingAmplitude, -swingAmplitude],
            }
      }
      transition={{
        duration: 5.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: swingDelay,
      }}
    >
      <svg
        viewBox={`0 0 100 ${totalHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto filter drop-shadow-[0_8px_16px_rgba(122,68,85,0.18)]"
      >
        <defs>
          {/* 1. Rose-gold metal body gradients (#A8705F, #C8998A, #E8CFC0) */}
          <linearGradient id={`metalHighlight-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8CFC0" />
            <stop offset="45%" stopColor="#C8998A" />
            <stop offset="100%" stopColor="#A8705F" />
          </linearGradient>

          <linearGradient id={`metalShade-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8705F" />
            <stop offset="50%" stopColor="#8C584A" />
            <stop offset="100%" stopColor="#5E3326" />
          </linearGradient>

          <linearGradient id={`metalRim-${uid}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E8CFC0" />
            <stop offset="35%" stopColor="#C8998A" />
            <stop offset="75%" stopColor="#A8705F" />
            <stop offset="100%" stopColor="#6E3B2E" />
          </linearGradient>

          {/* 2. Warm soft halo glow (#FFE3B8 at 40% opacity) */}
          <radialGradient id={`softHalo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE3B8" stopOpacity="0.40" />
            <stop offset="45%" stopColor="#FFE3B8" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#FFE3B8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFE3B8" stopOpacity="0" />
          </radialGradient>

          {/* Warm internal candle radiance */}
          <radialGradient id={`warmGlow-${uid}`} cx="48%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FFE3B8" stopOpacity="0.80" />
            <stop offset="65%" stopColor="#F5B895" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#C8998A" stopOpacity="0" />
          </radialGradient>

          {/* Soft ground shadow under lantern */}
          <radialGradient id={`groundShadow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7A4455" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#7A4455" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7A4455" stopOpacity="0" />
          </radialGradient>

          {/* Frosted beveled glass facets with warm inner glow (#FFE3B8 at 40%) */}
          <linearGradient id={`glassGradLeft-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE3B8" stopOpacity="0.40" />
            <stop offset="60%" stopColor="#FDE6D5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E8BBA8" stopOpacity="0.30" />
          </linearGradient>

          <linearGradient id={`glassGradCenter-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.65" />
            <stop offset="40%" stopColor="#FFE3B8" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#F5CBB8" stopOpacity="0.30" />
          </linearGradient>

          <linearGradient id={`glassGradRight-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE3B8" stopOpacity="0.40" />
            <stop offset="60%" stopColor="#E8BBA8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C88E7B" stopOpacity="0.28" />
          </linearGradient>

          {/* Candle core glow filter */}
          <filter id={`flameBlur-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Thin Chain Links */}
        <g stroke={`url(#metalHighlight-${uid})`} strokeWidth="1.2">
          {Array.from({ length: Math.max(1, Math.floor(chainLength / 7)) }).map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy={4 + i * 7}
              rx="2.2"
              ry="3.8"
              fill="none"
              stroke={`url(#metalHighlight-${uid})`}
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* 2. Top Hanging Ring */}
        <circle
          cx="50"
          cy={chainLength + 4}
          r="5"
          fill="none"
          stroke={`url(#metalHighlight-${uid})`}
          strokeWidth="1.8"
        />
        <circle
          cx="50"
          cy={chainLength + 4}
          r="2.2"
          fill={`url(#metalHighlight-${uid})`}
        />

        {/* 3. Finial Spire & Crescent Crown */}
        <path
          d={`M 50 ${chainLength + 8} L 50 ${capY - 6}`}
          stroke={`url(#metalHighlight-${uid})`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy={chainLength + 11}
          r="2"
          fill={`url(#metalHighlight-${uid})`}
        />
        <path
          d={`M 48 ${chainLength + 6} C 46 ${chainLength + 10} 54 ${chainLength + 10} 52 ${chainLength + 6} C 50 ${chainLength + 8} 49 ${chainLength + 7} 48 ${chainLength + 6} Z`}
          fill={`url(#metalHighlight-${uid})`}
        />

        {/* 4. Cusped Mughal Cap with scalloped ogee arches */}
        {/* Upper Tier Cupola with cusped arch contours */}
        <path
          d={`M 40 ${capY - 4} C 43 ${capY - 12} 47 ${capY - 14} 50 ${capY - 15} C 53 ${capY - 14} 57 ${capY - 12} 60 ${capY - 4} L 63 ${capY} L 37 ${capY} Z`}
          fill={`url(#metalHighlight-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />
        {/* Cusped Middle Dome with scalloped eaves */}
        <path
          d={`M 26 ${capY + 12} C 31 ${capY + 6} 36 ${capY + 9} 42 ${capY + 3} C 46 ${capY} 50 ${capY - 2} 50 ${capY - 2} C 50 ${capY - 2} 54 ${capY} 58 ${capY + 3} C 64 ${capY + 9} 69 ${capY + 6} 74 ${capY + 12} Z`}
          fill={`url(#metalHighlight-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="1"
        />
        {/* Cap Scalloped Eaves / Cornice Molding */}
        <rect
          x="23"
          y={capY + 12}
          width="54"
          height="4.5"
          rx="1"
          fill={`url(#metalRim-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />

        {/* 5. External Soft Halo & Warm Candle Glow with Flicker */}
        {glow && (
          <g>
            {/* Soft Ambient Radiance Halo (#FFE3B8 at 40% opacity) */}
            <circle
              cx="50"
              cy={capY + 54}
              r="48"
              fill={`url(#softHalo-${uid})`}
              className="animate-[pulse_3.5s_ease-in-out_infinite]"
            />
            {/* Warm Candle Glow */}
            <circle
              cx="50"
              cy={capY + 54}
              r="28"
              fill={`url(#warmGlow-${uid})`}
              className="animate-[pulse_2.2s_ease-in-out_infinite]"
              style={{ filter: "blur(4px)" }}
            />
            {/* Candle Core Flame with gentle flicker */}
            <ellipse
              cx="50"
              cy={capY + 58}
              rx="3"
              ry="7"
              fill="#FFFDF0"
              filter={`url(#flameBlur-${uid})`}
              className="animate-[pulse_1.6s_ease-in-out_infinite]"
            />
            <ellipse
              cx="50"
              cy={capY + 56}
              rx="1.5"
              ry="4"
              fill="#F9B872"
            />
          </g>
        )}

        {/* 6. Glass Facets (Left, Center, Right) */}
        <path
          d={`M 25 ${capY + 16.5} L 38 ${capY + 16.5} L 36 ${capY + 88} L 28 ${capY + 88} L 18 ${capY + 68} Z`}
          fill={`url(#glassGradLeft-${uid})`}
        />
        <path
          d={`M 38 ${capY + 16.5} L 62 ${capY + 16.5} L 64 ${capY + 88} L 36 ${capY + 88} Z`}
          fill={`url(#glassGradCenter-${uid})`}
        />
        <path
          d={`M 62 ${capY + 16.5} L 75 ${capY + 16.5} L 82 ${capY + 68} L 72 ${capY + 88} L 64 ${capY + 88} Z`}
          fill={`url(#glassGradRight-${uid})`}
        />

        {/* 7. Fine Jali Cut-outs & Lattice Filigree */}
        <g stroke="#C8998A" strokeWidth="0.8" opacity="0.65">
          {/* Multifoil cusped arch on center glass */}
          <path
            d={`M 40 ${capY + 45} C 40 ${capY + 28} 45 ${capY + 22} 50 ${capY + 20} C 55 ${capY + 22} 60 ${capY + 28} 60 ${capY + 45}`}
            fill="none"
            strokeWidth="1"
          />
          <path
            d={`M 43 ${capY + 45} C 43 ${capY + 32} 47 ${capY + 26} 50 ${capY + 24} C 53 ${capY + 26} 57 ${capY + 32} 57 ${capY + 45}`}
            fill="none"
            strokeDasharray="1.5 1.5"
          />
          {/* Delicate diamond mesh */}
          <path
            d={`M 41 ${capY + 48} L 50 ${capY + 39} L 59 ${capY + 48} L 50 ${capY + 57} Z`}
            fill="none"
          />
          <path
            d={`M 41 ${capY + 66} L 50 ${capY + 57} L 59 ${capY + 66} L 50 ${capY + 75} Z`}
            fill="none"
          />
          <path d={`M 50 ${capY + 75} L 50 ${capY + 88}`} fill="none" />
        </g>

        {/* Side Panel Jali Ribs */}
        <g stroke="#C8998A" strokeWidth="0.6" opacity="0.5">
          <path d={`M 26 ${capY + 35} L 37 ${capY + 45}`} />
          <path d={`M 23 ${capY + 52} L 36 ${capY + 62}`} />
          <path d={`M 63 ${capY + 45} L 74 ${capY + 35}`} />
          <path d={`M 64 ${capY + 62} L 77 ${capY + 52}`} />
        </g>

        {/* 8. Structural Metal Ribs & Bevel Framework */}
        <path
          d={`M 24 ${capY + 16.5} L 17 ${capY + 68} L 27 ${capY + 88} L 73 ${capY + 88} L 83 ${capY + 68} L 76 ${capY + 16.5} Z`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="1.6"
          fill="none"
        />

        {/* Vertical Separator Ribs */}
        <line
          x1="38"
          y1={capY + 16.5}
          x2="36"
          y2={capY + 88}
          stroke={`url(#metalHighlight-${uid})`}
          strokeWidth="1.8"
        />
        <line
          x1="38.8"
          y1={capY + 16.5}
          x2="36.8"
          y2={capY + 88}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />
        <line
          x1="62"
          y1={capY + 16.5}
          x2="64"
          y2={capY + 88}
          stroke={`url(#metalHighlight-${uid})`}
          strokeWidth="1.8"
        />
        <line
          x1="62.8"
          y1={capY + 16.5}
          x2="64.8"
          y2={capY + 88}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />

        {/* Top-left Highlight Sheen on Left Corner */}
        <line
          x1="24"
          y1={capY + 17}
          x2="17.5"
          y2={capY + 67}
          stroke="#FCECDC"
          strokeWidth="1.2"
        />

        {/* 9. Proper Stepped Base Plinth */}
        <rect
          x="26"
          y={capY + 88}
          width="48"
          height="4.5"
          rx="1"
          fill={`url(#metalRim-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />
        <path
          d={`M 29 ${capY + 92.5} L 36 ${capY + 105} L 64 ${capY + 105} L 71 ${capY + 92.5} Z`}
          fill={`url(#metalHighlight-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="1"
        />
        <rect
          x="35"
          y={capY + 105}
          width="30"
          height="3"
          rx="0.8"
          fill={`url(#metalRim-${uid})`}
        />

        {/* 10. Bottom Hanging Tassel & Pendant */}
        {/* Pendant Drop Stem */}
        <line
          x1="50"
          y1={capY + 108}
          x2="50"
          y2={capY + 116}
          stroke={`url(#metalHighlight-${uid})`}
          strokeWidth="1.6"
        />
        {/* Tassel Cap Bead */}
        <circle
          cx="50"
          cy={capY + 118}
          r="3"
          fill={`url(#metalHighlight-${uid})`}
          stroke={`url(#metalShade-${uid})`}
          strokeWidth="0.8"
        />
        {/* Tassel Binding Ring */}
        <rect
          x="47"
          y={capY + 121}
          width="6"
          height="2.5"
          rx="0.8"
          fill="#C8998A"
        />
        {/* Hanging Silk Tassel Skirt / Fringe */}
        <path
          d={`M 47 ${capY + 123.5} L 43 ${capY + 140} L 57 ${capY + 140} L 53 ${capY + 123.5} Z`}
          fill={`url(#metalHighlight-${uid})`}
          fillOpacity="0.85"
        />
        {/* Individual silk thread accents */}
        <g stroke="#E8CFC0" strokeWidth="0.6" opacity="0.85">
          <line x1="45" y1={capY + 125} x2="43.5" y2={capY + 140} />
          <line x1="47.5" y1={capY + 124} x2="46.5" y2={capY + 140} />
          <line x1="50" y1={capY + 124} x2="50" y2={capY + 140} />
          <line x1="52.5" y1={capY + 124} x2="53.5" y2={capY + 140} />
          <line x1="55" y1={capY + 125} x2="56.5" y2={capY + 140} />
        </g>

        {/* 11. Soft Ground Shadow Below Tassel */}
        <ellipse
          cx="50"
          cy={totalHeight - 6}
          rx="26"
          ry="3.8"
          fill={`url(#groundShadow-${uid})`}
        />
      </svg>
    </motion.div>
  );
};

export default Lantern;
