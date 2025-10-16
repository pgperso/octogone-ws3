"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  negative?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  negative = false,
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrameId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function for a more natural counting effect
        const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
        const easedProgress = easeOutQuart(progress);
        
        setCount(Math.floor(from + (to - from) * easedProgress));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      // Delay the start of the animation if needed
      const timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, delay * 1000);

      controls.start({ opacity: 1, y: 0 });

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isInView, from, to, duration, delay, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`${className} motion-element`}
      onAnimationComplete={() => {
        // Nettoyage GPU - Technique Netflix
        const element = ref.current;
        if (element) element.classList.add('animation-complete');
      }}
    >
      {prefix}
      {negative ? '–' : ''}{count}
      {suffix}
    </motion.div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  description: string;
  source?: string;
  delay?: number;
}

export const StatItem: React.FC<StatItemProps> = ({
  icon,
  value,
  suffix,
  description,
  source,
  delay = 0
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 motion-container">
      <div className="text-3xl text-gold-500 mb-3">{icon}</div>
      <AnimatedCounter
        from={0}
        to={value}
        suffix={suffix}
        delay={delay}
        className="text-3xl font-bold text-marine-800 mb-2"
      />
      <p className="text-sm text-marine-700 mb-1">{description}</p>
      {source && (
        <p className="text-xs text-marine-500 italic mt-1">{source}</p>
      )}
    </div>
  );
};
