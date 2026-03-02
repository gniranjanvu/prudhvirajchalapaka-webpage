"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, GraduationCap, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  {
    id: "btech",
    degree: "Bachelor of Technology",
    field: "Electronics and Communication Engineering",
    institution: "Vignan's Foundation for Science, Technology & Research",
    period: "2021 - 2025",
    grade: "8.5/10",
    gradeLabel: "CGPA",
    specialization: "Specialization in Robotics & Embedded Systems. Active member of Robotics Club.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc2549c1?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-600 to-cyan-500",
    shadowColor: "blue",
    icon: GraduationCap,
    shortTitle: "B.Tech",
  },
  {
    id: "intermediate",
    degree: "Intermediate (12th)",
    field: "MPC - Mathematics, Physics, Chemistry",
    institution: "Narayana Junior College",
    period: "2019 - 2021",
    grade: "96%",
    gradeLabel: "Grade",
    specialization: "Focus on advanced mathematics and physical sciences.",
    image: "https://images.unsplash.com/photo-1544531838-3dc52c41624b?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-600 to-pink-500",
    shadowColor: "purple",
    icon: BookOpen,
    shortTitle: "Intermediate",
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Set initial state
        gsap.set(card, {
          position: 'relative',
          zIndex: i,
        });

        if (i > 0) {
          // Cards after the first start below and will slide up and stack
          gsap.set(card, { y: 60, opacity: 0.5, scale: 0.95 });

          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.8,
            animation: gsap.to(card, {
              y: -(i * 8),
              opacity: 1,
              scale: 1 - (i * 0.02),
              ease: 'power2.out',
            }),
          });
        }

        // Slight parallax effect on the card as it scrolls past
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1] || card,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.8,
            animation: gsap.to(card, {
              y: -(i * 8) - 20,
              scale: 1 - ((i + 1) * 0.03),
              opacity: 0.7,
              ease: 'power2.inOut',
            }),
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="pt-20 pb-10 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Heading & Subheading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-6 border border-blue-500/20">
            <GraduationCap className="w-4 h-4" />
            Academic Journey
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-foreground mb-6 leading-[1.1] tracking-tight">
            Forging Knowledge into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Innovation
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A strong educational foundation in Electronics, Mathematics & Physics — powering expertise in{" "}
            <span className="text-foreground font-medium">Robotics</span>,{" "}
            <span className="text-foreground font-medium">Embedded Systems</span>, and{" "}
            <span className="text-foreground font-medium">Autonomous Navigation</span>.
          </p>
        </div>

        {/* GSAP Stacked Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EDUCATION_DATA.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <div
                key={edu.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`rounded-2xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-zinc-900 shadow-lg dark:shadow-2xl dark:shadow-${edu.shadowColor}-500/5`}
              >
                {/* Card Image Header */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${edu.color} opacity-80 z-10 mix-blend-multiply`} />
                  <Image
                    src={edu.image}
                    height={1000}
                    width={1000}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    alt={edu.institution}
                  />
                  <div className="absolute bottom-4 left-5 z-20 flex items-center gap-3">
                    <IconComponent className="w-8 h-8 text-white" />
                    <h3 className="text-white font-bold text-xl sm:text-2xl">{edu.shortTitle}</h3>
                  </div>
                  <div className="absolute top-4 right-5 z-20">
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/20">
                      {edu.period}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <h4 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-300 text-sm sm:text-base mb-1">
                    {edu.field}
                  </p>
                  <p className="text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm font-mono mb-5">
                    {edu.institution} ({edu.period})
                  </p>

                  {/* Grade */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-zinc-800 px-4 py-3 rounded-xl flex-1">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{edu.gradeLabel}</span>
                      </div>
                      <span className={`text-lg font-bold ${edu.shadowColor === 'blue' ? 'text-blue-500' : 'text-purple-500'}`}>
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  {/* Specialization */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {edu.specialization}
                  </p>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">{edu.period}</span>
                    <Link href={`/education/${edu.id}`}>
                      <Button size="sm" className="bg-black dark:bg-white dark:text-black text-white text-xs font-bold px-5 py-2.5 rounded-xl gap-2 hover:gap-3 transition-all">
                        Know More <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
