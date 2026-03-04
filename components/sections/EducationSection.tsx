"use client";

import { useEffect, useState } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import Image from "next/image";

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
  "https://images.unsplash.com/photo-1523580846011-d3a5bc2549c1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544531838-3dc52c41624b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop",
];

const GRADE_COLORS = [
  "text-blue-500",
  "text-purple-500",
  "text-emerald-500",
  "text-orange-500",
];

// Sticky card layout constants
const STICKY_TOP_BASE_PX = 100;        // first card sticks at 100px from top (more space for header)
const STICKY_OFFSET_PER_CARD_PX = 20; // each subsequent card offset for stacking effect
const SCROLL_HEIGHT_PER_CARD_VH = 100; // each card gets 100vh of scroll distance
const HEADER_Z_INDEX = 50;             // z-index for sticky header (well above card range)
const CARD_Z_INDEX_BASE = 10;          // base z-index for cards (cards use 10 + index)

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

  const count = educationData.length;

  return (
    <section
      id="education"
      className="bg-gray-50 dark:bg-zinc-950 relative"
      style={{ zIndex: 2 }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading - Sticky at top */}
        <div 
          className="sticky top-0 bg-gray-50/95 dark:bg-zinc-950/95 backdrop-blur-sm pt-16 pb-8"
          style={{ zIndex: HEADER_Z_INDEX }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-6 border border-blue-500/20">
              <GraduationCap className="w-4 h-4" />
              Academic Journey
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-foreground mb-4 leading-[1.1] tracking-tight">
              Forging Knowledge into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                Innovation
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              A strong educational foundation in Electronics, Mathematics & Physics — powering expertise in{" "}
              <span className="text-foreground font-medium">Robotics</span>,{" "}
              <span className="text-foreground font-medium">Embedded Systems</span>, and{" "}
              <span className="text-foreground font-medium">Autonomous Navigation</span>.
            </p>
          </div>
        </div>

        {/* Sticky Stacking Cards — CSS-Tricks inspired approach */}
        <div 
          className="relative"
          style={{ 
            // Total scroll height: enough for each card to have its own scroll section
            minHeight: `${count * SCROLL_HEIGHT_PER_CARD_VH}vh` 
          }}
        >
          {educationData.map((edu, index) => {
            const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const heroImg = edu.hero_image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
            const gradeColor = GRADE_COLORS[index % GRADE_COLORS.length];

            return (
              <div
                key={edu.id}
                className="sticky"
                style={{
                  // Each card sticks slightly lower than the previous, creating stack effect
                  top: `${STICKY_TOP_BASE_PX + index * STICKY_OFFSET_PER_CARD_PX}px`,
                  // Z-index ensures later cards appear on top of earlier ones
                  zIndex: CARD_Z_INDEX_BASE + index,
                  // Add bottom padding for scroll space (except last card)
                  paddingBottom: index < count - 1 ? `${SCROLL_HEIGHT_PER_CARD_VH - 20}vh` : '4rem',
                }}
              >
                {/* Card with glassmorphism effect */}
                <div 
                  className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl transition-all duration-500"
                  style={{
                    // Subtle shadow that intensifies for cards on top
                    boxShadow: `0 ${20 + index * 5}px ${40 + index * 10}px -15px rgba(0, 0, 0, 0.2)`,
                  }}
                >
                  {/* Hero Image with gradient overlay */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-70 z-10`} />
                    <Image
                      src={heroImg}
                      fill
                      className="object-cover"
                      alt={edu.institution_name}
                      sizes="(max-width: 768px) 100vw, 896px"
                      priority={index === 0}
                    />
                    {/* Card index badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wide">
                        {edu.degree.split(' ')[0]}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-mono">
                        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Degree title overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{edu.degree}</h3>
                      <p className="text-white/80 text-base">{edu.major}</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    {/* Institution and meta info */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5 font-semibold text-foreground text-base">
                        <GraduationCap className="w-5 h-5 text-blue-500 shrink-0" />
                        {edu.institution_name}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                      {edu.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 shrink-0" />
                          {edu.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 shrink-0" />
                        {edu.start_year} – {edu.is_current ? 'Present' : edu.end_year || 'N/A'}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{edu.description}</p>
                    )}

                    {edu.grade && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">
                          {edu.grade.includes('CGPA') || edu.grade.includes('/10') ? 'CGPA' : 'Grade'}:
                        </span>
                        <span className={`text-lg font-bold ${gradeColor}`}>{edu.grade}</span>
                      </div>
                    )}
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
