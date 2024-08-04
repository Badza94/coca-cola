"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useSpring, animated, config } from "@react-spring/three";
import { Mesh, Box3, Vector3 } from "three";

// Define the props types
interface ModelProps {
  url: string;
  animate: boolean;
}

const Model: React.FC<ModelProps> = ({ url, animate }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<Mesh>();
  const [active, setActive] = useState(false);

  // Center and scale the model
  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center);

      // Scale the model
      // modelRef.current.scale.set(20, 20, 20);
    }
  }, [gltf]);

  // Animation for sliding in from the right
  const { x } = useSpring({
    from: { x: 10 },
    x: active ? 0 : 10,
    config: config.slow,
  });

  useEffect(() => {
    if (animate) {
      console.log("ANIMATE");
      setActive(true);
    }
  }, [animate]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <animated.group position-x={x}>
      <primitive ref={modelRef} object={gltf.scene} />
    </animated.group>
  );
};

// Define the props types
interface ModelViewerProps {
  url: string;
  animate: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ url, animate }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 0.5], fov: 25 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={30} />
          <Model url={url} animate={animate} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
