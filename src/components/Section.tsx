import type { ReactNode } from "react";
import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  withSeparator?: boolean;
}

/**
 * Standardized Section wrapper with mobile safe area padding,
 * fluid vertical spacing, and optional rose-gold diamond divider.
 */
export const Section: React.FC<SectionProps> = ({
  id,
  className = "",
  children,
  withSeparator = false,
}) => {
  return (
    <section
      id={id}
      className={`relative w-full px-4 sm:px-6 md:px-8 py-8 md:py-12 flex flex-col items-center justify-center text-center ${className}`}
    >
      {children}

      {withSeparator && (
        <div className="w-full flex items-center justify-center my-6 md:my-8 opacity-75">
          <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-rose-gold/70" />
          <span className="mx-3 text-rose-gold text-[10px] rotate-45 inline-block select-none">◆</span>
          <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-rose-gold/70" />
        </div>
      )}
    </section>
  );
};

export default Section;
