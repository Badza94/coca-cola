"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useSpring, animated, config } from "@react-spring/three";
import { Mesh, Box3, Vector3 } from "three";

interface ModelProps {
  url: string;
  animate: boolean;
  animateEnd: boolean;
}

const Model: React.FC<ModelProps> = ({ url, animate, animateEnd }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<Mesh>();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center);
    }
  }, [gltf]);

  const { x, rotationY } = useSpring({
    from: { x: 10, rotationY: 0 },
    to: async (next) => {
      if (animate) {
        await next({ x: 0, rotationY: 0, config: config.slow });
      } else if (animateEnd) {
        // Spin in the opposite direction and move back slowly
        await next({ rotationY: -Math.PI, config: config.default });
        await next({ x: 10, config: { duration: 9000 } });
      }
    },
  });

  useEffect(() => {
    setActive(animate);
  }, [animate]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <animated.group position-x={x} rotation-y={rotationY}>
      <primitive ref={modelRef} object={gltf.scene} />
    </animated.group>
  );
};

interface ModelViewerProps {
  url: string;
  animate: boolean;
  animateEnd: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  url,
  animate,
  animateEnd,
}) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 0.5], fov: 25 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={30} />
          <Model url={url} animate={animate} animateEnd={animateEnd} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
