"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { vertexShader, fragmentShader } from './shaders';

interface MeshProps {
    url: string;
    index: number;
    width: number;
    height: number;
    gap: number;
    scrollVelocity: React.RefObject<number>;
}

export function Mesh({ url, index, width, height, gap, scrollVelocity }: MeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, url);
    const timeRef = useRef(0);

    const uniforms = useMemo(() => ({
        uTexture:        { value: texture },
        uScrollVelocity: { value: 0 },
        uTime:           { value: 0 },
    }), [texture]);

    useFrame((_, delta) => {
        timeRef.current += delta;
        // eslint-disable-next-line react-hooks/immutability
        uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
            uniforms.uScrollVelocity.value,
            scrollVelocity.current * 0.01,
            0.1
        );
        uniforms.uTime.value = timeRef.current;
    });

    const xPos = index * (width + gap);

    return (
        <mesh ref={meshRef} position={[xPos, 0, 0]}>
            <planeGeometry args={[width, height, 30, 30]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}