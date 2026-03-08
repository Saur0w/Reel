"use client";

import { useEffect, useRef } from "react";

export function useScroll() {
    const scrollX = useRef(0);
    const targetX = useRef(0);
    const velocity = useRef(0);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetX.current -= e.deltaY * 1.5;
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    return { scrollX, targetX, velocity };
}