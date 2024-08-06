import { useRef, useEffect, useState } from "react";
import ModelViewer from "./model-viewer";
import { TEXTURE_URL } from "@/types/enum";

function SvgMask() {
  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const [isThresholdReached, setIsThresholdReached] = useState(false);
  const [isThresholdReachedEnd, setIsThresholdReachedEnd] = useState(false);
  const [textureUrl, setTextureUrl] = useState(TEXTURE_URL.BASE);
  const [bgColor, setBgColor] = useState("#e61a27");

  const initialMaskSize = 0.8;
  const targetMaskSize = 80;
  const thresholdPercentage = 0.4; // 40% of targetMaskSize
  const thresholdPercentageEnd = 0.8; // 80% of targetMaskSize
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

      // Check if the start threshold is reached
      if (currentMaskSize >= targetMaskSize * thresholdPercentage) {
        setIsThresholdReached(true);
      } else {
        setIsThresholdReached(false);
      }

      // Check if the end threshold is reached (when scrolling back up)
      if (currentMaskSize <= targetMaskSize * thresholdPercentageEnd) {
        setIsThresholdReachedEnd(true);
      } else {
        setIsThresholdReachedEnd(false);
      }
    }
    requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    if (stickyMask.current && container.current) {
      const scrollProgress =
        stickyMask.current.offsetTop /
        (container.current.getBoundingClientRect().height -
          window.innerHeight * 2);
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return easedScrollProgress;
    }
    return 0;
  };

  useEffect(() => {
    if (textureUrl === TEXTURE_URL.BASE) {
      setBgColor("#e61a27");
    } else if (textureUrl === TEXTURE_URL.ZERO) {
      setBgColor("#110E0F");
    } else if (textureUrl === TEXTURE_URL.LIGHT) {
      setBgColor("");
    }
  }, [textureUrl]);

  return (
    <div ref={container} className="containerMask">
      <div ref={stickyMask} className="stickyMask">
        <div
          className="objectContainer"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <ModelViewer
            url="/3d/cokesoda/scene.gltf"
            animate={isThresholdReached}
            animateEnd={isThresholdReachedEnd}
            textureUrl={textureUrl}
          />
        </div>
        <div className="flex flex-col gap-4 absolute bottom-4 right-4">
          <button
            className="w-10 h-10 rounded-full bg-black border-2 border-white"
            onClick={() => setTextureUrl(TEXTURE_URL.ZERO)}
          />
          <button
            className="w-10 h-10 rounded-full bg-[#ae0001] border-2 border-white"
            onClick={() => setTextureUrl(TEXTURE_URL.BASE)}
          />
        </div>
      </div>
    </div>
  );
}

export default SvgMask;
