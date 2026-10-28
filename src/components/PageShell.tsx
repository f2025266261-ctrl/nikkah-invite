import type { ReactNode } from "react";
import React from "react";
import { JaliPattern } from "./JaliPattern";

interface PageShellProps {
  children: ReactNode;
}

/**
 * PageShell Component (Mughal Royal Palace):
 * - Ivory paper grain texture with soft radial lighting.
 * - Inset thin gold double-line border.
 * - Warm Mughal jali geometric lattice layer with slow parallax.
 * - Fairy lights draped across top.
 * - Lantern garland with lanterns hanging at various chain lengths.
 * - Centered royal invitation column (max-w-[720px] on laptop).
 */
export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100svh] w-full bg-ivory paper-grain overflow-x-hidden flex flex-col items-center justify-start selection:bg-crimson selection:text-cream">
      {/* 1. Thin Gold Double-Line Border Inset from Viewport Edge */}
      <div className="pointer-events-none fixed inset-2 sm:inset-3 md:inset-4 lg:inset-5 z-40 gold-viewport-border rounded-lg sm:rounded-xl transition-all" />

      {/* 2. Gold Mughal Jali Lattice Layer (8% opacity) */}
      <JaliPattern opacity={0.08} strokeColor="#B8935A" />

      {/* 5. Center Invitation Column */}
      <main className="relative w-full min-h-[100svh] overflow-visible z-10 flex flex-col items-center justify-between pt-0 pb-[env(safe-area-inset-bottom)] px-0">
        <div className="relative z-30 flex-1 flex flex-col items-center w-full py-0">
          {children}
        </div>

        {/* Delicate Footer Mark */}
        <footer className="w-full flex items-center justify-center py-6 pointer-events-none opacity-80 z-30">
          <div className="flex items-center gap-3 text-rose-gold text-xs tracking-[0.3em] font-label font-normal">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-rose-gold" />
            <span className="text-[10px] rotate-45 select-none">◆</span>
            <span>﷽</span>
            <span className="text-[10px] rotate-45 select-none">◆</span>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-rose-gold" />
          </div>
        </footer>
      </main>
    </div>
  );
};
