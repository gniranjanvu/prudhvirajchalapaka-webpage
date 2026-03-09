"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Experience type for database records
interface DBExperience {
  id: string;
  role: string;
  company_name: string;
  hero_image_url?: string;
  company_logo_url?: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  employment_type?: string;
  description?: string;
  tech_stack?: string[];
  is_published?: boolean;
}

// Fallback experiences
const FALLBACK_EXPERIENCES: DBExperience[] = [
  {
    id: '1',
    role: 'Robotics Engineer Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Chennai, India',
    start_date: '2025-05-01',
    end_date: '2025-11-01',
    is_current: true,
    employment_type: 'internship',
    description: 'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems.',
    tech_stack: ['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'SLAM'],
    hero_image_url: '',
    is_published: true,
  },
  {
    id: '2',
    role: 'Teaching Assistantship Intern',
    company_name: "Vignan's University",
    location: 'Guntur, India',
    start_date: '2025-01-01',
    end_date: '2025-04-30',
    is_current: false,
    employment_type: 'internship',
    description: 'Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects.',
    tech_stack: ['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'],
    hero_image_url: '',
    is_published: true,
  },
  {
    id: '3',
    role: 'ROS Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Online',
    start_date: '2025-01-01',
    end_date: '2025-02-28',
    is_current: false,
    employment_type: 'internship',
    description: 'Focused on learning and implementing ROS concepts. Developed ROS-based applications and worked on simulation environments.',
    tech_stack: ['ROS', 'ROS2', 'Python', 'Gazebo', 'Linux'],
    hero_image_url: '',
    is_published: true,
  },
];

const MAX_DISPLAYED_TECHNOLOGIES = 5;

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<DBExperience[]>(FALLBACK_EXPERIENCES);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const formatDate = useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  }, []);

  // Fetch experiences from database
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const published = result.data.filter((exp: DBExperience) => exp.is_published !== false);
          if (published.length > 0) {
            setExperiences(published);
          }
        }
      } catch {
        console.log('Using fallback experiences');
      }
    };
    fetchExperiences();
  }, []);

  // Set up GSAP Pinning and Scrubbing
  useEffect(() => {
    if (!experiences.length || !navTrackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = navTrackRef.current!;
      const cards = cardRefs.current.filter(Boolean);
      const links = navLinksRef.current.filter(Boolean);
      const progressLine = progressLineRef.current!;
      const dot = dotRef.current!;

      if (cards.length === 0) return;

      const tl = gsap.timeline();

      if (cards.length > 1) {
        cards.forEach((card, i) => {
          if (i === 0) {
            // First card is fully visible at start
            gsap.set(card, { autoAlpha: 1, y: 0, scale: 1 });
            if (links[0]) gsap.set(links[0], { color: '#D71921', scale: 1.25 });
          } else {
            // Subsequent cards start hidden and translated down
            gsap.set(card, { autoAlpha: 0, y: 50, scale: 0.95 });
            if (links[i]) gsap.set(links[i], { color: '#6b7280', scale: 1 });

            // Each transition starts when the previous one ends (i - 1)
            const startTime = i - 1;

            // Fade/Slide out the previous card
            tl.to(cards[i - 1], {
              autoAlpha: 0,
              y: -50,
              scale: 0.95,
              duration: 1,
              ease: 'power2.inOut'
            }, startTime);

            // Fade/Slide in the new card
            tl.to(card, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.inOut'
            }, startTime);

            const link = links[i];
            const prevLink = links[i - 1];

            if (link) {
              // Calculate exact relative center to the track container
              const trackRect = track.getBoundingClientRect();
              const linkRect = link.getBoundingClientRect();
              const linkCenter = (linkRect.left - trackRect.left) + track.scrollLeft + (linkRect.width / 2);

              // Scrub dot and red progress line to the active text
              tl.to(dot, { x: linkCenter, duration: 1, ease: 'power2.inOut' }, startTime);
              tl.to(progressLine, { width: linkCenter, duration: 1, ease: 'power2.inOut' }, startTime);

              // Timeline header link styles sync
              if (prevLink) tl.to(prevLink, { color: '#6b7280', scale: 1, duration: 0.5 }, startTime);
              tl.to(link, { color: '#D71921', scale: 1.25, duration: 0.5 }, startTime + 0.5);

              // Safely auto-scroll track if window is too small
              const maxTrackScroll = track.scrollWidth - track.clientWidth;
              if (maxTrackScroll > 0) {
                const targetX = linkCenter - track.clientWidth / 2;
                const safeScrollX = Math.max(0, Math.min(targetX, maxTrackScroll));
                tl.to(track, { scrollLeft: safeScrollX, duration: 1, ease: 'power2.inOut' }, startTime);
              }
            }
          }
        });

        // Initialize dot & line position to first item safely
        if (links[0]) {
          const trackRect = track.getBoundingClientRect();
          const linkRect = links[0].getBoundingClientRect();
          const startX = (linkRect.left - trackRect.left) + track.scrollLeft + (linkRect.width / 2);
          gsap.set(dot, { x: startX });
          gsap.set(progressLine, { width: startX });
        }

        // Create the strictly-pinned ScrollTrigger
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cards.length * 50}%`, // Reduced mathematically for shorter scroll!
          pin: true,
          pinSpacing: true,    // Required to reserve scroll space globally and stop overlaps! 
          animation: tl,
          scrub: 1.5,          // Increased scrub smoothness mapping
          invalidateOnRefresh: true,
        });

      }

      // VERY IMPORTANT: Force a global refresh so subsequent pinned sections 
      // (like Projects! ) recalculate their start offsets perfectly! 
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 500);

    }, sectionRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section
      id="experience"
      ref={sectionRef as any}
      // Strictly 100vh bound. Nothing scrolls freely out of height bounds.
      className="relative w-full h-screen overflow-hidden flex flex-col pointer-events-auto z-10 transition-colors duration-500 text-gray-900 dark:text-white bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#1a0a1e] dark:via-[#2d0a1e] dark:to-[#0f0a14]"
    >
      {/* Warm Sunset Gradient Blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-orange-400/15 dark:bg-[#F15209]/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] bg-pink-400/15 dark:bg-[#E72382]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-red-400/15 dark:bg-[#E72333]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-orange-300/10 dark:bg-[#F15209]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] right-[40%] w-[300px] h-[300px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* FIXED HEADER AND NAV TIMELINE TRACK */}
      <div className="w-full flex-none z-50 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/10 shadow-lg relative pt-12 md:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center container mx-auto px-6 mb-8">
          <span className="px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-sm font-mono tracking-widest uppercase mb-4 text-gray-600 dark:text-gray-300 inline-flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-red-500" />
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Experience</span>
          </h2>
        </div>

        {/* GSAP Timeline Nav Track with Visual Playhead */}
        <div className="w-full h-20 relative flex items-center overflow-hidden border-t border-black/5 dark:border-white/5">
          <div ref={navTrackRef} className="flex relative items-center w-full h-full overflow-x-hidden scrollbar-hide px-8 lg:px-24">

            {/* The stationary grey background line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black/10 dark:bg-white/10 -translate-y-1/2 pointer-events-none" />

            {/* The animated red progress line measuring length */}
            <div ref={progressLineRef} className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-red-600 to-red-500 -translate-y-1/2 z-10 origin-left pointer-events-none shadow-[0_0_15px_rgba(215,25,33,0.8)] w-0" />

            {/* The tracking dot head */}
            <div ref={dotRef} className="absolute top-1/2 left-0 w-3 h-3 bg-red-600 rounded-full -translate-y-1/2 -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(215,25,33,1)] pointer-events-none border border-white dark:border-black" />

            <ul className="flex list-none p-0 m-0 gap-24 md:gap-40 items-center h-full relative z-30 min-w-max mx-auto lg:mx-0">
              {experiences.map((exp, i) => (
                <li key={exp.id} className="h-full flex items-center relative">
                  <a
                    href={`#exp-card-${exp.id}`}
                    ref={el => { navLinksRef.current[i] = el; }}
                    onClick={(e) => e.preventDefault()}
                    className="relative block min-w-[6rem] px-4 py-2 text-center font-mono font-bold text-gray-500 transition-colors duration-200"
                  >
                    <span className="block pointer-events-none select-none hover:text-gray-900 dark:hover:text-white cursor-default">
                      {formatDate(exp.start_date)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ABSOLUTE OVERLAPPING CARDS DISPLAY */}
      <div className="relative flex-1 container mx-auto px-4 sm:px-6 max-w-5xl z-40 my-8">
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            ref={el => { cardRefs.current[i] = el; }}
            // Absolutely position all cards to sit directly on top of each other! No blank space below.
            className="absolute inset-0 w-full h-full flex flex-col justify-center max-h-full"
          >
            {/* THE MAGNIFICENT LIQUID GLASS CARD */}
            <div className="w-full max-h-full overflow-y-auto scrollbar-hide bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]" />

              {/* Left side: Timeline & Company Info */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-10">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center p-4 shadow-sm">
                  {exp.company_logo_url || exp.hero_image_url ? (
                    <Image
                      src={(exp.company_logo_url || exp.hero_image_url) as string}
                      alt={exp.company_name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  ) : (
                    <Building2 className="w-10 h-10 md:w-14 md:h-14 text-gray-400 dark:text-white/30" />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display mb-2 text-gray-900 dark:text-white">{exp.company_name}</h3>
                  <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 font-mono text-xs md:text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{formatDate(exp.start_date)} - {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side: Role & Details */}
              <div className="w-full lg:w-2/3 flex flex-col justify-center relative z-10 py-4">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                  <span className={`px-3 py-1.5 md:px-4 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase border ${exp.is_current ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-400 border-black/10 dark:border-white/10'}`}>
                    {exp.is_current ? 'Current Role' : 'Completed'}
                  </span>
                  {exp.employment_type && (
                    <span className="px-3 py-1.5 md:px-4 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300">
                      {exp.employment_type}
                    </span>
                  )}
                </div>

                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">{exp.role}</h4>

                {exp.description && (
                  <div
                    className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 prose prose-gray dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}

                {exp.tech_stack && exp.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {exp.tech_stack.slice(0, MAX_DISPLAYED_TECHNOLOGIES).map(tech => (
                      <span key={tech} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/5 rounded-2xl text-xs md:text-sm font-mono text-gray-800 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors cursor-default">
                        #{tech}
                      </span>
                    ))}
                  </div>
                )}

                <Link href={`/experience/${exp.id}`} className="group inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 w-fit shadow-lg shadow-black/10 dark:shadow-white/10">
                  View Details
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white dark:text-black group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
