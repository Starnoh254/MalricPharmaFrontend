// src/components/RecentPurchaseNotification.tsx
import React, { useState, useEffect } from "react";
import { CheckCircle, MapPin } from "lucide-react";

interface PurchaseNotification {
  customerName: string;
  productName: string;
  location: string;
  timeAgo: string;
}

interface RecentPurchaseNotificationProps {
  className?: string;
}

const RecentPurchaseNotification: React.FC<RecentPurchaseNotificationProps> = ({
  className = "",
}) => {
  const [currentNotification, setCurrentNotification] =
    useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Move notifications inside useEffect or use useMemo
  const notifications: PurchaseNotification[] = React.useMemo(
    () => [
      {
        customerName: "Sarah M.",
        productName: "Paracetamol 500mg",
        location: "Nairobi",
        timeAgo: "2 minutes ago",
      },
      {
        customerName: "John K.",
        productName: "Vitamin D3 Tablets",
        location: "Mombasa",
        timeAgo: "5 minutes ago",
      },
      {
        customerName: "Grace W.",
        productName: "Amoxicillin 250mg",
        location: "Kisumu",
        timeAgo: "8 minutes ago",
      },
      {
        customerName: "Peter M.",
        productName: "Ibuprofen 400mg",
        location: "Nakuru",
        timeAgo: "12 minutes ago",
      },
      {
        customerName: "Mary N.",
        productName: "Multivitamin Complex",
        location: "Eldoret",
        timeAgo: "15 minutes ago",
      },
    ],
    []
  );

  useEffect(() => {
    const showNotification = () => {
      const randomNotification =
        notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Then show notifications every 15-25 seconds
    const interval = setInterval(() => {
      const randomDelay = 15000 + Math.random() * 10000; // 15-25 seconds
      setTimeout(showNotification, randomDelay);
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [notifications]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm animate-slide-in-left">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              <span className="font-semibold">
                {currentNotification.customerName}
              </span>{" "}
              just purchased
            </p>
            <p className="text-sm text-primary font-semibold truncate">
              {currentNotification.productName}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {currentNotification.location} • {currentNotification.timeAgo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseNotification;
