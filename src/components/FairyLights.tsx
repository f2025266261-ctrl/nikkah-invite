import React from "react";

/**
 * FairyLights:
 * Draped delicate warm-golden fairy light garlands across the top of the viewport.
 * Features tiny warm dots that softly twinkle with staggered animation delays.
 */
export const FairyLights: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none fixed top-0 inset-x-0 z-30 overflow-hidden h-14 sm:h-18 ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E0" stopOpacity="1" />
            <stop offset="40%" stopColor="#F5B942" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#D98A1B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B8935A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Catenary Wire Swags */}
        <path
          d="M -20 0 Q 75 32 170 0 Q 265 34 360 0 Q 455 32 550 0 Q 645 34 740 0 Q 835 32 930 0 Q 1025 34 1120 0 Q 1170 28 1220 0"
          stroke="#B8935A"
          strokeWidth="0.85"
          opacity="0.55"
          fill="none"
        />

        {/* Swag 2 - lower offset curve */}
        <path
          d="M 60 0 Q 155 38 250 0 Q 345 36 440 0 Q 535 38 630 0 Q 725 36 820 0 Q 915 38 1010 0 Q 1105 36 1200 0"
          stroke="#8E6A36"
          strokeWidth="0.65"
          opacity="0.35"
          fill="none"
        />

        {/* Twinkling Light Bulbs along Curve 1 */}
        {[
          { cx: 30, cy: 15, delay: "0s" },
          { cx: 75, cy: 30, delay: "0.4s" },
          { cx: 120, cy: 18, delay: "1.1s" },
          { cx: 170, cy: 5, delay: "1.6s" },
          { cx: 215, cy: 19, delay: "0.2s" },
          { cx: 265, cy: 32, delay: "0.8s" },
          { cx: 310, cy: 20, delay: "1.4s" },
          { cx: 360, cy: 5, delay: "0.5s" },
          { cx: 410, cy: 20, delay: "1.2s" },
          { cx: 455, cy: 30, delay: "0.3s" },
          { cx: 500, cy: 20, delay: "1.7s" },
          { cx: 550, cy: 5, delay: "0.9s" },
          { cx: 600, cy: 20, delay: "0.1s" },
          { cx: 645, cy: 32, delay: "1.3s" },
          { cx: 690, cy: 20, delay: "0.7s" },
          { cx: 740, cy: 5, delay: "1.5s" },
          { cx: 785, cy: 19, delay: "0.4s" },
          { cx: 835, cy: 30, delay: "1.0s" },
          { cx: 880, cy: 20, delay: "1.8s" },
          { cx: 930, cy: 5, delay: "0.6s" },
          { cx: 975, cy: 20, delay: "0.2s" },
          { cx: 1025, cy: 32, delay: "1.2s" },
          { cx: 1070, cy: 19, delay: "0.8s" },
          { cx: 1120, cy: 5, delay: "1.4s" },
          { cx: 1165, cy: 22, delay: "0.5s" },
        ].map((bulb, i) => (
          <g key={i} className="animate-fairy-twinkle" style={{ animationDelay: bulb.delay }}>
            <circle cx={bulb.cx} cy={bulb.cy} r="6.5" fill="url(#fairyGlow)" />
            <circle cx={bulb.cx} cy={bulb.cy} r="2.2" fill="#FFFBEB" />
          </g>
        ))}
      </svg>
    </div>
  );
};
