"use client";

import ModelViewer from "@/components/model-viewer";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  const initialMaskSize = 0.8;
  const targetMaskSize = 80;
  const thresholdPercentage = 0.4; // 70% of targetMaskSize
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (stickyMask.current) {
      const scrollProgress = getScrollProgress();
      const maskSizeProgress = targetMaskSize * scrollProgress;
      const currentMaskSize = initialMaskSize + maskSizeProgress;

      stickyMask.current.style.webkitMaskSize = currentMaskSize * 100 + "%";

      // Check if the threshold is reached
      if (
        currentMaskSize >= targetMaskSize * thresholdPercentage &&
        !isThresholdReached
      ) {
        setIsThresholdReached(true);
      } else if (
        currentMaskSize < targetMaskSize * thresholdPercentage &&
        isThresholdReached
      ) {
        setIsThresholdReached(false);
      }
    }
    requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    if (stickyMask.current && container.current) {
      const scrollProgress =
        stickyMask.current.offsetTop /
        (container.current.getBoundingClientRect().height - window.innerHeight);
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return easedScrollProgress;
    }
    return 0;
  };

  return (
    <main className="main">
      <div ref={container} className="containerMask">
        <div ref={stickyMask} className="stickyMask">
          <div className="objectContainer bg-[#e0212c]">
            <ModelViewer
              url="/3d/coca_cola_can/scene.gltf"
              animate={isThresholdReached}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
