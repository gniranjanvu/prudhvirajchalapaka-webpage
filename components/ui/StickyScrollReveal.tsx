"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    // Parallax transforms for background elements
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    return (
        <motion.div
            className="min-h-[100vh] relative flex justify-center space-x-10 rounded-md p-10 overflow-hidden"
            ref={ref}
        >
            {/* Parallax Background Elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY, opacity: backgroundOpacity }}
            >
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl" />
            </motion.div>

            <div className="relative flex items-start px-4">
                <div className="max-w-2xl relative">
                    {content.map((item, index) => (
                        <motion.div
                            key={`sticky-item-${index}`}
                            className="my-20 min-h-[40vh]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <motion.h2
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                    x: activeCard === index ? 0 : -20,
                                    scale: activeCard === index ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-2xl font-bold text-slate-100 dark:text-slate-100"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                    x: activeCard === index ? 0 : -10,
                                }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                className="text-lg text-slate-300 max-w-sm mt-10 dark:text-slate-300"
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                    <div className="h-20" />
                </div>
            </div>
            
            {/* Content Card with Enhanced Parallax Animation */}
            <div className="hidden lg:block sticky top-40 h-fit">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, scale: 0.9, y: 20, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, rotateY: 10 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            background: linearGradients[activeCard % linearGradients.length],
                        }}
                        className={cn(
                            "h-60 w-80 rounded-xl overflow-hidden shadow-2xl",
                            contentClassName
                        )}
                    >
                        {content[activeCard].content ?? null}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
