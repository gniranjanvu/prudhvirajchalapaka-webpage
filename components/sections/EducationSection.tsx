"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, MapPin, Calendar, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DBEducation {
  id: string;
  institution_name: string;
  degree: string;
  major: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  grade?: string;
  location?: string;
  description?: string;
  hero_image_url?: string;
  slug?: string;
  is_published?: boolean;
}

const CARD_GRADIENTS = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-red-500",
];

const DEFAULT_IMAGES = [
  "/images/education/campus-1.jpg",
  "/images/education/campus-2.jpg",
  "/images/education/campus-3.jpg",
  "/images/education/campus-4.jpg",
];

const GRADE_COLORS = [
  "text-cyan-400",
  "text-pink-400",
  "text-teal-400",
  "text-red-400",
];

const FALLBACK_EDUCATION: DBEducation[] = [
  {
    id: '1',
    institution_name: "Vignan's Foundation for Science, Technology & Research",
    degree: "Bachelor of Technology",
    major: "Electronics and Communication Engineering",
    start_year: 2021,
    end_year: 2025,
    is_current: false,
    grade: "8.5/10 CGPA",
    location: "Guntur, India",
    description: "Specialization in Robotics & Embedded Systems. Active member of Robotics Club.",
    slug: "vfstr-btech-ece",
  },
  {
    id: '2',
    institution_name: "Narayana Junior College",
    degree: "Intermediate (12th)",
    major: "MPC - Mathematics, Physics, Chemistry",
    start_year: 2019,
    end_year: 2021,
    is_current: false,
    grade: "95%",
    location: "Guntur, India",
    description: "Focus on advanced mathematics and physical sciences.",
    slug: "narayana-intermediate-mpc",
  },
];

