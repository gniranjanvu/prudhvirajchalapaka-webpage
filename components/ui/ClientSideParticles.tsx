"use client";

import { useEffect, useState } from "react";

export const ClientSideParticles = () => {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<{ left: string; top: string; width: string; height: string; duration: string }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            duration: `${Math.random() * 5 + 3}s`
        }));
        setParticles(newParticles);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-blue-500/20 blur-xl animate-pulse"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.width,
                        height: p.height,
                        animationDuration: p.duration
                    }}
                />
            ))}
        </>
    );
};
