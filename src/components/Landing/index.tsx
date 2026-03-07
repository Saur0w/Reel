"use client";

import styles from "./style.module.scss";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh } from "./mesh";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";


const IMAGES = [
    '/images/rock.jpg',
    '/images/rock2.jpg',
    '/images/rock3.jpg',
    '/images/rock4.jpg',
];

const IMG_WIDTH  = 3.2;
const IMG_HEIGHT = 2.2;
const GAP        = 0.08;
const TOTAL_WIDTH = IMAGES.length * (IMG_WIDTH + GAP);

function Scene({ currentX, velocity }: {
    currentX: React.RefObject<number>;
    velocity: React.RefObject<number>;
}) {
    const groupRef = useRef<THREE.Group>(null!);
    const { viewport } = useThree();
    const scale = viewport.width / 16;

    useFrame(() => {
        if (!groupRef.current) return;

        const minX = -(TOTAL_WIDTH * scale - viewport.width * 0.8);
        const clampedX = Math.max(minX, Math.min(0, currentX.current * 0.003));
        groupRef.current.position.x = clampedX;
    });

    return (
        <group ref={groupRef}>
            {IMAGES.map((url, i) => (
                <Mesh
                    key={url}
                    url={url}
                    index={i}
                    width={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    gap={GAP}
                    scrollVelocity={velocity}
                />
            ))}
        </group>
    );
}
export default function Landing() {
    const { currentX, velocity } = useScrollVelocity();

    return (
        <div className={styles.landing}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene currentX={currentX} velocity={velocity} />
                </Suspense>
            </Canvas>
        </div>
    );
}