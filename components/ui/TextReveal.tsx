"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className, delay = 0 }: TextRevealProps) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            }
        }
    };

    const item = {
        hidden: { y: "100%", opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1] as const,
            }
        }
    };

    return (
        <motion.div
            className={`flex flex-wrap gap-x-4 md:gap-x-6 ${className}`}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden pb-4 mb-[-1rem]">
                    <motion.div variants={item} className="inline-block">
                        {word}
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
};
