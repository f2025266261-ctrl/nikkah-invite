import React from "react";

interface MultifoilDividerProps {
  direction?: "to-crimson" | "to-ivory";
  className?: string;
}

/**
 * Curved Scalloped (Multifoil) Divider between alternating color bands:
 * Features Mughal arch scallops with gold-accented cusps and delicate finial diamonds.
 */
export const MultifoilDivider: React.FC<MultifoilDividerProps> = ({
  direction = "to-crimson",
  className = "",
}) => {
  const isToCrimson = direction === "to-crimson";

  return (
    <div
      role="separator"
      className={`relative w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${className}`}
      style={{ height: "48px" }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="scallopGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8935A" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#D9B877" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF2D6" stopOpacity="1" />
            <stop offset="75%" stopColor="#D9B877" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8935A" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {isToCrimson ? (
          <>
            {/* Scalloped fill transitioning into Crimson */}
            <path
              d="M 0 60 L 0 20 
                 Q 50 48, 100 20 
                 Q 150 48, 200 20 
                 Q 250 48, 300 20 
                 Q 350 48, 400 20 
                 Q 450 48, 500 20 
                 Q 550 48, 600 12 
                 Q 650 48, 700 20 
                 Q 750 48, 800 20 
                 Q 850 48, 900 20 
                 Q 950 48, 1000 20 
                 Q 1050 48, 1100 20 
                 Q 1150 48, 1200 20 
                 L 1200 60 Z"
              fill="#6E1F34"
            />
            {/* Scalloped Gold Crest Stroke */}
            <path
              d="M 0 20 
                 Q 50 48, 100 20 
                 Q 150 48, 200 20 
                 Q 250 48, 300 20 
                 Q 350 48, 400 20 
                 Q 450 48, 500 20 
                 Q 550 48, 600 12 
                 Q 650 48, 700 20 
                 Q 750 48, 800 20 
                 Q 850 48, 900 20 
                 Q 950 48, 1000 20 
                 Q 1050 48, 1100 20 
                 Q 1150 48, 1200 20"
              stroke="url(#scallopGoldGrad)"
              strokeWidth="2.2"
              fill="none"
            />
            {/* Center Apex Diamond Accent */}
            <polygon
              points="600,6 605,12 600,18 595,12"
              fill="#D9B877"
              stroke="#B8935A"
              strokeWidth="1"
            />
          </>
        ) : (
          <>
            {/* Scalloped fill transitioning from Crimson back into Ivory */}
            <path
              d="M 0 0 L 0 40 
                 Q 50 12, 100 40 
                 Q 150 12, 200 40 
                 Q 250 12, 300 40 
                 Q 350 12, 400 40 
                 Q 450 12, 500 40 
                 Q 550 12, 600 48 
                 Q 650 12, 700 40 
                 Q 750 12, 800 40 
                 Q 850 12, 900 40 
                 Q 950 12, 1000 40 
                 Q 1050 12, 1100 40 
                 Q 1150 12, 1200 40 
                 L 1200 0 Z"
              fill="#6E1F34"
            />
            {/* Scalloped Gold Crest Stroke */}
            <path
              d="M 0 40 
                 Q 50 12, 100 40 
                 Q 150 12, 200 40 
                 Q 250 12, 300 40 
                 Q 350 12, 400 40 
                 Q 450 12, 500 40 
                 Q 550 12, 600 48 
                 Q 650 12, 700 40 
                 Q 750 12, 800 40 
                 Q 850 12, 900 40 
                 Q 950 12, 1000 40 
                 Q 1050 12, 1100 40 
                 Q 1150 12, 1200 40"
              stroke="url(#scallopGoldGrad)"
              strokeWidth="2.2"
              fill="none"
            />
            {/* Center Apex Diamond Accent */}
            <polygon
              points="600,42 605,48 600,54 595,48"
              fill="#D9B877"
              stroke="#B8935A"
              strokeWidth="1"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default MultifoilDivider;
