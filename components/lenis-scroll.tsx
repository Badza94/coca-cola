"use client";

import { ReactLenis, useLenis } from "lenis/react";

function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <ReactLenis root>
      {/* content */}
      {children}
    </ReactLenis>
  );
}

export default LenisScroll;
