// src/components/TrustBadges.tsx
import React from "react";
import { Shield, Truck, Clock, Award } from "lucide-react";

interface TrustBadgesProps {
  layout?: "horizontal" | "vertical";
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({
  layout = "horizontal",
  className = "",
}) => {
  const badges = [
    {
      icon: Shield,
      title: "100% Authentic",
      subtitle: "Licensed medicines only",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      subtitle: "Same day in Nairobi",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      subtitle: "Always here to help",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Award,
      title: "Quality Assured",
      subtitle: "Pharmacy verified",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const containerClass =
    layout === "horizontal"
      ? "grid grid-cols-2 md:grid-cols-4 gap-4"
      : "space-y-4";

  return (
    <div className={`${containerClass} ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`${badge.bgColor} p-3 rounded-lg text-center border border-gray-100`}
        >
          <badge.icon className={`w-6 h-6 ${badge.color} mx-auto mb-2`} />
          <div className="text-sm font-semibold text-gray-800">
            {badge.title}
          </div>
          <div className="text-xs text-gray-600">{badge.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
