import { useState, useEffect, useCallback, useRef } from 'react';

const TIMER_DURATION = 30; // seconds

export const useTimer = (onTimeUp: () => void, isActive: boolean) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(TIMER_DURATION);
    
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isActive, onTimeUp]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, resetTimer]);

  const progress = timeLeft / TIMER_DURATION;

  return {
    timeLeft,
    progress,
    resetTimer,
  };
};
