"use client";

import { useState, useCallback, useEffect } from "react";
import { slides } from "@/data/slides";
import { prefetchAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import Stage from "@/components/Stage";
import Slide from "@/components/Slide";
import SlideChrome from "@/components/SlideChrome";
import MascotCorner from "@/components/MascotCorner";
import ProgressBar from "@/components/ProgressBar";
import KeyboardNavigation from "@/components/KeyboardNavigation";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 分析スライドまで来てから取りに行くとスピナーが出るので、開いた時点で先読みする
  useEffect(() => {
    prefetchAnalyticsEvents();
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goFirst = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goLast = useCallback(() => {
    setCurrentIndex(slides.length - 1);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <main className="h-screen w-screen select-none bg-white">
      <KeyboardNavigation
        onNext={goNext}
        onPrev={goPrev}
        onFirst={goFirst}
        onLast={goLast}
      />
      <Stage>
        <Slide key={`slide-${currentIndex}`} component={currentSlide.component} />
        <SlideChrome
          phase={currentSlide.phase}
          current={currentIndex + 1}
          total={slides.length}
          theme={currentSlide.theme}
        />
        {!currentSlide.hideMascot && (
          <MascotCorner key={`mascot-${currentIndex}`} index={currentSlide.mascot} />
        )}
        <ProgressBar
          current={currentIndex}
          total={slides.length}
          theme={currentSlide.theme}
        />
      </Stage>
    </main>
  );
}
