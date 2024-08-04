"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
  }, [lenis]);
  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisScroll;
