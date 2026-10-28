import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloralGarlandProps {
  className?: string;
  stringsCount?: number;
}

/**
 * Hanging Rose and Marigold Strings (Phool ki Ladiyan):
 * Traditional Pakistani wedding floral garland with alternating marigold (genda) blossoms,
 * deep crimson roses, and delicate green leaves swaying gently like hung floral strings.
 */
export const FloralGarland: React.FC<FloralGarlandProps> = ({
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none w-full overflow-visible select-none flex justify-center ${className}`}>
      <svg
        viewBox="0 0 600 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[620px] h-auto overflow-visible drop-shadow-sm"
      >
        <defs>
          {/* Marigold Blossom Petal Gradient */}
          <radialGradient id="marigoldGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          {/* Crimson Rose Blossom Gradient */}
          <radialGradient id="garlandRoseGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="45%" stopColor="#BE123C" />
            <stop offset="85%" stopColor="#881337" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>

          {/* Leaf Green */}
          <linearGradient id="garlandLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#4D7C0F" />
          </linearGradient>

          {/* Reusable Marigold Blossom */}
          <g id="marigold-flower">
            <circle cx="0" cy="0" r="10" fill="url(#marigoldGrad)" />
            {/* Scalloped petals */}
            <path
              d="M -9 0 C -9 -5 -5 -9 0 -9 C 5 -9 9 -5 9 0 C 9 5 5 9 0 9 C -5 9 -9 5 -9 0 Z"
              fill="url(#marigoldGrad)"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#78350F" />
          </g>

          {/* Reusable Rosebud Blossom */}
          <g id="rose-flower">
            <ellipse cx="0" cy="0" rx="9" ry="8" fill="url(#garlandRoseGrad)" />
            <path
              d="M -6 -2 C -6 -7 6 -7 6 -2 C 6 4 -6 4 -6 -2 Z"
              fill="#9F1239"
              stroke="#FDA4AF"
              strokeWidth="0.5"
            />
            <path
              d="M -3 0 C -3 -4 3 -4 3 0 C 3 3 -3 3 -3 0 Z"
              fill="#4C0519"
            />
            {/* Green calyx leaf */}
            <path d="M 0 7 L 3 11 L -3 11 Z" fill="url(#garlandLeaf)" />
          </g>
        </defs>

        {/* Top Horizontal Swag Ribbon */}
        <path
          d="M 20 12 Q 150 25 300 20 Q 450 25 580 12"
          stroke="#D97706"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M 20 12 Q 150 25 300 20 Q 450 25 580 12"
          stroke="#FDA4AF"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* Top Swag Flower Clusters */}
        {[50, 110, 170, 230, 300, 370, 430, 490, 550].map((x, i) => (
          <use
            key={`swag-${i}`}
            href={i % 2 === 0 ? "#marigold-flower" : "#rose-flower"}
            x={x}
            y={14 + Math.sin(i) * 4}
            transform="scale(0.85)"
          />
        ))}

        {/* Vertical Swaying Phool ki Ladiyan Strings */}
        {[
          { x: 75, length: 75, delay: 0, amp: 2.2 },
          { x: 145, length: 110, delay: 0.8, amp: 2.8 },
          { x: 220, length: 90, delay: 0.4, amp: 2.4 },
          { x: 300, length: 125, delay: 1.2, amp: 3.0 },
          { x: 380, length: 90, delay: 0.5, amp: 2.4 },
          { x: 455, length: 110, delay: 0.9, amp: 2.8 },
          { x: 525, length: 75, delay: 0.2, amp: 2.2 },
        ].map((string, sIdx) => {
          const flowerCount = Math.floor(string.length / 18);
          return (
            <g key={`ladi-${sIdx}`} transform={`translate(${string.x}, 20)`}>
              <motion.g
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: [-string.amp, string.amp, -string.amp],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: string.delay,
                }}
                style={{ transformOrigin: "0px 0px" }}
              >
                {/* String thread */}
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={string.length}
                  stroke="#B8935A"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />

                {/* Alternating Marigold and Rose Blossoms */}
                {Array.from({ length: flowerCount }).map((_, fIdx) => {
                  const y = (fIdx + 1) * 18;
                  const isRose = fIdx % 2 === 1;
                  return (
                    <g key={`flower-${fIdx}`} transform={`translate(0, ${y})`}>
                      <use
                        href={isRose ? "#rose-flower" : "#marigold-flower"}
                        transform="scale(0.82)"
                      />
                    </g>
                  );
                })}

                {/* Bottom Golden Bell / Tassel */}
                <circle
                  cx="0"
                  cy={string.length + 6}
                  r="3.5"
                  fill="#B8935A"
                  stroke="#8E6A36"
                  strokeWidth="0.8"
                />
                <path
                  d={`M 0 ${string.length + 9} L 3 ${string.length + 15} L -3 ${string.length + 15} Z`}
                  fill="#B8935A"
                />
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
