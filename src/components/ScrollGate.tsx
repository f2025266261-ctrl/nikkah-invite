import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { inviteConfig } from "../invite.config";
import { useMusic } from "./MusicProvider";
import { useLenisInstance } from "../hooks/useLenisScroll";
import { usePrefersReducedMotion, useMediaQuery } from "../hooks/useMediaQuery";
import { HeroSection } from "../sections/HeroSection";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollGate Component:
 * Cinematic scroll-driven grand Mughal gate that opens as the user scrolls.
 *
 * Structure:
 * - Tall scroll container (400svh on phone, 350svh on laptop) holding a pinned 100svh stage.
 * - GSAP ScrollTrigger (pin: true, scrub: 1, anticipatePin: 1).
 * - Layers back-to-front:
 *   1. REVEALED SCENE: the existing Hero component (arch, Bismillah, lanterns, dust). Starts scale 0.82, blur 6px, dimmed.
 *   2. LIGHT BURST: radial gold glow + rotating conic god-rays.
 *   3. GATE FRAME: grand Mughal multifoil sandstone & gold doorway with chhatris, kalash finials, Bismillah lintel, and "Y & Z" apex cartouche.
 *   4. TWO DOORS: 3D perspective inward swing (-105deg / +105deg), crimson gradient, gold studs, jali lattice, meeting rib, lotus knockers, damask texture.
 *   5. CENTRAL SEAL: gold sunburst medallion engraved "Y & Z" that spins and shrinks away at 0.00-0.10.
 *   6. Hanging lanterns (2 on phone, 4 on laptop) drifting apart on dolly-in.
 *   7. Gold dust and rose petals burst at 0.85-1.00.
 */
