"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export const MouseSpotlight = () => {
    // Use motion values instead of React state to avoid infinite re-renders on every mouse pixel movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics-based spring so it glides behind the cursor
    const springConfig = { damping: 25, stiffness: 150 };
    const rawX = useSpring(mouseX, springConfig);
    const rawY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [mouseX, mouseY]);

    // Construct the background string dynamically
    const backgroundTemplate = useMotionTemplate`radial-gradient(600px circle at ${rawX}px ${rawY}px, rgba(215, 25, 33, 0.15), transparent 40%)`;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: backgroundTemplate,
            }}
        />
    );
};
