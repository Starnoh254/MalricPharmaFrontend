// src/components/UrgencyTimer.tsx
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface UrgencyTimerProps {
  endTime: Date;
  onTimerEnd?: () => void;
  className?: string;
}

const UrgencyTimer: React.FC<UrgencyTimerProps> = ({
  endTime,
  onTimerEnd,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        if (onTimerEnd) onTimerEnd();
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onTimerEnd]);

  return (
    <div
      className={`bg-red-500 text-white p-4 rounded-lg shadow-lg ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-5 h-5" />
        <span className="font-bold text-lg">LIMITED TIME OFFER</span>
      </div>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTimer;
