import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface SessionTimerProps {
  isActive: boolean;
}

const SessionTimer = ({ isActive }: SessionTimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Load saved session time
    const saved = localStorage.getItem("alignme_session_time");
    if (saved) setSeconds(parseInt(saved));
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        localStorage.setItem("alignme_session_time", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const resetSession = () => {
    setSeconds(0);
    localStorage.removeItem("alignme_session_time");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50">
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">Session Time</p>
          <p className="text-2xl font-bold text-foreground">{formatTime(seconds)}</p>
        </div>
      </div>
      <button
        onClick={resetSession}
        className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default SessionTimer;
