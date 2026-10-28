import React from "react";

interface SectionDividerProps {
  className?: string;
}

/**
 * Shared section separator:
 * A thin rose-gold line with a small diamond at the centre.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return (
    <div
      role="separator"
      className={`w-full flex items-center justify-center my-0 py-6 pointer-events-none select-none ${className}`}
    >
      <div className="h-[1px] w-24 sm:w-36 md:w-48 bg-gradient-to-r from-transparent to-rose-gold/70" />
      <span className="mx-3 text-rose-gold text-[10px] sm:text-xs rotate-45 inline-block leading-none">
        ◆
      </span>
      <div className="h-[1px] w-24 sm:w-36 md:w-48 bg-gradient-to-l from-transparent to-rose-gold/70" />
    </div>
  );
};

export default SectionDivider;
