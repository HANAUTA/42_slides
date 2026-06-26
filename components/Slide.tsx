"use client";

import type { ComponentType } from "react";

interface SlideProps {
  component: ComponentType;
}

export default function Slide({ component: Component }: SlideProps) {
  return (
    <div className="slide-fade-in absolute inset-0">
      <Component />
    </div>
  );
}
