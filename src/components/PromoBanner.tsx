// src/components/PromoBanner.tsx
import React from "react";
import { Clock, Zap, Gift } from "lucide-react";

interface PromoBannerProps {
  type: "flash-sale" | "free-shipping" | "first-time";
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ type, className = "" }) => {
  const bannerConfig = {
    "flash-sale": {
      icon: Zap,
      title: "⚡ FLASH SALE",
      subtitle: "Up to 30% OFF on all medications",
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      textColor: "text-white",
      description: "Limited time offer - ends in 24 hours!",
    },
    "free-shipping": {
      icon: Gift,
      title: "🚚 FREE DELIVERY",
      subtitle: "Orders above KSH 2,000",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-white",
      description: "Same-day delivery within Nairobi",
    },
    "first-time": {
      icon: Clock,
      title: "🎉 NEW CUSTOMER",
      subtitle: "20% OFF your first order",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-white",
      description: "Use code: WELCOME20",
    },
  };

  const config = bannerConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.textColor} rounded-xl p-4 shadow-lg ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg">{config.title}</div>
          <div className="text-sm opacity-90">{config.subtitle}</div>
          <div className="text-xs opacity-75 mt-1">{config.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
