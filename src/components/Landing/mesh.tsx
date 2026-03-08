"use client";

import  { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/lib/shader";
import {Suspense, useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@/hooks/useScroll";

interface ImageProps {
    src: string;
}

const images: ImageProps[] = [
    { src: '/images/rock.jpg' },
    { src: '/images/rock2.jpg' },
    { src: '/images/rock3.jpg' },
    { src: '/images/rock4.jpg' },
    { src: '/images/rock5.jpg' },
    { src: '/images/rock6.jpg' },
    { src: '/images/rock7.jpg' },
    { src: '/images/rock8.jpg' },
    { src: '/images/rock9.jpg' },
    { src: '/images/rock10.jpg' },
    { src: '/images/rock11.jpg' },
];

const PLANE_WIDTH = 2.5;
const PLANE_HEIGHT = 1.5;
const GAP = 0.05;

function Meshes() {
    const textures = useTexture(images.map(img => img.src)) as THREE.Texture[];
    const materialsRef = useRef<(THREE.ShaderMaterial | null)[]>([]);
    const groupRef      = useRef<THREE.Group>(null!);

    const { scrollX, targetX, velocity } = useScroll();

    const uniformsList = useMemo(() => {
        return textures.map((texture) => ({
            uTexture:   { value: texture },
            uVelocity:  { value: 0 },
        }));
    }, [textures]);

    useFrame((state) => {
        const diff = targetX.current - scrollX.current;
        // eslint-disable-next-line react-hooks/immutability
        scrollX.current += diff * 0.1;
        // eslint-disable-next-line react-hooks/immutability
        velocity.current = diff;

        if (groupRef.current) {
            groupRef.current.position.x = scrollX.current * 0.005;
        }

        materialsRef.current.forEach((mat) => {
            if (mat) {
                mat.uniforms.uVelocity.value = THREE.MathUtils.lerp(
                    mat.uniforms.uVelocity.value,
                    velocity.current,
                    0.1
                );
            }
        });
    });

    return (
        <group ref={groupRef}>
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