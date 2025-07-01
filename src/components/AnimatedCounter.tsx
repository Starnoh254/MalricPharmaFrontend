// src/components/AnimatedCounter.tsx
import React from "react";
import { useCountUp } from "../hooks/useCountUp";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  shouldStart: boolean;
  duration?: number;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = "",
  prefix = "",
  shouldStart,
  duration = 2000,
  className = "",
  decimals = 0,
}) => {
  const formatNumber = (value: number) => {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.floor(value).toLocaleString();
  };

  const animatedValue = useCountUp({
    end,
    duration,
    shouldStart,
    formatNumber,
  });

  return (
    <span className={className}>
      {prefix}
      {animatedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
