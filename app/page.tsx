"use client";

import { useState, useCallback } from "react";
import { slides } from "@/data/slides";
import Stage from "@/components/Stage";
import Slide from "@/components/Slide";
import SlideChrome from "@/components/SlideChrome";
import ProgressBar from "@/components/ProgressBar";
import KeyboardNavigation from "@/components/KeyboardNavigation";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <Slide key={currentIndex} component={currentSlide.component} />
        <SlideChrome
          section={currentSlide.section}
          current={currentIndex + 1}
          total={slides.length}
        />
        <ProgressBar current={currentIndex} total={slides.length} />
      </Stage>
    </main>
  );
}
