"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
}

export default function Counter({
  value,
  direction = "up",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(
    direction === "down" ? value : 0
  );

  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });

  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Number(latest.toFixed(0))
        );
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref} />;
}