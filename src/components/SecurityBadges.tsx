// src/components/SecurityBadges.tsx
import React from "react";
import { Shield, RotateCcw, Headphones, Award } from "lucide-react";

interface SecurityBadgesProps {
  layout?: "horizontal" | "vertical";
  className?: string;
}

const SecurityBadges: React.FC<SecurityBadgesProps> = ({
  layout = "horizontal",
  className = "",
}) => {
  const badges = [
    {
      icon: Shield,
      title: "100% Secure",
      subtitle: "SSL Protected",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "30-day policy",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Expert help",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Award,
      title: "Licensed",
      subtitle: "Pharmacy certified",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const containerClass =
    layout === "horizontal"
      ? "grid grid-cols-2 md:grid-cols-4 gap-2"
      : "space-y-2";

  return (
    <div className={`${containerClass} ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`${badge.bgColor} p-2 rounded-lg text-center border border-gray-100`}
        >
          <badge.icon className={`w-4 h-4 ${badge.color} mx-auto mb-1`} />
          <div className="text-xs font-semibold text-gray-800">
            {badge.title}
          </div>
          <div className="text-xs text-gray-600">{badge.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;
