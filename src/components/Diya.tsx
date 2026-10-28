import React from "react";

interface DiyaProps {
  size?: number;
  className?: string;
  withPetals?: boolean;
}

/**
 * Traditional Brass & Clay Diya (Oil Lamp) with Animated Flickering Flame
 * and scattered crimson rose petals at its base.
 */
export const Diya: React.FC<DiyaProps> = ({
  size = 54,
  className = "",
  withPetals = true,
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-none ${className}`}
      style={{ width: `${size}px` }}
    >
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Diya Brass / Terracotta Gradient */}
          <linearGradient id="diyaBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2C485" />
            <stop offset="35%" stopColor="#B8935A" />
            <stop offset="70%" stopColor="#8E6A36" />
            <stop offset="100%" stopColor="#5E431E" />
          </linearGradient>

          {/* Diya Golden Glow Halo */}
          <radialGradient id="diyaFlameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#F5B942" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#E27D18" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B8935A" stopOpacity="0" />
          </radialGradient>

          {/* Flame Core Gradient */}
          <linearGradient id="flameColor" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="30%" stopColor="#F97316" />
            <stop offset="70%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FFFBEB" />
          </linearGradient>

          {/* Rose Petal Gradient */}
          <radialGradient id="diyaPetalGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
        </defs>

        {/* Scattered Rose Petals at Base */}
        {withPetals && (
          <g id="scattered-petals" opacity="0.9">
            <ellipse cx="18" cy="72" rx="7" ry="3.5" fill="url(#diyaPetalGrad)" transform="rotate(-15, 18, 72)" />
            <ellipse cx="32" cy="76" rx="6" ry="3" fill="url(#diyaPetalGrad)" transform="rotate(25, 32, 76)" />
            <ellipse cx="78" cy="74" rx="7.5" ry="3.8" fill="url(#diyaPetalGrad)" transform="rotate(35, 78, 74)" />
            <ellipse cx="88" cy="70" rx="5.5" ry="2.8" fill="url(#diyaPetalGrad)" transform="rotate(-20, 88, 70)" />
          </g>
        )}

        {/* Flickering Warm Glow Aura */}
        <circle
          cx="50"
          cy="32"
          r="26"
          fill="url(#diyaFlameGlow)"
          className="animate-diya-glow"
        />

        {/* Animated Teardrop Flame */}
        <g className="animate-diya-flame" style={{ transformOrigin: "50px 45px" }}>
          {/* Outer flame */}
          <path
            d="M 50 14 C 44 26 40 34 40 42 C 40 48 44 52 50 52 C 56 52 60 48 60 42 C 60 34 56 26 50 14 Z"
            fill="url(#flameColor)"
            filter="drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))"
          />
          {/* Inner hot white core */}
          <path
            d="M 50 25 C 47 32 45 37 45 42 C 45 45 47 48 50 48 C 53 48 55 45 55 42 C 55 37 53 32 50 25 Z"
            fill="#FFF"
            opacity="0.9"
          />
        </g>

        {/* Diya Bowl (Clay/Brass Body) */}
        {/* Base Pedestal */}
        <path d="M 40 70 L 60 70 L 65 74 L 35 74 Z" fill="#6A4B20" />
        {/* Main Curved Reservoir */}
        <path
          d="M 22 52 C 22 68 78 68 78 52 C 84 48 88 47 92 46 C 88 52 82 58 76 60 C 66 69 34 69 24 60 C 18 58 12 52 8 46 C 12 47 16 48 22 52 Z"
          fill="url(#diyaBowlGrad)"
          stroke="#8E6A36"
          strokeWidth="1.2"
        />
        {/* Diya Rim Lip */}
        <ellipse cx="50" cy="50" rx="28" ry="6" fill="#8E6A36" stroke="#B8935A" strokeWidth="1" />
        <ellipse cx="50" cy="50" rx="24" ry="4" fill="#5E431E" />
        {/* Wick point */}
        <circle cx="50" cy="46" r="2" fill="#2B1D0E" />
      </svg>
    </div>
  );
};
