// src/hooks/useCountUp.ts
import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  shouldStart?: boolean;
  formatNumber?: (value: number) => string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  shouldStart = false,
  formatNumber = (value) => Math.floor(value).toString(),
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!shouldStart || isComplete) return;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = start + (end - start) * easeOut;

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldStart, end, start, duration, isComplete]);

  // Reset animation when shouldStart changes from true to false
  useEffect(() => {
    if (!shouldStart && isComplete) {
      setCount(start);
      setIsComplete(false);
      startTimeRef.current = undefined;
    }
  }, [shouldStart, start, isComplete]);

  return formatNumber(count);
};

// Hook for intersection observer
export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setIsInView(true);
          setHasBeenInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, hasBeenInView]);

  return { ref, isInView };
};
