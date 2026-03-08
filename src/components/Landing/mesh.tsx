"use client";

import  { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/lib/shader";
import {Suspense, useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
interface ImageProps {
    src: string;
}

const images: ImageProps[] = [
    { src: '/images/rock.jpg' },
    { src: '/images/rock2.jpg' },
    { src: '/images/rock3.jpg' },
    { src: '/images/rock4.jpg' },
];

const PLANE_WIDTH = 3;
const PLANE_HEIGHT = 2;
const GAP = 0.05;

function Meshes() {
    const textures = useTexture(images.map(img => img.src)) as THREE.Texture[];
    const materialsRef = useRef<(THREE.ShaderMaterial | null)[]>([]);

    const uniformsList = useMemo(() => {
        return textures.map((texture) => ({
            uTexture: { value: texture },
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }));
    }, [textures]);

    useFrame((state) => {
        materialsRef.current.forEach((mat) => {
            if (mat) {
                mat.uniforms.uTime.value = state.clock.elapsedTime;
            }
        });
    });

    return (
        <group>
            {textures.map((_, index) => (
                <mesh
                    key={index}
                    position={[index * (PLANE_WIDTH + GAP), 0, 0]}
                >
                    <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 30, 30]} />
                    <shaderMaterial
                        ref={(el) => (materialsRef.current[index] = el)}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={uniformsList[index]}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default function Mesh() {
    return (
       <Suspense fallback={null}>
           <Meshes />
       </Suspense>
    );
}