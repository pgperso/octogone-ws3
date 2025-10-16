"use client";

import { useState, useEffect } from "react";

export function useScrollPosition(threshold = 50) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const isScrollingDown = position > lastScrollTop;

      setScrollPosition(position);
      setIsScrolled(position > threshold);
      setScrollDirection(isScrollingDown ? "down" : "up");
      setLastScrollTop(position <= 0 ? 0 : position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, threshold]);

  return {
    scrollPosition,
    isScrolled,
    scrollDirection,
  };
}
