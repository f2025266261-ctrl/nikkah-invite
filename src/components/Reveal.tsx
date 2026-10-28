import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Reusable Reveal component using framer-motion.
 * Features a soft fade + subtle rise animation triggered once when scrolled into view.
 * Respects prefers-reduced-motion.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0.1,
  duration = 0.8,
  distance = 28,
  direction = "up",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, instantly reveal with simple fade or no translation
  if (shouldReduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Gentle cubic bezier curve
      }}
    >
      {children}
    </motion.div>
  );
};
