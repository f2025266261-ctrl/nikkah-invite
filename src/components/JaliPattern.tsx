import React from "react";

interface JaliPatternProps {
  className?: string;
  opacity?: number;
  strokeColor?: string;
  parallax?: boolean;
}

/**
 * Mughal Jali Geometric Lattice Pattern (8-pointed star & octagon lattice)
 * Renders an inline SVG pattern for pure vector sharpness without external assets.
 */
export const JaliPattern: React.FC<JaliPatternProps> = ({
  className = "",
  opacity = 0.08,
  strokeColor = "#B8935A",
  parallax = true,
}) => {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 transition-opacity duration-700 ${className}`}
      style={{ opacity }}
    >
      <svg
        className={`w-full h-full ${parallax ? "transform transition-transform duration-700 ease-out" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={`jaliPattern-${strokeColor.replace(/[^a-zA-Z0-9]/g, "")}`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star central geometry */}
            <path
              d="M 30 5 L 36 19 L 50 19 L 39 28 L 44 42 L 30 33 L 16 42 L 21 28 L 10 19 L 24 19 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
            {/* Interlacing octagonal lattice ribs */}
            <path
              d="M 0 0 L 15 15 M 60 0 L 45 15 M 0 60 L 15 45 M 60 60 L 45 45"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
            <path
              d="M 30 0 L 30 5 M 0 30 L 10 30 M 50 30 L 60 30 M 30 42 L 30 60"
              stroke={strokeColor}
              strokeWidth="0.7"
            />
            <rect
              x="15"
              y="15"
              width="30"
              height="30"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            {/* Corner diamond accents */}
            <polygon
              points="0,5 5,0 10,5 5,10"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
            />
            <polygon
              points="50,5 55,0 60,5 55,10"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
            />
            <polygon
              points="0,55 5,50 10,55 5,60"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
            />
            <polygon
              points="50,55 55,50 60,55 55,60"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#jaliPattern-${strokeColor.replace(/[^a-zA-Z0-9]/g, "")})`}
        />
      </svg>
    </div>
  );
};
