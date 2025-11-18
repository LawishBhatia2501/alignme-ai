import { useEffect, useRef, useState } from "react";

export const usePostureAudio = (enabled: boolean, interval: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastAlertTime, setLastAlertTime] = useState(0);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/alert.wav");
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAlert = () => {
    if (!enabled || !audioRef.current) return;

    const now = Date.now();
    if (now - lastAlertTime < interval * 1000) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error("Failed to play audio:", err);
    });

    setLastAlertTime(now);
  };

  return { playAlert };
};