export default function EducationSection() {
  const [educationData, setEducationData] = useState<DBEducation[]>(FALLBACK_EDUCATION);
  const containerRef = useRef<HTMLElement>(null);
  const topGlassRef = useRef<HTMLDivElement>(null);
  const bottomGlassRef = useRef<HTMLDivElement>(null);
  const splitLineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const published = result.data.filter((e: DBEducation) => e.is_published !== false);
          if (published.length > 0) setEducationData(published);
        }
      } catch {
        console.log('Using fallback education');
      }
    };
    fetchEducation();
  }, []);

  // GSAP SCROLL ANIMATION
  useEffect(() => {
    if (!educationData.length || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const topGlass = topGlassRef.current;
      const bottomGlass = bottomGlassRef.current;
      const splitLine = splitLineRef.current;
      const cards = cardsRef.current.filter(Boolean);

      if (!topGlass || !bottomGlass || cards.length === 0) return;

      const tl = gsap.timeline();

      // 1. Initially set cards slightly below screen so they can slide up later
      gsap.set(cards, { y: '100%', autoAlpha: 0, scale: 0.9, rotation: 0 });
      gsap.set(splitLine, { scaleX: 0, autoAlpha: 0 });

      // 2. Animate the Striking Line through the text ("Rabbit hole" split effect)
      tl.to(splitLine, { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "power4.out" })
        .to(splitLine, { height: 4, duration: 0.2, ease: "power2.inOut" });

      // 3. Crack the 'EDUCATION' text open like broken glass!
      tl.to(topGlass, { yPercent: -100, duration: 1.5, ease: "power3.inOut" }, "+=0.2")
        .to(bottomGlass, { yPercent: 100, duration: 1.5, ease: "power3.inOut" }, "<")
        .to(splitLine, { autoAlpha: 0, duration: 0.5 }, "<"); // Fade out the line

      // 4. Slide up the FIRST card into the center during the split
      tl.to(cards[0], {
        y: '0%',
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1"); // Overlap slightly with the screen splitting

      // 5. Loop through remaining cards and stack them one by one
      for (let i = 1; i < cards.length; i++) {
        const tiltAngle = i % 2 === 0 ? 3 : -3; // Alternate left/right tilt

        // Shrink and move PREVIOUS cards backwards into the background
        const prevCards = cards.slice(0, i);
        tl.to(prevCards, {
          scale: (index) => 1 - ((i - index) * 0.05), // progressive shrinking
          y: (index) => `-${(i - index) * 5}%`,       // moving slightly up
          autoAlpha: (index) => 1 - ((i - index) * 0.2), // dimming slightly
          duration: 1,
          ease: "power2.inOut"
        }, "+=0.5"); // Wait half a second before bringing the next card

        // Bring current card UP and tilt it
        tl.to(cards[i], {
          y: '0%',
          autoAlpha: 1,
          scale: 1,
          rotation: tiltAngle,
          duration: 1,
          ease: "back.out(1.2)" // Snappy pop up!
        }, "<"); // Sync with the shrinking of previous cards
      }

      // Keep it completely still for just a moment at the very end
      tl.to({}, { duration: 0.5 });

      // 6. Create the Pinned Container!
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${(cards.length + 1.5) * 100}%`, // Gives plenty of scroll space for sequence
        pin: true,
        pinSpacing: true, // Reserves natural DOM height
        animation: tl,
        scrub: 2.5, // "Butter" scrub, smooth friction
        invalidateOnRefresh: true
      });

      // Force recalculation for anything downstream (Projects)
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 500);

    }, containerRef);

    return () => ctx.revert();
  }, [educationData]);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden z-20 flex items-center justify-center pointer-events-auto transition-colors duration-500 bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#0a0a0a] text-gray-900 dark:text-white"
    >
      {/* Decorative Blob Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/15 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* --- THE SHATTERED GLASS SCREEN MASKS --- */}
      {/* Both masks contain identical text, but clipped to their halves! */}

      {/* Static Strike Line between the two halves */}
      <div ref={splitLineRef} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white z-[60] origin-center shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

      {/* TOP HALF - Clips exactly at 50% bottom */}
      <div
        ref={topGlassRef}
        className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-white/90 backdrop-blur-3xl overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
      >
        <h2 className="text-[12vw] font-black font-display tracking-tighter uppercase text-black drop-shadow-[0_0_30px_rgba(0,0,0,0.1)]">
          Education
        </h2>
      </div>

      {/* BOTTOM HALF - Clips exactly at 50% top */}
      <div
        ref={bottomGlassRef}
        className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/95 dark:bg-black/95 backdrop-blur-3xl overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]"
        style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
      >
        <h2 className="text-[12vw] font-black font-display tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Education
        </h2>
      </div>


      {/* --- THE STICKY STACK CARDS --- */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center z-40 px-4 md:px-8 pointer-events-auto">
        {educationData.map((edu, index) => {
          const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
          const heroImg = edu.hero_image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
          const gradeColor = GRADE_COLORS[index % GRADE_COLORS.length];

          return (
            <div
              key={edu.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="absolute w-[calc(100%-2rem)] max-w-5xl max-h-[85vh]"
              style={{ zIndex: 10 + index }}
            >
              {/* LIQUID GLASS CARD */}
              <div className="w-full flex flex-col lg:flex-row h-full rounded-[2rem] overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                {/* Left Side: Image */}
                <div className="relative w-full lg:w-2/5 h-48 lg:h-auto overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-40 mix-blend-overlay z-10`} />
                  <Image
                    src={heroImg}
                    fill
                    className="object-cover"
                    alt={edu.institution_name}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/20">
                      <GraduationCap className="w-8 h-8 text-black dark:text-white" />
                    </div>
                    <span className="px-4 py-2 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/20 text-black dark:text-white text-sm font-bold uppercase tracking-widest hidden sm:block">
                      {edu.degree.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="p-6 sm:p-8 md:p-12 flex-1 flex flex-col justify-center relative overflow-y-auto scrollbar-hide max-h-full">
                  {/* Big number watermark */}
                  <div className="absolute -top-4 right-4 text-[8rem] font-black text-black/5 dark:text-white/5 pointer-events-none select-none font-display">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 pr-16">{edu.degree}</h3>
                    <p className="text-lg md:text-xl text-gray-400 mb-6">{edu.major}</p>

                    <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base text-gray-300 mb-8 font-mono">
                      <span className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4 text-blue-400" />
                        </div>
                        <span>{edu.institution_name}</span>
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-pink-400" />
                          </div>
                          <span>{edu.location}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-teal-400" />
                        </div>
                        <span>{edu.start_year} – {edu.is_current ? 'Present' : edu.end_year || 'N/A'}</span>
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                    {edu.grade && (
                      <div className="relative z-10 inline-flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-white/5 border border-white/10 w-fit backdrop-blur-lg">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-gray-400 shrink-0" />
                        <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-gray-400 hidden sm:block">
                          {edu.grade.includes('CGPA') || edu.grade.includes('/10') ? 'CGPA' : 'Score'}
                        </span>
                        <span className={`text-xl md:text-2xl font-bold font-display ${gradeColor}`}>{edu.grade}</span>
                      </div>
                    )}

                    <div className="relative z-10 sm:ml-auto">
                      <Link href={`/education/${edu.slug || edu.id}`} className="group inline-flex items-center justify-center gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 w-fit">
                        View Details
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 dark:bg-black flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-black dark:text-white group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
