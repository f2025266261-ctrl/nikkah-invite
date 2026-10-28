import { useState, useEffect } from "react";

export type CountdownState = "upcoming" | "today" | "passed";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  state: CountdownState;
}

/**
 * Calculates time remaining until target ISO timestamp.
 * Handled with timezone-correct Date.parse.
 */
function calculateCountdown(targetISO: string): CountdownTime {
  const targetTime = new Date(targetISO).getTime();
  const now = Date.now();
  const difference = targetTime - now;

  // Check if passed (e.g. more than 6 hours after event start)
  if (difference < -6 * 60 * 60 * 1000) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      state: "passed",
    };
  }

  // Check if "today" / event day (within the event day or difference between 0 and -6 hours)
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      state: "today",
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    state: "upcoming",
  };
}

/**
 * Custom hook counting down to target ISO.
 * Timezone-correct, updates every second, cleans up on unmount, and computes initial
 * state synchronously to prevent first-render flicker.
 */
export function useCountdown(targetISO: string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    calculateCountdown(targetISO)
  );

  useEffect(() => {
    // Initial immediate update on mount
    setCountdown(calculateCountdown(targetISO));

    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetISO]);

  return countdown;
}
