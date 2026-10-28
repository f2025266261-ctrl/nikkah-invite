import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";
import { inviteConfig } from "../invite.config";
import { useReducedMotion } from "framer-motion";
import { SectionSideLanterns } from "../components/LanternGarland";

gsap.registerPlugin(ScrollTrigger);

function downloadIcsFile() {
  const title = `Nikkah of ${inviteConfig.bride} & ${inviteConfig.groom}`;
  const description = `${inviteConfig.quote}\n\nHost: ${inviteConfig.hostLine}`;
  const location = inviteConfig.venueName;

  // 21 Nov 2026 2:00 PM Asia/Karachi (UTC+5 -> 09:00:00Z)
  const dtStart = "20261121T090000Z";
  const dtEnd = "20261121T120000Z";
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yashfa & Zain//Nikkah Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:nikkah-${Date.now()}@yashfazain.wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Nikkah Ceremony Tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Nikkah_Yashfa_and_Zain.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * 4. DATE — THE ROYAL FARMAN (Signature Moment)
 * Pinned scrubbed stage (~220svh scroll via GSAP ScrollTrigger):
 * - Start: Rolled parchment scroll lies horizontally at center, tied with mauve silk ribbon
 *   and sealed with a rose wax seal stamped with an 8-pointed star (NO letters).
 * - 0.00–0.20: Silk ribbon slides off sideways; wax seal cracks into two halves that drift apart & fade.
 * - 0.20–0.70: Scroll unrolls downward. Top rod stays, bottom rod descends, visible roll at bottom
 *   shrinks with cylinder-shading gradient, paper reveals via clip-path.
 * - 0.70–1.00: Inside a thin rose-gold shamsa border, text writes in with ink-style wipes:
 *   - "دعوت نامہ" / "BY ROYAL INVITATION"
 *   - Weekday ("SATURDAY" derived from eventISO)
 *   - Very large "21" in Great Vibes (mauve)
 *   - "NOVEMBER 2026"
 *   - Diamond divider & "2:00 PM"
 *   - "Add to Calendar" pill fading in last.
 * - Phone: scroll ~84vw wide, ~62svh tall when open. Laptop: ~440px wide.
 * - Reduced motion: static opened scroll.
 */
export const DateTimeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const sealLeftRef = useRef<HTMLDivElement | null>(null);
  const sealRightRef = useRef<HTMLDivElement | null>(null);
  const bottomRodRef = useRef<HTMLDivElement | null>(null);
  const bottomRollRef = useRef<HTMLDivElement | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const shamsaRectRef = useRef<SVGRectElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const weekdayRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const monthRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Calculate weekday from ISO
  const eventDate = new Date(inviteConfig.eventISO);
  const weekdayName = eventDate
    .toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Karachi" })
    .toUpperCase();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    // Set initial states for elements
    gsap.set(ribbonRef.current, { x: 0, opacity: 1 });
    gsap.set(sealLeftRef.current, { x: 0, rotation: 0, opacity: 1 });
    gsap.set(sealRightRef.current, { x: 0, rotation: 0, opacity: 1 });
    gsap.set(bottomRodRef.current, { top: "0%" });
    gsap.set(bottomRollRef.current, { scaleY: 1, opacity: 1 });
    gsap.set(paperRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
    if (shamsaRectRef.current) {
      const len = 1600;
      gsap.set(shamsaRectRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 0,
      });
    }
    gsap.set(headerRef.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 });
    gsap.set(weekdayRef.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 });
    gsap.set(numberRef.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 });
    gsap.set(monthRef.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 });
    gsap.set(timeRef.current, { opacity: 0 });
    gsap.set(btnRef.current, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 0.00 - 0.20: Ribbon slides off & Wax seal cracks apart
    tl.to(ribbonRef.current, { x: 160, opacity: 0, ease: "power1.in", duration: 0.18 }, 0);
    tl.to(sealLeftRef.current, { x: -45, rotation: -20, opacity: 0, ease: "power1.in", duration: 0.18 }, 0.02);
    tl.to(sealRightRef.current, { x: 45, rotation: 20, opacity: 0, ease: "power1.in", duration: 0.18 }, 0.02);

    // 0.20 - 0.70: Unrolling downward
    tl.to(bottomRodRef.current, { top: "calc(100% - 14px)", ease: "power1.inOut", duration: 0.5 }, 0.2);
    tl.to(paperRef.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut", duration: 0.5 }, 0.2);
    tl.to(bottomRollRef.current, { scaleY: 0, opacity: 0, ease: "power1.in", duration: 0.45 }, 0.24);

    // 0.70 - 1.00: Shamsa border draw & Text ink wipes
    if (shamsaRectRef.current) {
      tl.to(shamsaRectRef.current, { strokeDashoffset: 0, opacity: 1, duration: 0.16, ease: "none" }, 0.68);
    }
    tl.to(headerRef.current, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.1, ease: "power1.out" }, 0.72);
    tl.to(weekdayRef.current, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.1, ease: "power1.out" }, 0.76);
    tl.to(numberRef.current, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.12, ease: "power1.out" }, 0.80);
    tl.to(monthRef.current, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.1, ease: "power1.out" }, 0.85);
    tl.to(timeRef.current, { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.89);
    tl.to(btnRef.current, { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" }, 0.92);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      id="datetime-section"
      className="relative w-full h-[220svh] bg-ivory"
    >
      {/* Pinned Stage (100svh via GSAP) */}
      <div
        ref={stageRef}
        className="w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6 select-none relative"
      >
        {/* Laptop only: ONE lantern per side in outer margin beside card/scroll, hung from top on long chain */}
        <SectionSideLanterns />

        {/* Subtle Background Radial Warm Glow */}
        <div className="pointer-events-none absolute w-[90vw] max-w-[520px] h-[65svh] rounded-full bg-radial from-champagne/45 via-blush/25 to-transparent blur-2xl" />

        {/* --- THE FARMAN CONTAINER --- */}
        <div className="relative w-[84vw] max-w-[440px] h-[62svh] min-h-[420px] max-h-[560px] flex flex-col items-center justify-between">
          
          {/* 1. Top Wooden Rod with Rose-Gold Finials (Anchored at top) */}
          <div className="relative z-30 w-full flex items-center justify-between">
            {/* Left Finial */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-rose-gold to-champagne border border-rose-gold/80 shadow-sm flex items-center justify-center -mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
            </div>
            {/* Cylinder Rod Body */}
            <div className="flex-1 h-3 sm:h-3.5 rounded-full bg-gradient-to-b from-champagne via-rose-gold to-[#9C6D5F] border-y border-rose-gold/90 shadow-md relative overflow-hidden">
              <div className="absolute inset-x-0 top-0.5 h-[1px] bg-white/40" />
            </div>
            {/* Right Finial */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-rose-gold to-champagne border border-rose-gold/80 shadow-sm flex items-center justify-center -ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
            </div>
          </div>

          {/* 2. Parchment Paper Field (Revealed via Clip-Path following unrolling) */}
          <div
            ref={paperRef}
            style={shouldReduceMotion ? { clipPath: "none" } : undefined}
            className="relative z-20 w-[95%] flex-1 bg-cream border-x border-champagne/70 shadow-panel overflow-hidden px-3 sm:px-6 py-4 flex flex-col items-center justify-center text-center paper-grain-cream"
          >
            {/* Aged Paper Shading Vignette at Edges */}
            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-champagne/30" />
            
            {/* Shamsa-Style SVG Border Drawing itself */}
            <svg
              viewBox="0 0 360 480"
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="farmanGoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8998A" />
                  <stop offset="50%" stopColor="#E8CFC0" />
                  <stop offset="100%" stopColor="#C8998A" />
                </linearGradient>
              </defs>

              {/* Outer Border */}
              <rect
                ref={shamsaRectRef}
                x="6"
                y="6"
                width="348"
                height="468"
                rx="8"
                stroke="url(#farmanGoldGrad2)"
                strokeWidth="1.2"
                style={shouldReduceMotion ? { opacity: 1 } : undefined}
              />
              {/* Inner Dashed Border */}
              <rect
                x="12"
                y="12"
                width="336"
                height="456"
                rx="6"
                stroke="#C8998A"
                strokeWidth="0.8"
                strokeDasharray="4 3"
                opacity="0.8"
              />

              {/* Shamsa Corner 8-Pointed Khatam Stars */}
              {[
                [18, 18],
                [342, 18],
                [18, 462],
                [342, 462],
              ].map(([cx, cy], i) => (
                <g key={i} transform={`translate(${cx}, ${cy})`}>
                  <rect x="-3" y="-3" width="6" height="6" fill="#C8998A" />
                  <rect x="-3" y="-3" width="6" height="6" fill="#C8998A" transform="rotate(45)" />
                </g>
              ))}
            </svg>

            {/* --- PARCHMENT CONTENT (Ink-style wipe reveals) --- */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto space-y-2 sm:space-y-2.5">
              
              {/* Header: Urdu "دعوت نامہ" & "BY ROYAL INVITATION" */}
              <div
                ref={headerRef}
                style={shouldReduceMotion ? { clipPath: "none", opacity: 1 } : undefined}
                className="flex flex-col items-center pt-1"
              >
                <span className="font-arabic text-lg sm:text-xl text-mauve leading-none drop-shadow-xs">
                  دعوت نامہ
                </span>
                <span className="font-label tracking-[0.3em] text-[10px] sm:text-[11px] uppercase text-rose-gold mt-1">
                  BY ROYAL INVITATION
                </span>
              </div>

              {/* Weekday (derived from eventISO: "SATURDAY") */}
              <div
                ref={weekdayRef}
                style={shouldReduceMotion ? { clipPath: "none", opacity: 1 } : undefined}
              >
                <span className="font-label tracking-[0.35em] text-xs sm:text-sm font-semibold text-plum uppercase">
                  {weekdayName}
                </span>
              </div>

              {/* Large "21" in Great Vibes (mauve) */}
              <div
                ref={numberRef}
                style={shouldReduceMotion ? { clipPath: "none", opacity: 1 } : undefined}
                className="my-[-6px] sm:my-[-10px]"
              >
                <span
                  style={{ fontSize: "clamp(3.8rem, 16vw, 5.5rem)" }}
                  className="font-names royal-foil-heading leading-none drop-shadow-sm select-none"
                >
                  21
                </span>
              </div>

              {/* "NOVEMBER 2026" */}
              <div
                ref={monthRef}
                style={shouldReduceMotion ? { clipPath: "none", opacity: 1 } : undefined}
              >
                <span className="font-body tracking-[0.25em] text-sm sm:text-base font-medium text-plum uppercase">
                  NOVEMBER 2026
                </span>
              </div>

              {/* Slender Diamond Divider */}
              <div className="w-24 sm:w-32 flex items-center justify-center my-0.5">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/60" />
                <span className="mx-2 text-[8px] text-rose-gold rotate-45">◆</span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/60" />
              </div>

              {/* Ceremony Time */}
              <div
                ref={timeRef}
                style={shouldReduceMotion ? { opacity: 1 } : undefined}
              >
                <span className="font-body text-base sm:text-lg text-plum font-normal">
                  {inviteConfig.timeLabel}
                </span>
              </div>

              {/* "Add to Calendar" Pill Button */}
              <div
                ref={btnRef}
                style={shouldReduceMotion ? { opacity: 1, transform: "none" } : undefined}
                className="pt-2 sm:pt-3 pointer-events-auto"
              >
                <button
                  type="button"
                  onClick={downloadIcsFile}
                  className="group relative px-5 sm:px-6 py-2 rounded-full border border-rose-gold/70 text-plum bg-cream/95 hover:bg-cream hover:border-rose-gold font-label text-[10px] sm:text-xs tracking-[0.25em] uppercase font-normal shadow-panel transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-rose-gold" />
                  <span>Add to Calendar</span>
                </button>
              </div>

            </div>
          </div>

          {/* 3. Bottom Wooden Rod with Cylinder Shading (Unrolls downward with scroll) */}
          <div
            ref={bottomRodRef}
            style={shouldReduceMotion ? { top: "calc(100% - 14px)" } : undefined}
            className="absolute z-30 w-full flex items-center justify-between"
          >
            {/* Left Finial */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-rose-gold to-champagne border border-rose-gold/80 shadow-sm flex items-center justify-center -mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
            </div>
            {/* Cylinder Rod Body */}
            <div className="flex-1 h-3 sm:h-3.5 rounded-full bg-gradient-to-b from-champagne via-rose-gold to-[#9C6D5F] border-y border-rose-gold/90 shadow-md relative overflow-hidden">
              <div className="absolute inset-x-0 top-0.5 h-[1px] bg-white/40" />
            </div>
            {/* Right Finial */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-rose-gold to-champagne border border-rose-gold/80 shadow-sm flex items-center justify-center -ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" />
            </div>

            {/* Cylinder-shading bottom paper roll thickness */}
            <div
              ref={bottomRollRef}
              style={shouldReduceMotion ? { display: "none" } : undefined}
              className="pointer-events-none absolute inset-x-2 -bottom-2 h-4 rounded-full bg-gradient-to-b from-[#E8CFC0] via-[#FAF4EB] to-[#C8998A] shadow-md border-t border-champagne"
            />
          </div>

          {/* --- HORIZONTAL TIE OVERLAYS (0.00 - 0.20) --- */}
          {!shouldReduceMotion && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 z-40 flex items-center justify-center">
              {/* Mauve Silk Ribbon wrapped horizontally across cylinder */}
              <div
                ref={ribbonRef}
                className="absolute w-12 sm:w-14 h-8 bg-gradient-to-r from-mauve/90 via-[#C98B98] to-mauve/90 border-y border-rose-gold/60 shadow-md flex flex-col justify-between py-1"
              >
                <div className="w-full h-[1px] bg-white/40" />
                <div className="w-full h-[1px] bg-white/40" />
              </div>

              {/* Rose Wax Seal with 8-Pointed Star (Cracks into two halves) */}
              <div className="absolute flex items-center justify-center w-12 h-12">
                {/* Left Half of Wax Seal */}
                <div
                  ref={sealLeftRef}
                  style={{ clipPath: "inset(0% 50% 0% 0%)" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-crimson to-mauve border-2 border-rose-gold/80 shadow-lg flex items-center justify-center">
                    {/* 8-Pointed Star Seal Impression (NO letters) */}
                    <div className="relative w-4.5 h-4.5 flex items-center justify-center text-rose-gold/90">
                      <div className="absolute w-3.5 h-3.5 border border-rose-gold/80 bg-rose-gold/20" />
                      <div className="absolute w-3.5 h-3.5 border border-rose-gold/80 bg-rose-gold/20 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Right Half of Wax Seal */}
                <div
                  ref={sealRightRef}
                  style={{ clipPath: "inset(0% 0% 0% 50%)" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-crimson to-mauve border-2 border-rose-gold/80 shadow-lg flex items-center justify-center">
                    {/* 8-Pointed Star Seal Impression (NO letters) */}
                    <div className="relative w-4.5 h-4.5 flex items-center justify-center text-rose-gold/90">
                      <div className="absolute w-3.5 h-3.5 border border-rose-gold/80 bg-rose-gold/20" />
                      <div className="absolute w-3.5 h-3.5 border border-rose-gold/80 bg-rose-gold/20 rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default DateTimeSection;
