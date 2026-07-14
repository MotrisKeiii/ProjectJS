"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function BannerSlider() {
  const banners = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  const showPreviousBanner = () => {
    setCurrentBanner((current) => {
      if (current === 0) return banners.length - 1;
      return current - 1;
    });
  };

  const showNextBanner = () => {
    setCurrentBanner((current) => {
      if (current === banners.length - 1) return 0;
      return current + 1;
    });
  };

  return (
    <section className="group relative mx-auto mb-8 max-w-[1200px] overflow-hidden rounded-3xl bg-white shadow-sm">
      <img
        src={banners[currentBanner]}
        alt={`Banner ${currentBanner + 1}`}
        className="block h-auto w-full object-contain"
      />

      <button
        type="button"
        onClick={showPreviousBanner}
        aria-label="Banner trước"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white sm:left-5"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={showNextBanner}
        aria-label="Banner tiếp theo"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-blue-600 hover:text-white sm:right-5"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
