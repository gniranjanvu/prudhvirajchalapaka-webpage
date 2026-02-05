"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex].text;
        const typeSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && displayedText === currentWord) {
                // Finished typing, wait before deleting
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayedText === "") {
                // Finished deleting, move to next word
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                // Typing or deleting
                const nextText = isDeleting
                    ? currentWord.substring(0, displayedText.length - 1)
                    : currentWord.substring(0, displayedText.length + 1);
                setDisplayedText(nextText);
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIndex, words]);

    return (
        <div
            className={cn(
                "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
                className
            )}
        >
            <span className={cn("inline-block", words[currentWordIndex].className)}>
                {displayedText}
            </span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-1 align-middle",
                    cursorClassName
                )}
            />
        </div>
    );
};
