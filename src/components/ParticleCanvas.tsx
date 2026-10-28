import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  initialX: number;
}

/**
 * Very few soft petals drifting downward gently:
 * - Phone: max 8 petals
 * - Laptop / Desktop: max 14 petals
 * - Soft blush / mauve / rose-gold pastel tones
 * - Paused automatically when off-screen via IntersectionObserver
 * - Respects prefers-reduced-motion
 */
export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    // Exactly max 8 on phone, 14 on laptop as requested
    const particleCount = isDesktop ? 14 : 8;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const petalColors = [
      "176, 107, 126", // mauve
      "235, 196, 193", // deep blush
      "200, 153, 138", // rose gold
      "244, 217, 214", // blush
    ];

    // Initialize soft petals
    const petals: Petal[] = [];
    for (let i = 0; i < particleCount; i++) {
      const color = petalColors[i % petalColors.length];
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        initialX: Math.random() * canvas.width,
        size: Math.random() * 4 + 3.5,
        speedY: Math.random() * 0.45 + 0.25,
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.35 + 0.25,
        color,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        oscillationSpeed: Math.random() * 0.015 + 0.008,
        oscillationDistance: Math.random() * 20 + 8,
      });
    }

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x = p.initialX + Math.sin(time * p.oscillationSpeed) * p.oscillationDistance;
        p.rotation += p.rotationSpeed;

        // Wrap around when reaching bottom
        if (p.y > canvas.height + 15) {
          p.y = -10;
          p.initialX = Math.random() * canvas.width;
          p.x = p.initialX;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Soft curved petal
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.25, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${p.color}, 0.25)`;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when canvas is scrolled off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, [isDesktop, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-15 w-full h-full"
    />
  );
};
