import React from "react";

/**
 * PageBorder Component:
 * Thin double rose-gold line (1px outer, 1px inner, 6px apart) inset from the viewport edge
 * with quarter-circle arabesque corner filigree pieces and tiny buds in all four corners.
 */
export const PageBorder: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-2 sm:inset-3 md:inset-4 lg:inset-5 z-40 select-none overflow-visible"
    >
      {/* Outer 1px line */}
      <div className="absolute inset-0 border border-rose-gold/60 rounded-md sm:rounded-lg">
        {/* Inner 1px line (6px apart) */}
        <div className="absolute inset-[5px] sm:inset-[6px] border border-rose-gold/45 rounded-sm sm:rounded-[6px]" />
      </div>

      {/* SVG Corner Filigree Pieces (Quarter-circle Arabesques with Tiny Buds) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="borderFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8CFC0" />
            <stop offset="50%" stopColor="#C8998A" />
            <stop offset="100%" stopColor="#A8705F" />
          </linearGradient>
        </defs>

        {/* Top-Left Corner Filigree */}
        <g transform="translate(6, 6)" stroke="url(#borderFiligreeGrad)" strokeWidth="1">
          {/* Quarter-circle arc */}
          <path d="M 0 32 A 32 32 0 0 1 32 0" strokeDasharray="1.5 1.5" opacity="0.6" />
          <path d="M 0 24 A 24 24 0 0 1 24 0" strokeWidth="1" />
          {/* Arabesque Leaf Tendril */}
          <path d="M 6 22 Q 14 14 22 6 Q 24 12 18 18 Q 12 24 6 22 Z" fill="#C8998A" fillOpacity="0.25" />
          {/* Tiny Bud at Arc Center */}
          <circle cx="16" cy="16" r="2.2" fill="#C8998A" stroke="none" />
          <circle cx="24" cy="0" r="1.5" fill="#E8CFC0" stroke="none" />
          <circle cx="0" cy="24" r="1.5" fill="#E8CFC0" stroke="none" />
        </g>

        {/* Top-Right Corner Filigree */}
        <g transform="translate(100%, 0)">
          <g transform="translate(-6, 6) scale(-1, 1)" stroke="url(#borderFiligreeGrad)" strokeWidth="1">
            <path d="M 0 32 A 32 32 0 0 1 32 0" strokeDasharray="1.5 1.5" opacity="0.6" />
            <path d="M 0 24 A 24 24 0 0 1 24 0" strokeWidth="1" />
            <path d="M 6 22 Q 14 14 22 6 Q 24 12 18 18 Q 12 24 6 22 Z" fill="#C8998A" fillOpacity="0.25" />
            <circle cx="16" cy="16" r="2.2" fill="#C8998A" stroke="none" />
            <circle cx="24" cy="0" r="1.5" fill="#E8CFC0" stroke="none" />
            <circle cx="0" cy="24" r="1.5" fill="#E8CFC0" stroke="none" />
          </g>
        </g>

        {/* Bottom-Left Corner Filigree */}
        <g transform="translate(0, 100%)">
          <g transform="translate(6, -6) scale(1, -1)" stroke="url(#borderFiligreeGrad)" strokeWidth="1">
            <path d="M 0 32 A 32 32 0 0 1 32 0" strokeDasharray="1.5 1.5" opacity="0.6" />
            <path d="M 0 24 A 24 24 0 0 1 24 0" strokeWidth="1" />
            <path d="M 6 22 Q 14 14 22 6 Q 24 12 18 18 Q 12 24 6 22 Z" fill="#C8998A" fillOpacity="0.25" />
            <circle cx="16" cy="16" r="2.2" fill="#C8998A" stroke="none" />
            <circle cx="24" cy="0" r="1.5" fill="#E8CFC0" stroke="none" />
            <circle cx="0" cy="24" r="1.5" fill="#E8CFC0" stroke="none" />
          </g>
        </g>

        {/* Bottom-Right Corner Filigree */}
        <g transform="translate(100%, 100%)">
          <g transform="translate(-6, -6) scale(-1, -1)" stroke="url(#borderFiligreeGrad)" strokeWidth="1">
            <path d="M 0 32 A 32 32 0 0 1 32 0" strokeDasharray="1.5 1.5" opacity="0.6" />
            <path d="M 0 24 A 24 24 0 0 1 24 0" strokeWidth="1" />
            <path d="M 6 22 Q 14 14 22 6 Q 24 12 18 18 Q 12 24 6 22 Z" fill="#C8998A" fillOpacity="0.25" />
            <circle cx="16" cy="16" r="2.2" fill="#C8998A" stroke="none" />
            <circle cx="24" cy="0" r="1.5" fill="#E8CFC0" stroke="none" />
            <circle cx="0" cy="24" r="1.5" fill="#E8CFC0" stroke="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default PageBorder;
