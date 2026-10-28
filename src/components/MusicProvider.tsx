import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface MusicContextType {
  isPlaying: boolean;
  isAvailable: boolean;
  toggleMusic: () => void;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  isAvailable: false,
  toggleMusic: () => {},
  playMusic: async () => {},
  pauseMusic: () => {},
});

export const useMusic = () => useContext(MusicContext);

interface MusicProviderProps {
  children: React.ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const wasPlayingBeforeTabHide = useRef<boolean>(false);

  // Initialize Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.src = "/audio/music.mp3";
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    // iOS Safari inline playback attribute
    audio.setAttribute("playsinline", "true");

    const handleCanPlay = () => {
      setIsAvailable(true);
    };

    const handleError = () => {
      // If file is missing, empty, or fails, fail silently and keep isAvailable false
      setIsAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  // Fade In Audio: 0 to 0.5 over 2.0s
  const fadeIn = useCallback((targetVolume = 0.5, durationMs = 2000) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const stepMs = 50;
    const steps = durationMs / stepMs;
    const increment = targetVolume / steps;
    audioRef.current.volume = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      const nextVol = audioRef.current.volume + increment;
      if (nextVol >= targetVolume) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audioRef.current.volume = nextVol;
      }
    }, stepMs);
  }, []);

  // Fade Out Audio: current to 0 over duration
  const fadeOut = useCallback((durationMs = 800) => {
    return new Promise<void>((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      const stepMs = 50;
      const currentVol = audioRef.current.volume;
      const steps = durationMs / stepMs;
      const decrement = currentVol / steps;

      fadeIntervalRef.current = window.setInterval(() => {
        if (!audioRef.current) return;
        const nextVol = audioRef.current.volume - decrement;
        if (nextVol <= 0.02) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          resolve();
        } else {
          audioRef.current.volume = nextVol;
        }
      }, stepMs);
    });
  }, []);

  // Play music with fade in
  const playMusic = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setIsAvailable(true);
      fadeIn(0.5, 2000);
    } catch {
      // Gracefully handle browser autoplay blocks or unplayable file
      setIsPlaying(false);
    }
  }, [fadeIn]);

  // Pause music
  const pauseMusic = useCallback(async () => {
    if (!audioRef.current) return;
    setIsPlaying(false);
    await fadeOut(600);
  }, [fadeOut]);

  // Toggle music on / off
  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  // Pause when tab is hidden, resume if it was playing when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          wasPlayingBeforeTabHide.current = true;
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeTabHide.current) {
          wasPlayingBeforeTabHide.current = false;
          playMusic();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, playMusic]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isAvailable,
        toggleMusic,
        playMusic,
        pauseMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
