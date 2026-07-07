"use client";

import { useEffect } from "react";

interface KeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export default function KeyboardNavigation({
  onNext,
  onPrev,
  onFirst,
  onLast,
}: KeyboardNavigationProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        // PageDown / PageUp はプレゼン用クリッカーが送るキー
        case "ArrowRight":
        case "PageDown":
          onNext();
          break;
        case " ":
          // ボタン（タイマー等）にフォーカスがあるときは Space での誤送りを防ぐ
          if (document.activeElement instanceof HTMLButtonElement) return;
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          onPrev();
          break;
        case "Home":
          e.preventDefault();
          onFirst();
          break;
        case "End":
          e.preventDefault();
          onLast();
          break;
        case "f":
        case "F":
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          }
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onFirst, onLast]);

  return null;
}
