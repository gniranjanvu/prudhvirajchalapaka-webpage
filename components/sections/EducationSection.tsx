"use client";

import { useEffect, useRef, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  slug?: string;
  is_published?: boolean;
}

const CARD_GRADIENTS = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-red-500",
];

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1523580846011-d3a5bc2549c1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544531838-3dc52c41624b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop",
];

const SHADOW_COLORS = [
  "dark:hover:shadow-blue-500/[0.1]",
  "dark:hover:shadow-purple-500/[0.1]",
  "dark:hover:shadow-emerald-500/[0.1]",
  "dark:hover:shadow-orange-500/[0.1]",
];

const GRADE_COLORS = [
  "text-blue-500",
  "text-purple-500",
  "text-emerald-500",
  "text-orange-500",
];

// Fallback education data
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
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Stacked cards scrolling: each card starts lower and scales up as it scrolls
      // into view, then scales down slightly as the next card arrives
      cards.forEach((card, i) => {
        gsap.set(card, { position: 'relative', zIndex: i + 1 });

        if (i > 0) {
          // Cards after the first start offset and transparent
          gsap.set(card, { y: 80, opacity: 0.3, scale: 0.92 });

          ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 0.6,
            animation: gsap.to(card, {
              y: -(i * 10),
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
            }),
          });
        }

        // When the next card comes in, shrink the current one slightly
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1],
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.6,
            animation: gsap.to(card, {
              scale: 0.95 - i * 0.02,
              y: -(i * 10) - 15,
              opacity: 0.6,
              ease: 'power2.inOut',
            }),
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [educationData]);

  return (
    <section id="education" ref={sectionRef} className="pt-20 pb-10 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden" style={{ zIndex: 2 }}>
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

        {/* GSAP Stacked Cards – original 3D tilt cards with scroll animation */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={edu.id} ref={(el) => { cardRefs.current[index] = el; }}>
              <CardContainer className="inter-var">
                <CardBody className={`bg-gray-50 relative group/card dark:hover:shadow-2xl ${SHADOW_COLORS[index % SHADOW_COLORS.length]} dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border`}>
                  <CardItem translateZ="100" className="w-full mt-4 mb-6">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden group-hover/card:shadow-xl">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} opacity-80 z-10 mix-blend-multiply`} />
                      <Image
                        src={CARD_IMAGES[index % CARD_IMAGES.length]}
                        height={1000}
                        width={1000}
                        className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                        alt={edu.institution_name}
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <GraduationCap className="w-8 h-8 text-white mb-2" />
                        <h3 className="text-white font-bold text-lg">{edu.degree.split(' ')[0]}</h3>
                      </div>
                    </div>
                  </CardItem>
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    {edu.degree}
                  </CardItem>
                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    {edu.major}
                  </CardItem>
                  <CardItem as="p" translateZ="40" className="text-neutral-500 text-xs mt-2 dark:text-neutral-400 font-mono">
                    {edu.institution_name.length > 40 ? edu.institution_name.substring(0, 37) + '...' : edu.institution_name} ({edu.start_year} - {edu.end_year || 'Present'})
                  </CardItem>
                  <CardItem translateZ="80" className="w-full mt-4">
                    <div className="flex flex-col gap-4">
                      {edu.grade && (
                        <div className="flex justify-between items-center bg-gray-100 dark:bg-zinc-900 p-3 rounded-lg">
                          <span className="text-sm font-semibold">{edu.grade.includes('CGPA') || edu.grade.includes('/10') ? 'CGPA' : 'Grade'}</span>
                          <span className={`text-lg font-bold ${GRADE_COLORS[index % GRADE_COLORS.length]}`}>{edu.grade}</span>
                        </div>
                      )}
                      {edu.description && (
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-8">
                    <CardItem translateZ={20} className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                      {edu.start_year}-{edu.end_year || 'Present'}
                    </CardItem>
                    <CardItem translateZ={20}>
                      <Link href={`/education/${edu.slug || edu.id}`}>
                        <Button size="sm" className="bg-black dark:bg-white dark:text-black text-white text-xs font-bold px-4 py-2 rounded-xl">
                          Know More
                        </Button>
                      </Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
