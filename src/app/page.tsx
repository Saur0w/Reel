"use client";

import SmoothScroll from "@/hooks/SmoothScroll";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
const Landing = dynamic(() => import("@/components/Landing"), { ssr: false });

export default function Home() {
    return (
        <SmoothScroll>
            <div className={styles.page}>
                <Landing />
            </div>
        </SmoothScroll>
    );
}