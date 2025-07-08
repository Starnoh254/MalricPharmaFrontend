// src/components/SavingsBadge.tsx
import React from "react";

interface SavingsBadgeProps {
  percentage: number;
  position?: "top-left" | "top-right";
  size?: "small" | "medium" | "large";
}

const SavingsBadge: React.FC<SavingsBadgeProps> = ({
  percentage,
  position = "top-right",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-base px-4 py-2",
  };

  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full ${sizeClasses[size]} shadow-lg transform -rotate-12 z-10`}
    >
      SAVE {percentage}%
    </div>
  );
};

export default SavingsBadge;
