// src/components/HeroCarousel.tsx
import React, { useState, useEffect } from "react";
import { useBrand } from "../hooks/useBrand";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Clock,
  Shield,
} from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  bgGradient: string;
  badge?: string;
}

interface HeroCarouselProps {
  className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ className = "" }) => {
  const { brand } = useBrand();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "💊 Premium Medications",
      subtitle: "Flash Sale - Up to 30% OFF",
      description:
        "Quality healthcare products at unbeatable prices. Limited time offer!",
      ctaText: "Shop Now & Save",
      imageUrl:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=1200&h=600&fit=crop&crop=center",
      bgGradient: "from-blue-600 to-blue-800",
      badge: "FLASH SALE",
    },
    {
      id: 2,
      title: "🚚 Free Same-Day Delivery",
      subtitle: "Orders Above KSH 2,000",
      description:
        "Get your medications delivered to your doorstep within hours across Nairobi.",
      ctaText: "Order Now",
      imageUrl:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=600&fit=crop&crop=center",
      bgGradient: "from-green-600 to-green-800",
      badge: "FREE DELIVERY",
    },
    {
      id: 3,
      title: "🩺 Professional Consultation",
      subtitle: "Licensed Pharmacists Available 24/7",
      description:
        "Get expert medical advice and prescription guidance from certified professionals.",
      ctaText: "Consult Now",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center",
      bgGradient: "from-purple-600 to-purple-800",
      badge: "24/7 SUPPORT",
    },
    {
      id: 4,
      title: "🎯 New Customer Special",
      subtitle: "20% OFF Your First Order",
      description: `Welcome to ${brand.name}! Start your healthcare journey with exclusive savings.`,
      ctaText: "Get Discount",
      imageUrl:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&h=600&fit=crop&crop=center",
      bgGradient: "from-red-600 to-red-800",
      badge: "NEW CUSTOMER",
    },
  ];

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel */}
      <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative h-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-85`}
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl lg:max-w-2xl text-white">
                  {/* Badge */}
                  {slide.badge && (
                    <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                      {slide.badge}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-yellow-200 leading-tight">
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8 text-gray-100 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button className="bg-white text-gray-900 px-4 sm:px-8 py-2 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-1">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      {slide.ctaText}
                    </button>
                    <button className="border-2 border-white text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Learn More</span>
                      <span className="sm:hidden">More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
