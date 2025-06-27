// src/components/Toast.tsx
import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-green-600 rounded-full p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Add this to your global CSS or Tailwind config for the animation
// @keyframes slide-in {
//   from { transform: translateX(100%); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// }
// .animate-slide-in { animation: slide-in 0.3s ease-out; }
