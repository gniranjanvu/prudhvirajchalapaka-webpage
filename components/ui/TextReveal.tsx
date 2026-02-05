"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className, delay = 0 }: TextRevealProps) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1], // Cubic bezier for "Nothing" feel
                    delay: delay
                }}
                className="inline-block"
            >
                {text}
            </motion.div>
        </div>
    );
};
