import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Petal {
  x: number;
  y: number;
  targetRestY: number;
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
  isSettled: boolean;
}

/**
 * 10 Petals Drift Down & Settle Once:
 * - 10 soft rose petals gently drift down after quote reveal
 * - Upon reaching the bottom area, they settle and rest permanently
 * - Reduced motion: no falling petals
 */
export const PetalBurstCanvas: React.FC<{ delayStart?: number }> = ({ delayStart = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    const count = 10;
    const petals: Petal[] = [];
    const petalColors = [
      "176, 107, 126", // mauve
      "235, 196, 193", // deep blush
      "200, 153, 138", // rose gold
      "244, 217, 214", // blush
    ];

    for (let i = 0; i < count; i++) {
      const restY = canvas.height - 20 - Math.random() * 40;
      petals.push({
        x: (canvas.width * (i + 0.5)) / count + (Math.random() - 0.5) * 30,
        y: -30 - Math.random() * 80,
        targetRestY: restY,
        initialX: (canvas.width * (i + 0.5)) / count,
        size: Math.random() * 3 + 4,
        speedY: Math.random() * 0.9 + 0.7,
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.3 + 0.5,
        color: petalColors[i % petalColors.length],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        oscillationSpeed: Math.random() * 0.02 + 0.015,
        oscillationDistance: Math.random() * 16 + 8,
        isSettled: false,
      });
    }

    let animationId: number;
    let startTime: number | null = null;
    let allSettled = false;

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (elapsed < delayStart * 1000) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let settledCount = 0;

      petals.forEach((p) => {
        if (!p.isSettled) {
          p.y += p.speedY;
          p.x =
            p.initialX +
            Math.sin(elapsed * 0.002 + p.oscillationSpeed) * p.oscillationDistance;
          p.rotation += p.rotationSpeed;

          if (p.y >= p.targetRestY) {
            p.y = p.targetRestY;
            p.isSettled = true;
          }
        } else {
          settledCount++;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.3, p.size * 0.75, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(${p.color}, 0.25)`;
        ctx.fill();

        ctx.restore();
      });

      if (settledCount === count) {
        allSettled = true;
        // Keep canvas with settled petals
        return;
      }

      if (!allSettled) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationId);
  }, [shouldReduceMotion, delayStart]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 w-full h-full"
    />
  );
};
