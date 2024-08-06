"use client";
import { useRef, useEffect, useState } from "react";
import ModelViewer from "./model-viewer";
import { COLORS, TEXTURE_URL } from "@/types/enum";
import { motion } from "framer-motion";

function SvgMask({
  bgColor,
  setBgColor,
}: {
  bgColor: string;
  setBgColor: (color: COLORS) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const [isThresholdReached, setIsThresholdReached] = useState(false);
  const [isThresholdReachedEnd, setIsThresholdReachedEnd] = useState(false);
  const [textureUrl, setTextureUrl] = useState(TEXTURE_URL.BASE);

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
      setBgColor(COLORS.RED);
    } else if (textureUrl === TEXTURE_URL.ZERO) {
      setBgColor(COLORS.BLACK);
    } else if (textureUrl === TEXTURE_URL.LIGHT) {
      setBgColor(COLORS.LIGHT);
    }
  }, [setBgColor, textureUrl]);

  return (
    <div ref={container} className="containerMask">
      <div ref={stickyMask} className="stickyMask">
        <motion.div
          className="objectContainer"
          animate={{
            backgroundColor: bgColor,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <motion.div
            className="content"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isThresholdReached ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            <h1
              style={{
                color:
                  bgColor === COLORS.RED
                    ? COLORS.BLACK
                    : bgColor === COLORS.BLACK
                      ? COLORS.LIGHT
                      : COLORS.RED,
              }}
              data-content="COCA COLA"
            >
              COCA COLA
            </h1>
            <ModelViewer
              url="/3d/cokesoda/scene.gltf"
              animate={isThresholdReached}
              animateEnd={isThresholdReachedEnd}
              textureUrl={textureUrl}
            />
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-4 absolute bottom-4 right-4 z-50">
          <button
            className="w-10 h-10 rounded-full bg-black border-2 border-white"
            onClick={() => setTextureUrl(TEXTURE_URL.ZERO)}
          />
          <button
            className="w-10 h-10 rounded-full bg-[#ae0001] border-2 border-white"
            onClick={() => setTextureUrl(TEXTURE_URL.BASE)}
          />
          <button
            className="w-10 h-10 rounded-full bg-[#A7A9AC] border-2 border-white"
            onClick={() => setTextureUrl(TEXTURE_URL.LIGHT)}
          />
        </div>
      </div>
    </div>
  );
}

export default SvgMask;
