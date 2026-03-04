"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT_COLORS = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-green-500",
  "from-purple-500 to-pink-500",
  "from-yellow-500 to-orange-500",
  "from-rose-500 to-fuchsia-500",
  "from-teal-500 to-lime-500",
];

interface DBProject {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  tech_stack?: string[];
  hero_image_url?: string;
  is_featured?: boolean;
  status?: string;
  category_id?: string;
  project_categories?: { name: string } | null;
}

// Fallback projects for when DB is not set up
const FALLBACK_PROJECTS = [
  {
    title: "IRAVATH",
    category: "Autonomous Navigation",
    description:
      "Autonomous Rover with 3D-printed components, trained for object detection and measurement, Rocker-Boggie mechanism for terrain stability.",
    tech: ["ROS", "NavStack", "Jetson", "ML"],
    image: "/images/projects/iravath.jpg",
    link: "/projects/iravath",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "DWA LOCAL PLANNER",
    category: "Path Planning",
    description:
      "Custom Local DWA Planner without standard nav2 packages. Implemented algorithm from scratch for better control in constrained environments.",
    tech: ["ROS2", "Gazebo", "RViz", "C++"],
    image: "/images/projects/dwa_planner.jpg",
    link: "/projects/dwa-planner",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "MECANUM ROBOT",
    category: "Mobile Robotics",
    description:
      "Mecanum wheeled robot with manipulator for Agriculture and Hospitality. Omnidirectional movement capabilities.",
    tech: ["Arduino", "Gazebo", "ROS", "Python"],
    image: "/images/projects/mecanum.jpg",
    link: "/projects/mecanum-robot",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "MODULAR MFG SYSTEM",
    category: "Industrial Automation",
    description:
      "Automated manufacturing system using onboard sensor data. Integration of PLCs and pneumatic systems for efficient production.",
    tech: ["Pneumatics", "PLC", "Arduino", "IoT"],
    image: "/images/projects/modular-mfg.jpg",
    link: "/projects/modular-mfg",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "ROBOTIC ARM",
    category: "Manipulators",
    description:
      "6DOF Robotic Arm designed in Fusion 360, 3D printed, controlled via mobile app. Inverse kinematics implementation for precise control.",
    tech: ["Arduino", "Custom PCB", "Android", "C++"],
    image: "/images/projects/robotic-arm.jpg",
    link: "/projects/robotic-arm",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?featured=true&status=published');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const mapped = result.data.map((p: DBProject, i: number) => ({
            title: p.title,
            category: p.project_categories?.name || '',
            description: p.short_description || '',
            tech: p.tech_stack || [],
            image: p.hero_image_url || '',
            link: `/projects/${p.slug}`,
            color: GRADIENT_COLORS[i % GRADIENT_COLORS.length],
          }));
          setProjects(mapped);
        }
      } catch {
        console.log('Using fallback projects');
      }
    };
    fetchProjects();
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Only apply GSAP horizontal scroll on larger screens (>= 768px)
    if (window.innerWidth < 768) return;

    // Calculate the exact amount of horizontal scroll needed
    const getScrollAmount = () => {
      return -(container.scrollWidth - window.innerWidth);
    };

    // Horizontal scroll animation — pinned and scrubbed
    gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // End distance = horizontal overflow + extra buffer for smooth exit
        end: () => `+=${container.scrollWidth - window.innerWidth + 200}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Fade-in and slide-up the section header
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="relative w-full overflow-hidden bg-black text-white">

      {/* Section Header — visible at the top before you scroll horizontally */}
      <div ref={headerRef} className="pt-20 pb-8 px-4 sm:px-6 md:px-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-4">
          <Rocket className="w-4 h-4 text-[#D71921]" />
          <span>Featured Work</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-bold font-display leading-tight">
          PROJECTS
        </h2>
        <p className="text-gray-400 text-lg mt-4 max-w-xl">
          A curated selection of my robotics and engineering projects — from autonomous rovers to industrial automation.
        </p>
      </div>

      {/* Horizontal Scroll Container — desktop */}
      <div ref={containerRef} className="hidden md:flex h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] w-fit items-center px-10 md:px-20 gap-8 pb-10">

        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative h-[50vh] sm:h-[55vh] md:h-[55vh] lg:h-[60vh] min-h-[350px] w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw] shrink-0 bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-2xl"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

            {/* Content Container */}
            <div className="absolute inset-0 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end z-10">
              <div className="mb-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-xs font-mono mb-4 sm:mb-6 border border-white/10 text-white/80">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight">{project.title}</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 md:mb-8 line-clamp-4 text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 md:mb-8">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-black/50 rounded text-xs text-gray-400 font-mono border border-white/5">#{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href={project.link}>
                  <Button className="rounded-full bg-white text-black hover:bg-gray-200 border-none px-6">View Project <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </div>
            </div>

            {/* Big Number Decoration */}
            <div className="absolute top-4 right-6 text-white/5 font-black text-8xl md:text-9xl select-none font-display">
              0{index + 1}
            </div>
          </div>
        ))}

        {/* View All CTA */}
        <div className="h-[50vh] md:h-[55vh] lg:h-[60vh] min-h-[350px] w-[50vw] sm:w-[40vw] md:w-[35vw] shrink-0 flex items-center justify-center">
          <Link href="/projects">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full border border-white/20 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden backdrop-blur-sm bg-white/5">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <span className="text-2xl font-bold group-hover:scale-110 transition-transform relative z-10">View All</span>
              <span className="text-sm text-gray-400 group-hover:text-black mt-2 relative z-10">See Archive</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile vertical card layout (< 768px) */}
      <div className="flex md:hidden flex-col gap-6 px-4 pb-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative min-h-[350px] w-full bg-gray-900 rounded-3xl overflow-hidden border border-white/10"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />

            {/* Content Container */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
              <div className="mb-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-xs font-mono mb-4 border border-white/10 text-white/80">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold font-display leading-tight">{project.title}</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4 line-clamp-4 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-black/50 rounded text-xs text-gray-400 font-mono border border-white/5">#{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href={project.link}>
                  <Button className="rounded-full bg-white text-black hover:bg-gray-200 border-none px-6">View Project <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </div>
            </div>

            {/* Big Number Decoration */}
            <div className="absolute top-4 right-6 text-white/5 font-black text-8xl select-none font-display">
              0{index + 1}
            </div>
          </div>
        ))}

        {/* View All CTA — mobile */}
        <div className="flex items-center justify-center py-8">
          <Link href="/projects">
            <div className="w-36 h-36 rounded-full border border-white/20 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden backdrop-blur-sm bg-white/5">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <span className="text-xl font-bold group-hover:scale-110 transition-transform relative z-10">View All</span>
              <span className="text-xs text-gray-400 group-hover:text-black mt-1 relative z-10">See Archive</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
