"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useScrollVelocity() {
    const velocity = useRef(0);
    const targetX = useRef(0);
    const currentX = useRef(0);

    useGSAP(() => {
        const lastScrollX = 0;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetX.current -= e.deltaY * 1.2;
        };

        window.addEventListener('wheel', onWheel, { passive: false });

        const ticker = gsap.ticker.add(() => {
            const diff = targetX.current - currentX.current;
            currentX.current += diff * 0.08;
            velocity.current = diff;
        });

        return () => {
            window.removeEventListener('wheel', onWheel);
            gsap.ticker.remove(ticker);
        };
    });

    return { currentX, velocity };
}