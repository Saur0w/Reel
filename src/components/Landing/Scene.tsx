"use client";

import { Canvas } from "@react-three/fiber";
import ImageMesh from "./mesh";

export default function Scene() {
    return (
      <Canvas camera={{position: [0, 0, 5], fov: 50}}
              gl={{ antialias: true, alpha: true }}
      >
        <ImageMesh />
      </Canvas>
    );
}