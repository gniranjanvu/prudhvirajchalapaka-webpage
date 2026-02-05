"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface ParallaxCardContent {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface ParallaxScrollCardsProps {
  content: ParallaxCardContent[];
  contentClassName?: string;
}

export const ParallaxScrollCards = ({
  content,
  contentClassName,
}: ParallaxScrollCardsProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLocked, setScrollLocked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which card should be active based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardIndex = Math.min(
        Math.floor(latest * content.length),
        content.length - 1
      );
      setActiveCard(cardIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, content.length]);

  // Scroll lock mechanism to prevent leaving section until all cards shown
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInView && scrollLocked) {
        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        // Lock when scrolling down and not at last card
        if (scrollingDown && activeCard < content.length - 1) {
          e.preventDefault();
        }

        // Lock when scrolling up and not at first card
        if (scrollingUp && activeCard > 0 && rect.top >= -10) {
          e.preventDefault();
        }
      }
    };

    if (scrollLocked) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollLocked, activeCard, content.length]);

  // Generate heights for parallax effect - each card gets viewport height
  const cardHeight = 100; // vh
  const totalHeight = content.length * cardHeight;

  // Note: Due to React's rules of hooks, we must define a fixed number of useTransform calls
  // at the top level. This component supports up to 3 cards. The EXPERIENCES array has 3 items
  // and PUBLICATIONS has 2 items, so this covers all current use cases.
  // Create transforms for first card
  const card0Opacity = useTransform(
    scrollYProgress,
    [-0.5 / content.length, 0, 0.5 / content.length],
    [0, 1, 0]
  );
  const card0Y = useTransform(
    scrollYProgress,
    [-0.5 / content.length, 0, 0.5 / content.length],
    [50, 0, -50]
  );

  // Create transforms for second card
  const card1Opacity = useTransform(
    scrollYProgress,
    [0.5 / content.length, 1 / content.length, 1.5 / content.length],
    [0, 1, 0]
  );
  const card1Y = useTransform(
    scrollYProgress,
    [0.5 / content.length, 1 / content.length, 1.5 / content.length],
    [50, 0, -50]
  );

  // Create transforms for third card
  const card2Opacity = useTransform(
    scrollYProgress,
    [1.5 / content.length, 2 / content.length, 2.5 / content.length],
    [0, 1, 0]
  );
  const card2Y = useTransform(
    scrollYProgress,
    [1.5 / content.length, 2 / content.length, 2.5 / content.length],
    [50, 0, -50]
  );

  // Map index to transforms - returns first card transforms as fallback for any index > 2
  const getCardTransforms = (index: number) => {
    switch (index) {
      case 0:
        return { opacity: card0Opacity, y: card0Y };
      case 1:
        return { opacity: card1Opacity, y: card1Y };
      case 2:
        return { opacity: card2Opacity, y: card2Y };
      default:
        // Fallback to first card transforms for indices beyond 2
        return { opacity: card0Opacity, y: card0Y };
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${totalHeight}vh` }}
      className="relative w-full"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content with parallax effect */}
            <div className="relative">
              {content.map((item, index) => {
                const { opacity, y } = getCardTransforms(index);

                return (
                  <motion.div
                    key={`text-${index}`}
                    style={{
                      opacity,
                      y,
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeCard === index ? 1 : 0.3,
                        y: activeCard === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Card counter */}
                      <div className="flex items-center gap-2 pt-4">
                        {content.map((_, i) => (
                          <div
                            key={`dot-${i}`}
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              activeCard === i
                                ? "w-8 bg-white"
                                : "w-2 bg-gray-500"
                            )}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right side - Visual content card */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                className={cn(
                  "w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl",
                  contentClassName
                )}
                key={`card-${activeCard}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {content[activeCard].content ?? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">
                      Card {activeCard + 1}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {activeCard < content.length - 1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest">
              Scroll to continue
            </span>
            <motion.div
              className="w-[2px] h-8 bg-gradient-to-b from-gray-400 to-transparent"
              animate={{
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
