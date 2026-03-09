"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    id: string;
    img: string;
    quote: string;
    name: string;
    role: string;
    company: string;
}

// Function to generate a random colorful SVG avatar based on initials
const generateAvatarSVG = (name: string, index: number) => {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const colors = ['%234F46E5', '%23059669', '%23DC2626', '%23D97706', '%237C3AED', '%23DB2777'];
    const color = colors[index % colors.length];

    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${color}"/><text x="50%" y="55%" text-anchor="middle" fill="white" font-size="72" font-family="sans-serif" dy=".1em">${initials}</text></svg>`)}`;
};

const AUTOROTATE_MS = 6000;

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Fetch only approved recommendations
                const response = await fetch('/api/recommendations?approved=true');
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    const mapped = result.data.map((rec: any, i: number) => ({
                        id: rec.id,
                        name: rec.provider_name || 'Anonymous',
                        role: rec.provider_role || '',
                        company: rec.provider_company || '',
                        quote: rec.content || '',
                        img: generateAvatarSVG(rec.provider_name || 'A', i)
                    }));
                    setTestimonials(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch testimonials:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const count = testimonials.length;

    const goTo = useCallback(
        (index: number, dir: "left" | "right") => {
            if (count === 0) return;
            setDirection(dir);
            setActive((index + count) % count);
        },
        [count]
    );

    const handleNext = useCallback(() => goTo((active + 1) % count, "right"), [active, count, goTo]);
    const handlePrev = useCallback(() => goTo((active - 1 + count) % count, "left"), [active, count, goTo]);

    const startTimer = useCallback(() => {
        if (count > 1) {
            timerRef.current = setInterval(handleNext, AUTOROTATE_MS);
        }
    }, [count, handleNext]);

    // Autorotate
    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTimer]);

    const stopAutorotate = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleSelect = (index: number) => {
        stopAutorotate();
        goTo(index, index > active ? "right" : "left");
        startTimer(); // Restart timer after manual selection
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        stopAutorotate();
        setIsDragging(true);
        setStartX(e.type === 'mousedown' ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX);
        setCurrentX(e.type === 'mousedown' ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX);
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        setCurrentX(e.type === 'mousemove' ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) { // Threshold for a swipe
            if (diff > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        }
        startTimer(); // Restart timer after drag
    };

    return (
        <section
            id="testimonials"
            className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500 bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#0a0a0a] text-gray-900 dark:text-white"
            style={{ zIndex: 12 }}
        >
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
                {/* Section Badge */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-sm font-mono tracking-widest uppercase text-gray-600 dark:text-gray-300 mb-6">
                        <Quote className="w-4 h-4 text-indigo-400" />
                        Recommendations
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
                        What People{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Say
                        </span>
                    </h2>
                </div>

                {count === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-300 dark:border-white/10 rounded-[2rem]">
                        <p className="text-gray-500 dark:text-gray-400">No testimonials available yet.</p>
                    </div>
                ) : (
                    <div
                        className="relative max-w-4xl mx-auto"
                        onMouseEnter={() => {
                            if (timerRef.current) clearInterval(timerRef.current);
                        }}
                        onMouseLeave={(e) => {
                            handleDragEnd();
                            startTimer();
                        }}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        {/* Testimonial Card container */}
                        <div ref={containerRef} className="relative touch-pan-y">
                            {/* Floating Circular Image */}
                            <div className="relative flex justify-center mb-10">
                                {/* Decorative glow ring */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-500/10 blur-xl pointer-events-none" />

                                <div className="relative w-20 h-20 md:w-24 md:h-24">
                                    {testimonials.map((testimonial, index) => (
                                        <div
                                            key={testimonial.id}
                                            className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.68,-0.3,0.32,1)]"
                                            style={{
                                                opacity: active === index ? 1 : 0,
                                                transform:
                                                    active === index
                                                        ? "rotate(0deg) scale(1)"
                                                        : direction === "right"
                                                            ? "rotate(60deg) scale(0.7)"
                                                            : "rotate(-60deg) scale(0.7)",
                                                zIndex: active === index ? 10 : 0
                                            }}
                                        >
                                            <Image
                                                src={testimonial.img}
                                                alt={testimonial.name}
                                                width={96}
                                                height={96}
                                                className="rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.3)] object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Glass Quote Card */}
                            <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] min-h-[220px] flex flex-col items-center justify-center text-center">
                                {/* Decorative quote icon */}
                                <Quote className="absolute top-6 left-8 w-8 h-8 text-indigo-500/20 pointer-events-none" />

                                {/* Quote Text (with crossfade) */}
                                <div className="relative w-full overflow-hidden">
                                    {testimonials.map((testimonial, index) => (
                                        <div
                                            key={testimonial.id}
                                            className="transition-all duration-500 ease-in-out"
                                            style={{
                                                opacity: active === index ? 1 : 0,
                                                transform:
                                                    active === index
                                                        ? "translateX(0)"
                                                        : direction === "right"
                                                            ? "translateX(40px)"
                                                            : "translateX(-40px)",
                                                position: active === index ? "relative" : "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                            }}
                                        >
                                            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                                                &ldquo;{testimonial.quote}&rdquo;
                                            </p>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                                                    {testimonial.name}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                                    {testimonial.role}{testimonial.company && ` · ${testimonial.company}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Left / Right Arrows */}
                                {count > 1 && (
                                    <>
                                        <button
                                            onClick={() => {
                                                stopAutorotate();
                                                handlePrev();
                                                startTimer();
                                            }}
                                            aria-label="Previous testimonial"
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                stopAutorotate();
                                                handleNext();
                                                startTimer();
                                            }}
                                            aria-label="Next testimonial"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Selector Pills */}
                            {count > 1 && (
                                <div className="flex flex-wrap justify-center gap-3 mt-8">
                                    {testimonials.map((testimonial, index) => (
                                        <button
                                            key={testimonial.id}
                                            onClick={() => handleSelect(index)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${active === index
                                                ? "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                                : "bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-black/10 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <span>{testimonial.name}</span>
                                            <span
                                                className={
                                                    active === index ? "text-indigo-500/50" : "text-black/10 dark:text-white/20"
                                                }
                                            >
                                                ·
                                            </span>
                                            <span
                                                className={`${active === index ? "text-indigo-400/70" : "text-gray-500"
                                                    }`}
                                            >
                                                {testimonial.company || testimonial.role}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
