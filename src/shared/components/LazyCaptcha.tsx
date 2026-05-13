"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CaptchaWrapper = dynamic(() => import("./CaptchaWrapper"), {
  ssr: false,
});

interface LazyCaptchaProps {
  children: React.ReactNode;
  form?: string;
}

export default function LazyCaptcha({ children, form }: LazyCaptchaProps) {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: form === "contact-us" ? "100px" : "300px", // preload before visible
        threshold: 0.1,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {load ? <CaptchaWrapper>{children}</CaptchaWrapper> : null}
    </div>
  );
}
