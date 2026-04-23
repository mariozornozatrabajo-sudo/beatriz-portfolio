"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LenisRef } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // standard fallback
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