export const ScrollGate: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const lightBurstRef = useRef<HTMLDivElement | null>(null);
  const godRaysRef = useRef<HTMLDivElement | null>(null);
  const gateFrameRef = useRef<HTMLDivElement | null>(null);
  const doorsContainerRef = useRef<HTMLDivElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const leftShadeRef = useRef<SVGPathElement | null>(null);
  const rightShadeRef = useRef<SVGPathElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const musicBtnRef = useRef<HTMLDivElement | null>(null);
  const petalBurstCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { playMusic } = useMusic();
  const lenis = useLenisInstance();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  const [, setHasStartedMusic] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Auto-open function with smooth scroll and music
  const triggerAutoOpen = useCallback(() => {
    if (isTapped) return;
    setIsTapped(true);

    // 1. Button fades out with a small scale-down
    if (musicBtnRef.current) {
      gsap.to(musicBtnRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.45,
        ease: "power2.out",
        pointerEvents: "none",
      });
    }

    // 2. Start music at low volume with 2 second fade in
    playMusic();
    setHasStartedMusic(true);

    // 3. Scroll to the end of the gate container
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetY = container.offsetTop + container.offsetHeight - window.innerHeight;

    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  }, [isTapped, lenis, playMusic]);

  // Keyboard navigation on closed gate: Space / Enter / ArrowDown triggers auto-open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY < 80) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          triggerAutoOpen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerAutoOpen]);

  // Petal burst canvas for progress 0.85 - 1.00
  const triggerPetalBurst = useCallback(() => {
    const canvas = petalBurstCanvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const count = isLaptop ? 14 : 8;
    const petalColors = [
      "176, 107, 126", // mauve
      "235, 196, 193", // deep blush
      "200, 153, 138", // rose gold
      "244, 217, 214", // blush
    ];

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -50,
        size: Math.random() * 4 + 3.5,
        speedY: Math.random() * 2 + 1.2,
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.35 + 0.3,
        color: petalColors[i % petalColors.length],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    }

    let frameId: number;
    const startTime = Date.now();
    const duration = 2200;

    const render = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const alpha = Math.max(0, 1 - elapsed / duration);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.25, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity * alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${p.color}, 0.25)`;
        ctx.fill();

        ctx.restore();
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [isLaptop, prefersReducedMotion]);

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scrollContainer = scrollContainerRef.current;
    const pinnedStage = pinnedStageRef.current;
    if (!scrollContainer || !pinnedStage) return;

    // Reset initial styles
    gsap.set(heroWrapperRef.current, {
      scale: 0.82,
      filter: "blur(6px) brightness(0.65)",
    });
    gsap.set(lightBurstRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(gateFrameRef.current, { scale: 1, opacity: 1 });
    gsap.set(doorsContainerRef.current, { scale: 1, opacity: 1 });
    gsap.set(leftDoorRef.current, { rotateY: 0, transformOrigin: "left center" });
    gsap.set(rightDoorRef.current, { rotateY: 0, transformOrigin: "right center" });
    gsap.set([leftShadeRef.current, rightShadeRef.current], { opacity: 0 });
    gsap.set(sealRef.current, { scale: 1, rotation: 0, opacity: 1 });
    gsap.set(hintRef.current, { opacity: 0, y: 0 });
    gsap.set(musicBtnRef.current, { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" });

    let hasBurst = false;

    // Build timeline scrubbed from 0 to 1
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedStage,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          // Toggle will-change only while pinned for 60fps on mid-range phones
          const elements = [
            heroWrapperRef.current,
            gateFrameRef.current,
            leftDoorRef.current,
            rightDoorRef.current,
            doorsContainerRef.current,
            sealRef.current,
          ];
          elements.forEach((el) => {
            if (el) {
              el.style.willChange = self.isActive ? "transform, opacity" : "auto";
            }
          });
        },
        onUpdate: (self) => {
          // Trigger petal burst once as progress passes 0.85
          if (self.progress >= 0.85 && !hasBurst && self.direction > 0) {
            hasBurst = true;
            triggerPetalBurst();
          } else if (self.progress < 0.80) {
            hasBurst = false;
          }
        },
      },
    });

    // 0.00 - 0.08: Music Button fades out with small scale-down; Seal glows, spins, shrinks and fades
    tl.to(
      musicBtnRef.current,
      { opacity: 0, scale: 0.94, pointerEvents: "none", duration: 0.08, ease: "power1.out" },
      0.00
    );
    tl.to(
      sealRef.current,
      {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.10,
        ease: "power2.in",
      },
      0.00
    );

    // 0.10 - 0.65: Doors swing INWARD with true perspective (perspective: 1400px)
    // Left door rotateY 0 to -105deg, Right door rotateY 0 to +105deg
    tl.to(
      leftDoorRef.current,
      { rotateY: -105, duration: 0.55, ease: "power2.inOut" },
      0.10
    );
    tl.to(
      rightDoorRef.current,
      { rotateY: 105, duration: 0.55, ease: "power2.inOut" },
      0.10
    );

    // Door faces darken as they swing away from light
    tl.to(
      [leftShadeRef.current, rightShadeRef.current],
      { opacity: 0.72, duration: 0.55, ease: "power2.inOut" },
      0.10
    );

    // Light burst & god-rays intensify through widening gap
    tl.to(
      lightBurstRef.current,
      { opacity: 1, scale: 1.35, duration: 0.55, ease: "power2.inOut" },
      0.10
    );
    if (godRaysRef.current) {
      tl.to(
        godRaysRef.current,
        { rotation: 45, duration: 0.55, ease: "none" },
        0.10
      );
    }

    // 0.40 - 0.85: Camera dolly-in
    // Revealed Scene (Hero) scales 0.82 to 1.0, blur 6px to 0, brightness 0.65 to 1.0
    tl.to(
      heroWrapperRef.current,
      {
        scale: 1.0,
        filter: "blur(0px) brightness(1)",
        duration: 0.45,
        ease: "power2.out",
      },
      0.40
    );

    // Gate Frame scales 1 to 1.6 and fades as camera passes through
    tl.to(
      gateFrameRef.current,
      { scale: 1.6, opacity: 0, duration: 0.45, ease: "power2.in" },
      0.40
    );

    // Doors container scales and fades
    tl.to(
      doorsContainerRef.current,
      { scale: 1.5, opacity: 0, duration: 0.40, ease: "power2.in" },
      0.45
    );



    // 0.85 - 1.00: Light burst settles cleanly into the hero atmosphere
    tl.to(
      lightBurstRef.current,
      { opacity: 0, duration: 0.15, ease: "power1.out" },
      0.85
    );

    // Refresh ScrollTrigger after the gate pin is created and layout is settled
    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === scrollContainer) st.kill();
      });
    };
  }, [prefersReducedMotion, triggerPetalBurst]);

  // Reduced motion alternative: clean 100svh gate with "Open Invitation" button
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-[100svh] bg-blush paper-grain flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-md rose-gold-double-border rounded-2xl p-8 bg-cream/95 shadow-panel flex flex-col items-center">
          <div className="font-arabic text-2xl text-mauve mb-2">
            {inviteConfig.bismillah}
          </div>
          <div className="w-16 h-[1px] bg-rose-gold my-2" />
          <div className="font-names text-5xl text-mauve my-2">
            Y &amp; Z
          </div>
          <p className="font-label tracking-[0.3em] text-xs text-rose-gold uppercase font-normal mb-6">
            Nikkah Invitation
          </p>
          <button
            type="button"
            onClick={triggerAutoOpen}
            className="min-h-[48px] px-8 py-3 rounded-full bg-mauve text-cream font-label text-xs tracking-[0.3em] uppercase font-normal border border-rose-gold"
          >
            Open Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-[400svh] lg:h-[350svh]"
    >
      {/* Pinned 100svh Stage */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[100svh] min-h-[560px] overflow-hidden flex items-center justify-center bg-blush paper-grain"
      >
        {/* =========================================================================
            LAYER 1: REVEALED SCENE (Hero Component)
            Starts scale 0.82, blur 6px, brightness 0.65. Reaches scale 1.0 at 0.85.
            ========================================================================= */}
        <div
          ref={heroWrapperRef}
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center origin-center"
          style={{
            transform: "scale(0.82)",
            filter: "blur(6px) brightness(0.65)",
          }}
        >
          <HeroSection />
        </div>

        {/* =========================================================================
            LAYER 2: LIGHT BURST & ROTATING GOD RAYS
            Intensifies through the widening door gap from 0.10 to 0.65
            ========================================================================= */}
        <div
          ref={lightBurstRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Rotating Conic God Rays in warm champagne & rose-gold */}
          <div
            ref={godRaysRef}
            className="absolute w-[180vw] h-[180vw] max-w-[1600px] max-h-[1600px] rounded-full origin-center animate-spin-slow"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(245, 228, 219, 0.45) 0deg 12deg, transparent 12deg 24deg, rgba(200, 153, 138, 0.3) 24deg 36deg, transparent 36deg 48deg)",
              filter: "blur(8px)",
            }}
          />

          {/* Champagne Center Radiant Glow */}
          <div
            className="absolute w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255, 250, 248, 0.95) 0%, rgba(232, 207, 192, 0.7) 25%, rgba(200, 153, 138, 0.35) 55%, transparent 75%)",
              filter: "blur(14px)",
            }}
          />

          {/* Floor Light Beam Spill */}
          <div
            className="absolute bottom-4 w-[60%] h-32 origin-bottom rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at bottom, rgba(255, 248, 245, 0.85) 0%, rgba(200, 153, 138, 0.35) 40%, transparent 75%)",
              filter: "blur(10px)",
            }}
          />
        </div>

        {/* =========================================================================
            STAGE ARCHITECTURE CONTAINER (Frame, Doors, Seal, and Lanterns)
            Phone: ~96% width & 88svh. Laptop: min(720px, 60vw) centered.
            ========================================================================= */}
        <div className="pointer-events-none relative z-30 w-[96%] sm:w-[86%] md:w-[76%] lg:w-[min(720px,60vw)] h-[88svh] max-h-[820px] flex items-center justify-center select-none">
          
          {/* =========================================================================
              LAYER 3: GRAND MUGHAL GATE FRAME
              Sandstone/ivory pillars, gold jali relief, carved Bismillah lintel,
              chhatris with domes and kalash finials, "Y & Z" apex cartouche.
              ========================================================================= */}
          <div
            ref={gateFrameRef}
            className="pointer-events-none absolute inset-0 z-30 w-full h-full flex items-center justify-center origin-center"
          >
            <svg
              viewBox="0 0 720 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl overflow-visible"
            >
              <defs>
                <linearGradient id="gateSandstone" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF2EA" />
                  <stop offset="50%" stopColor="#F3E2DB" />
                  <stop offset="100%" stopColor="#E2C8C1" />
                </linearGradient>

                <linearGradient id="gatePillarJali" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E6D1C9" />
                  <stop offset="50%" stopColor="#F5EBE6" />
                  <stop offset="100%" stopColor="#E6D1C9" />
                </linearGradient>

                <linearGradient id="gateFrameRoseGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8998A" />
                  <stop offset="25%" stopColor="#D9AEA0" />
                  <stop offset="50%" stopColor="#E8CFC0" />
                  <stop offset="75%" stopColor="#D9AEA0" />
                  <stop offset="100%" stopColor="#C8998A" />
                </linearGradient>
              </defs>

              {/* Top Kangura Battlements / Cresting */}
              <g id="parapet-cresting">
                <path
                  d="M 120 150 L 120 135 L 135 135 L 135 142 L 150 142 L 150 135 L 165 135 L 165 142 L 180 142 L 180 135 L 195 135 L 195 142 L 210 142 L 210 135 L 225 135 L 225 142 L 240 142 L 240 135 L 255 135 L 255 142 L 270 142 L 270 135 L 285 135 L 285 142 L 300 142 L 300 135 L 315 135 L 315 142 L 330 142 L 330 135 L 345 135 L 345 142 L 360 142 L 360 135 L 375 135 L 375 142 L 390 142 L 390 135 L 405 135 L 405 142 L 420 142 L 420 135 L 435 135 L 435 142 L 450 142 L 450 135 L 465 135 L 465 142 L 480 142 L 480 135 L 495 135 L 495 142 L 510 142 L 510 135 L 525 135 L 525 142 L 540 142 L 540 135 L 555 135 L 555 142 L 570 142 L 570 135 L 585 135 L 585 142 L 600 142 L 600 150 Z"
                  fill="url(#gateSandstone)"
                  stroke="#C8998A"
                  strokeWidth="1.2"
                />
              </g>

              {/* Lintel & Entablature with Carved Rose-Gold Arabic Bismillah */}
              <g id="lintel-frieze">
                <rect x="115" y="150" width="490" height="55" rx="3" fill="url(#gateSandstone)" stroke="url(#gateFrameRoseGold)" strokeWidth="2.5" />
                <rect x="125" y="158" width="470" height="39" rx="2" fill="#E8D5CE" stroke="#C8998A" strokeWidth="1" strokeDasharray="6 4" />
                {/* Rose-Gold Calligraphy */}
                <text
                  x="360"
                  y="185"
                  textAnchor="middle"
                  fill="#7A4455"
                  fontFamily="'Amiri', serif"
                  fontSize="22"
                  fontWeight="bold"
                  letterSpacing="2"
                  filter="drop-shadow(0 1px 1px rgba(0,0,0,0.15))"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </text>
              </g>

              {/* Left Sandstone Pillar with Jali Relief */}
              <g id="left-pillar">
                {/* Pillar Base Pedestal */}
                <rect x="35" y="825" width="95" height="55" rx="3" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
                <rect x="45" y="835" width="75" height="35" rx="1.5" fill="#E6D1C9" stroke="#8C584A" strokeWidth="1" />
                {/* Pillar Shaft */}
                <rect x="45" y="240" width="85" height="585" fill="url(#gatePillarJali)" stroke="url(#gateFrameRoseGold)" strokeWidth="2" />
                {/* Jali Relief Diamond Mesh on Shaft */}
                <path
                  d="M 55 260 L 120 325 M 55 325 L 120 260 M 55 360 L 120 425 M 55 425 L 120 360 M 55 460 L 120 525 M 55 525 L 120 460 M 55 560 L 120 625 M 55 625 L 120 560 M 55 660 L 120 725 M 55 725 L 120 660 M 55 760 L 120 825 M 55 825 L 120 760"
                  stroke="#C8998A"
                  strokeWidth="0.9"
                  opacity="0.35"
                />
                {/* Capital Bracket */}
                <path d="M 40 240 L 40 205 L 130 205 L 130 240 L 115 250 L 55 250 Z" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
              </g>

              {/* Right Sandstone Pillar with Jali Relief */}
              <g id="right-pillar">
                {/* Pillar Base Pedestal */}
                <rect x="590" y="825" width="95" height="55" rx="3" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
                <rect x="600" y="835" width="75" height="35" rx="1.5" fill="#E6D1C9" stroke="#8C584A" strokeWidth="1" />
                {/* Pillar Shaft */}
                <rect x="590" y="240" width="85" height="585" fill="url(#gatePillarJali)" stroke="url(#gateFrameRoseGold)" strokeWidth="2" />
                {/* Jali Relief Diamond Mesh */}
                <path
                  d="M 600 260 L 665 325 M 600 325 L 665 260 M 600 360 L 665 425 M 600 425 L 665 360 M 600 460 L 665 525 M 600 525 L 665 460 M 600 560 L 665 625 M 600 625 L 665 560 M 600 660 L 665 725 M 600 725 L 665 660 M 600 760 L 665 825 M 600 825 L 665 760"
                  stroke="#C8998A"
                  strokeWidth="0.9"
                  opacity="0.35"
                />
                {/* Capital Bracket */}
                <path d="M 590 240 L 590 205 L 680 205 L 680 240 L 665 250 L 605 250 Z" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
              </g>

              {/* Left Domed Chhatri Pavilion */}
              <g id="left-chhatri" transform="translate(85, 30)">
                {/* Kalash & Amlaka Finial */}
                <path d="M 0 -8 L 3 -1 M 0 -8 L -3 -1 M 0 -8 L 0 5" stroke="#C8998A" strokeWidth="1.8" />
                <circle cx="0" cy="5" r="4" fill="url(#gateFrameRoseGold)" />
                <circle cx="0" cy="11" r="7" fill="url(#gateFrameRoseGold)" stroke="#8C584A" strokeWidth="1" />
                {/* Bulbous Fluted Dome */}
                <path d="M -30 65 C -35 35 -15 18 0 18 C 15 18 35 35 30 65 Z" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
                <path d="M -15 65 C -18 40 -6 20 0 18 C 6 20 18 40 15 65" stroke="#C8998A" strokeWidth="1" fill="none" opacity="0.6" />
                {/* Eaves & Slender Columns */}
                <rect x="-35" y="65" width="70" height="7" rx="1.5" fill="url(#gateFrameRoseGold)" />
                <line x1="-25" y1="72" x2="-25" y2="120" stroke="#C8998A" strokeWidth="2.5" />
                <line x1="-9" y1="72" x2="-9" y2="120" stroke="#C8998A" strokeWidth="2" />
                <line x1="9" y1="72" x2="9" y2="120" stroke="#C8998A" strokeWidth="2" />
                <line x1="25" y1="72" x2="25" y2="120" stroke="#C8998A" strokeWidth="2.5" />
              </g>

              {/* Right Domed Chhatri Pavilion */}
              <g id="right-chhatri" transform="translate(635, 30)">
                <path d="M 0 -8 L 3 -1 M 0 -8 L -3 -1 M 0 -8 L 0 5" stroke="#C8998A" strokeWidth="1.8" />
                <circle cx="0" cy="5" r="4" fill="url(#gateFrameRoseGold)" />
                <circle cx="0" cy="11" r="7" fill="url(#gateFrameRoseGold)" stroke="#8C584A" strokeWidth="1" />
                <path d="M -30 65 C -35 35 -15 18 0 18 C 15 18 35 35 30 65 Z" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
                <path d="M -15 65 C -18 40 -6 20 0 18 C 6 20 18 40 15 65" stroke="#C8998A" strokeWidth="1" fill="none" opacity="0.6" />
                <rect x="-35" y="65" width="70" height="7" rx="1.5" fill="url(#gateFrameRoseGold)" />
                <line x1="-25" y1="72" x2="-25" y2="120" stroke="#C8998A" strokeWidth="2.5" />
                <line x1="-9" y1="72" x2="-9" y2="120" stroke="#C8998A" strokeWidth="2" />
                <line x1="9" y1="72" x2="9" y2="120" stroke="#C8998A" strokeWidth="2" />
                <line x1="25" y1="72" x2="25" y2="120" stroke="#C8998A" strokeWidth="2.5" />
              </g>

              {/* Grand Multifoil Cusped Arch Spandrels */}
              <path
                d="M 130 205 L 590 205 L 590 440 C 560 440 540 400 515 375 C 485 345 460 365 425 315 C 395 270 375 285 360 220 C 345 285 325 270 295 315 C 260 365 235 345 205 375 C 180 400 160 440 130 440 Z"
                fill="url(#gateSandstone)"
                stroke="#C8998A"
                strokeWidth="1.5"
              />

              {/* Spandrel Mulberry Rosettes */}
              <circle cx="210" cy="270" r="10" fill="none" stroke="#C8998A" strokeWidth="1.5" />
              <circle cx="210" cy="270" r="4" fill="#7A3F52" />
              <circle cx="510" cy="270" r="10" fill="none" stroke="#C8998A" strokeWidth="1.5" />
              <circle cx="510" cy="270" r="4" fill="#7A3F52" />

              {/* Outer Cusped Multifoil Arch Rose-Gold Moulding */}
              <path
                d="M 130 880 L 130 440 C 160 440 180 400 205 375 C 235 345 260 365 295 315 C 325 270 345 285 360 220 C 375 285 395 270 425 315 C 460 365 485 345 515 375 C 540 400 560 440 590 440 L 590 880"
                stroke="url(#gateFrameRoseGold)"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Inner Parallel Arch Accent with Dashed Rose-Gold Line */}
              <path
                d="M 145 880 L 145 445 C 172 445 192 408 215 385 C 242 358 266 375 298 328 C 325 288 345 300 360 238 C 375 300 395 288 422 328 C 454 375 478 358 505 385 C 528 408 548 445 575 445 L 575 880"
                stroke="#C8998A"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                fill="none"
                opacity="0.8"
              />

              {/* Apex "Y & Z" Cartouche Medallion & Finial */}
              <g id="apex-cartouche" transform="translate(360, 210)">
                {/* Spire Kalash */}
                <path d="M 0 -24 L 0 -10 M -4 -16 L 0 -24 L 4 -16" stroke="#C8998A" strokeWidth="2" />
                <circle cx="0" cy="-6" r="4" fill="url(#gateFrameRoseGold)" />
                {/* Cartouche Plaque in Mulberry */}
                <path
                  d="M -36 0 C -36 -18 36 -18 36 0 C 36 18 -36 18 -36 0 Z"
                  fill="#7A3F52"
                  stroke="url(#gateFrameRoseGold)"
                  strokeWidth="2.5"
                />
                <circle cx="-30" cy="0" r="2.5" fill="#E8CFC0" />
                <circle cx="30" cy="0" r="2.5" fill="#E8CFC0" />
                {/* Cartouche Monogram in Champagne */}
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#E8CFC0"
                  fontFamily="'Great Vibes', cursive"
                  fontSize="21"
                  fontWeight="bold"
                >
                  Y &amp; Z
                </text>
              </g>

              {/* Architectural Ground Plinth */}
              <rect x="25" y="875" width="670" height="20" rx="3" fill="url(#gateSandstone)" stroke="#C8998A" strokeWidth="2" />
              <line x1="30" y1="882" x2="690" y2="882" stroke="url(#gateFrameRoseGold)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* =========================================================================
              LAYER 4: TWO DOORS (Left and Right)
              3D Inward swinging leaves (-105deg and +105deg) with perspective: 1400px.
              ========================================================================= */}
          <div
            ref={doorsContainerRef}
            className="pointer-events-none absolute inset-0 z-25 flex items-center justify-center overflow-visible"
            style={{ perspective: "1400px" }}
          >
            {/* Inner Doorway Opening Boundary: covers x=130..590 (63.8%), y=220..880 (73.3%) */}
            <div className="relative w-[64%] h-[73.5%] mt-[16.5%] flex overflow-visible">
              
              {/* LEFT DOOR LEAF (Hinged at Left Edge) */}
              <div
                ref={leftDoorRef}
                className="relative w-1/2 h-full origin-left overflow-visible"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <svg
                  viewBox="0 0 230 660"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-xl overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Mulberry Gradient: #5A2B3B to #7A3F52 */}
                    <linearGradient id="leftDoorMulberry" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5A2B3B" />
                      <stop offset="40%" stopColor="#693041" />
                      <stop offset="75%" stopColor="#74394B" />
                      <stop offset="100%" stopColor="#7A3F52" />
                    </linearGradient>

                    {/* Rose-Gold Stud 3D Radial Sphere */}
                    <radialGradient id="studRoseGoldGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#F9EFEA" />
                      <stop offset="40%" stopColor="#E8CFC0" />
                      <stop offset="85%" stopColor="#C8998A" />
                      <stop offset="100%" stopColor="#8C584A" />
                    </radialGradient>

                    {/* Subtle Embossed Damask Motif */}
                    <pattern id="doorDamaskLeft" width="28" height="28" patternUnits="userSpaceOnUse">
                      <path
                        d="M 14 2 C 8 8 8 20 14 26 C 20 20 20 8 14 2 Z M 2 14 C 8 8 20 8 26 14 C 20 20 8 20 2 14 Z"
                        stroke="#C8998A"
                        strokeWidth="0.75"
                        fill="none"
                        opacity="0.1"
                      />
                    </pattern>
                  </defs>

                  {/* Left Door Base Silhouette matching Left Half of Arch */}
                  <path
                    d="M 0 660 L 0 220 C 30 220 50 180 75 155 C 105 125 130 145 165 95 C 195 50 215 65 230 0 L 230 660 Z"
                    fill="url(#leftDoorMulberry)"
                    stroke="#C8998A"
                    strokeWidth="2.5"
                  />

                  {/* Damask Texture Overlay */}
                  <path
                    d="M 4 656 L 4 222 C 32 222 52 183 76 158 C 105 128 130 148 164 98 C 193 54 213 68 226 5 L 226 656 Z"
                    fill="url(#doorDamaskLeft)"
                  />

                  {/* Inner Rose-Gold Inset Frame */}
                  <path
                    d="M 16 644 L 16 230 C 40 230 60 195 82 172 C 108 145 130 162 160 118 C 185 80 202 90 216 40 L 216 644 Z"
                    stroke="#C8998A"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                    fill="none"
                    opacity="0.8"
                  />

                  {/* Arched Jali Lattice Inlay Panel */}
                  <g id="left-door-jali" transform="translate(45, 170)">
                    <path
                      d="M 0 150 L 0 45 C 20 45 40 20 70 0 C 100 20 120 45 140 45 L 140 150 Z"
                      fill="#4A202E"
                      stroke="#C8998A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 15 150 L 15 50 M 35 150 L 35 30 M 55 150 L 55 15 M 75 150 L 75 10 M 95 150 L 95 20 M 115 150 L 115 35 M 125 150 L 125 50"
                      stroke="#E8CFC0"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                    <path
                      d="M 0 60 L 140 60 M 0 85 L 140 85 M 0 110 L 140 110 M 0 135 L 140 135"
                      stroke="#E8CFC0"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                  </g>

                  {/* Grid of Solid Rose-Gold Domed Studs */}
                  <g id="left-studs">
                    {/* Row 1 */}
                    <circle cx="50" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 2 */}
                    <circle cx="50" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 3 */}
                    <circle cx="50" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 4 */}
                    <circle cx="50" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 5 */}
                    <circle cx="50" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                  </g>

                  {/* Ornate Rose-Gold Lotus Door Ring Knocker */}
                  <g id="left-knocker" transform="translate(145, 430)">
                    {/* Lotus Rosette Backplate */}
                    <circle cx="0" cy="0" r="16" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#7A3F52" stroke="#C8998A" strokeWidth="1" />
                    {/* Hanging Ring with Shadow */}
                    <circle cx="0" cy="18" r="14" stroke="#3A101C" strokeWidth="4.5" fill="none" opacity="0.4" />
                    <circle cx="0" cy="16" r="14" stroke="url(#studRoseGoldGrad)" strokeWidth="4" fill="none" />
                  </g>

                  {/* Vertical Meeting Rib / Astragal along Right Seam Edge */}
                  <rect x="220" y="0" width="10" height="660" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                  <circle cx="225" cy="100" r="2.5" fill="#E8CFC0" />
                  <circle cx="225" cy="200" r="2.5" fill="#E8CFC0" />
                  <circle cx="225" cy="300" r="2.5" fill="#E8CFC0" />
                  <circle cx="225" cy="400" r="2.5" fill="#E8CFC0" />
                  <circle cx="225" cy="500" r="2.5" fill="#E8CFC0" />
                  <circle cx="225" cy="600" r="2.5" fill="#E8CFC0" />

                  {/* Darkening Shade Overlay (controlled by GSAP) */}
                  <path
                    ref={leftShadeRef}
                    d="M 0 660 L 0 220 C 30 220 50 180 75 155 C 105 125 130 145 165 95 C 195 50 215 65 230 0 L 230 660 Z"
                    fill="#000"
                    opacity="0"
                  />
                </svg>
              </div>

              {/* RIGHT DOOR LEAF (Hinged at Right Edge) */}
              <div
                ref={rightDoorRef}
                className="relative w-1/2 h-full origin-right overflow-visible"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <svg
                  viewBox="0 0 230 660"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-xl overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="rightDoorMulberry" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5A2B3B" />
                      <stop offset="40%" stopColor="#693041" />
                      <stop offset="75%" stopColor="#74394B" />
                      <stop offset="100%" stopColor="#7A3F52" />
                    </linearGradient>

                    <pattern id="doorDamaskRight" width="28" height="28" patternUnits="userSpaceOnUse">
                      <path
                        d="M 14 2 C 8 8 8 20 14 26 C 20 20 20 8 14 2 Z M 2 14 C 8 8 20 8 26 14 C 20 20 8 20 2 14 Z"
                        stroke="#C8998A"
                        strokeWidth="0.75"
                        fill="none"
                        opacity="0.1"
                      />
                    </pattern>
                  </defs>

                  {/* Right Door Base Silhouette matching Right Half of Arch */}
                  <path
                    d="M 230 660 L 230 220 C 200 220 180 180 155 155 C 125 125 100 145 65 95 C 35 50 15 65 0 0 L 0 660 Z"
                    fill="url(#rightDoorMulberry)"
                    stroke="#C8998A"
                    strokeWidth="2.5"
                  />

                  {/* Damask Texture Overlay */}
                  <path
                    d="M 226 656 L 226 222 C 198 222 178 183 154 158 C 125 128 100 148 66 98 C 37 54 17 68 4 5 L 4 656 Z"
                    fill="url(#doorDamaskRight)"
                  />

                  {/* Inner Rose-Gold Inset Frame */}
                  <path
                    d="M 214 644 L 214 230 C 190 230 170 195 148 172 C 122 145 100 162 70 118 C 45 80 28 90 14 40 L 14 644 Z"
                    stroke="#C8998A"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                    fill="none"
                    opacity="0.8"
                  />

                  {/* Arched Jali Lattice Inlay Panel */}
                  <g id="right-door-jali" transform="translate(45, 170)">
                    <path
                      d="M 0 150 L 0 45 C 20 45 40 20 70 0 C 100 20 120 45 140 45 L 140 150 Z"
                      fill="#4A202E"
                      stroke="#C8998A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 15 150 L 15 50 M 35 150 L 35 30 M 55 150 L 55 15 M 75 150 L 75 10 M 95 150 L 95 20 M 115 150 L 115 35 M 125 150 L 125 50"
                      stroke="#E8CFC0"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                    <path
                      d="M 0 60 L 140 60 M 0 85 L 140 85 M 0 110 L 140 110 M 0 135 L 140 135"
                      stroke="#E8CFC0"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                  </g>

                  {/* Grid of Solid Rose-Gold Domed Studs */}
                  <g id="right-studs">
                    {/* Row 1 */}
                    <circle cx="50" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="350" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 2 */}
                    <circle cx="50" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="410" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 3 */}
                    <circle cx="50" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="470" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 4 */}
                    <circle cx="50" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="530" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    {/* Row 5 */}
                    <circle cx="50" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="115" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                    <circle cx="180" cy="590" r="4.5" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                  </g>

                  {/* Ornate Rose-Gold Lotus Door Ring Knocker */}
                  <g id="right-knocker" transform="translate(85, 430)">
                    <circle cx="0" cy="0" r="16" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="1" />
                    <circle cx="0" cy="0" r="9" fill="#7A3F52" stroke="#C8998A" strokeWidth="1" />
                    <circle cx="0" cy="18" r="14" stroke="#3A101C" strokeWidth="4.5" fill="none" opacity="0.4" />
                    <circle cx="0" cy="16" r="14" stroke="url(#studRoseGoldGrad)" strokeWidth="4" fill="none" />
                  </g>

                  {/* Vertical Meeting Rib Lip */}
                  <rect x="0" y="0" width="10" height="660" fill="url(#studRoseGoldGrad)" stroke="#8C584A" strokeWidth="0.8" />
                  <circle cx="5" cy="100" r="2.5" fill="#E8CFC0" />
                  <circle cx="5" cy="200" r="2.5" fill="#E8CFC0" />
                  <circle cx="5" cy="300" r="2.5" fill="#E8CFC0" />
                  <circle cx="5" cy="400" r="2.5" fill="#E8CFC0" />
                  <circle cx="5" cy="500" r="2.5" fill="#E8CFC0" />
                  <circle cx="5" cy="600" r="2.5" fill="#E8CFC0" />

                  {/* Darkening Shade Overlay (controlled by GSAP) */}
                  <path
                    ref={rightShadeRef}
                    d="M 230 660 L 230 220 C 200 220 180 180 155 155 C 125 125 100 145 65 95 C 35 50 15 65 0 0 L 0 660 Z"
                    fill="#000"
                    opacity="0"
                  />
                </svg>
              </div>

            </div>

          </div>

          {/* =========================================================================
              LAYER 5: CENTRAL SEAL (Gold Medallion over Center Seam engraved "Y & Z")
              Glows, spins, and fades out at 0.00-0.10
              ========================================================================= */}
          <div
            ref={sealRef}
            className="pointer-events-none absolute z-40 w-22 h-22 min-[390px]:w-26 min-[390px]:h-26 sm:w-32 sm:h-32 flex items-center justify-center origin-center"
            style={{
              top: "56%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl overflow-visible"
            >
              <defs>
                <radialGradient id="sealRoseGoldGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#F9EFEA" />
                  <stop offset="35%" stopColor="#E8CFC0" />
                  <stop offset="75%" stopColor="#C8998A" />
                  <stop offset="100%" stopColor="#8C584A" />
                </radialGradient>
              </defs>

              {/* Radiant Champagne Glow Aura */}
              <circle cx="60" cy="60" r="54" fill="rgba(232, 207, 192, 0.4)" filter="blur(6px)" />

              {/* Scalloped Sunburst Outer Rim */}
              <circle cx="60" cy="60" r="48" fill="url(#sealRoseGoldGrad)" stroke="#8C584A" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="44" stroke="#E8CFC0" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />

              {/* Deep Mulberry Inner Core */}
              <circle cx="60" cy="60" r="36" fill="#5A2B3B" stroke="#C8998A" strokeWidth="2" />
              <circle cx="60" cy="60" r="32" stroke="#E8CFC0" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

              {/* Engraved Couple Initials "Y & Z" in Champagne */}
              <text
                x="60"
                y="68"
                textAnchor="middle"
                fill="#E8CFC0"
                fontFamily="'Great Vibes', cursive"
                fontSize="32"
                fontWeight="bold"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
              >
                Y &amp; Z
              </text>
            </svg>
          </div>



          {/* =========================================================================
              LAYER 7: SOFT PETALS BURST CANVAS (0.85-1.00)
              ========================================================================= */}
          <canvas
            ref={petalBurstCanvasRef}
            className="pointer-events-none absolute inset-0 z-45 w-full h-full"
          />

        </div>

        {/* =========================================================================
            UI CONTROLS & ENTRY BUTTON (0.00 - 0.10)
            Fades out as scrolling starts
            ========================================================================= */}
        <div className="absolute bottom-0 inset-x-0 z-50 flex flex-col items-center pointer-events-none pb-[max(1.75rem,env(safe-area-inset-bottom,1.75rem))] px-4">
          {/* Scroll Hint: hidden initially to prevent overlap */}
          <div
            ref={hintRef}
            className="flex flex-col items-center mb-2.5 select-none opacity-0 pointer-events-none"
          >
            <span className="font-label tracking-[0.3em] text-[11px] sm:text-xs uppercase text-rose-gold font-normal drop-shadow-sm">
              Scroll to open the gate
            </span>
            <ChevronDown className="w-4 h-4 text-rose-gold animate-bounce mt-1" strokeWidth={1.8} />
          </div>

          {/* Elegant Pill Entry Button */}
          <div
            ref={musicBtnRef}
            className="pointer-events-auto flex flex-col items-center w-full"
          >
            <button
              type="button"
              onClick={triggerAutoOpen}
              aria-label="Be a part of our happiness - Tap to enter"
              className="group relative overflow-hidden min-h-[48px] w-[80vw] max-w-[320px] py-2.5 px-5 sm:px-6 rounded-full border border-[#C9A24B] text-[#F6EBDD] bg-gradient-to-r from-[#69293C] via-[#853B52] to-[#69293C] shadow-[inset_0_1px_8px_rgba(201,162,75,0.22),0_8px_24px_rgba(107,42,62,0.35)] cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/70 select-none animate-[gateBtnBreathe_2.5s_infinite_ease-in-out]"
            >
              {/* Subtle Gold Shimmer Sweep every 3s */}
              <span className="pointer-events-none absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C9A24B]/30 to-transparent -translate-x-full animate-[goldShimmerSweep_3s_infinite_ease-in-out]" />

              {/* Tiny Gold Heart Accent to the Left */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#C9A24B] fill-[#C9A24B]/40 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Stacked Button Typography */}
              <div className="flex flex-col items-center text-center leading-tight">
                <span className="font-serif text-base sm:text-[17px] tracking-[0.08em] text-[#F6EBDD] font-medium drop-shadow-sm whitespace-nowrap">
                  Be a part of our happiness
                </span>
                <span className="font-serif italic text-xs sm:text-[13px] tracking-[0.06em] text-[#C9A24B] font-normal drop-shadow-sm mt-0.5">
                  Tap to enter
                </span>
              </div>
            </button>

            {/* Desktop-only Keyboard Hint (min-width 768px, strictly hidden on mobile) */}
            <div className="hidden md:block text-center mt-2 text-[10px] text-plum/60 font-body tracking-wider italic select-none">
              or press <kbd className="px-1.5 py-0.5 rounded bg-cream/80 border border-rose-gold/30 font-sans text-[9px] text-plum">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-cream/80 border border-rose-gold/30 font-sans text-[9px] text-plum">Enter</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-cream/80 border border-rose-gold/30 font-sans text-[9px] text-plum">↓</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
