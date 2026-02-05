"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function Confetti() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 }); // Trigger when 50% visible

    useEffect(() => {
        if (isInView && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <video
                ref={videoRef}
                src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/square-confetti-blown-up-animation-gif-download-4510686.mp4"
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 mix-blend-screen"
            />
        </div>
    );
}
