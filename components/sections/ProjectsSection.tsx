"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "IRAVATH",
    category: "Autonomous Navigation",
    description:
      "Autonomous Rover with 3D-printed components, trained for object detection and measurement, Rocker-Boggie mechanism for terrain stability.",
    tech: ["ROS", "NavStack", "Jetson", "ML"],
    image: "/images/projects/iravath.jpg", // Placeholder
    link: "/projects/iravath",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "DWA LOCAL PLANNER",
    category: "Path Planning",
    description:
      "Custom Local DWA Planner without standard nav2 packages. Implemented algorithm from scratch for better control in constrained environments.",
    tech: ["ROS2", "Gazebo", "RViz", "C++"],
    image: "/images/projects/dwa_planner.jpg", // Placeholder
    link: "/projects/dwa-planner",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "MECANUM ROBOT",
    category: "Mobile Robotics",
    description:
      "Mecanum wheeled robot with manipulator for Agriculture and Hospitality. Omnidirectional movement capabilities.",
    tech: ["Arduino", "Gazebo", "ROS", "Python"],
    image: "/images/projects/mecanum.jpg", // Placeholder
    link: "/projects/mecanum-robot",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "MODULAR MFG SYSTEM",
    category: "Industrial Automation",
    description:
      "Automated manufacturing system using onboard sensor data. Integration of PLCs and pneumatic systems for efficient production.",
    tech: ["Pneumatics", "PLC", "Arduino", "IoT"],
    image: "/images/projects/modular-mfg.jpg", // Placeholder
    link: "/projects/modular-mfg",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "ROBOTIC ARM",
    category: "Manipulators",
    description:
      "6DOF Robotic Arm designed in Fusion 360, 3D printed, controlled via mobile app. Inverse kinematics implementation for precise control.",
    tech: ["Arduino", "Custom PCB", "Android", "C++"],
    image: "/images/projects/robotic-arm.jpg", // Placeholder
    link: "/projects/robotic-arm",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shatterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const shatter = shatterRef.current;

    if (!section || !container || !shatter) return;

    // Create fragments dynamically
    shatter.innerHTML = '';
    const numFragments = 20;
    const fragments: HTMLDivElement[] = [];

    for (let i = 0; i < numFragments; i++) {
      const frag = document.createElement("div");
      frag.className = "absolute bg-zinc-900 border border-white/5";

      // Random positioning grid 5x4
      const width = 100 / 5;
      const height = 100 / 4;
      const x = (i % 5) * width;
      const y = Math.floor(i / 5) * height;

      frag.style.left = `${x}%`;
      frag.style.top = `${y}%`;
      frag.style.width = `${width}%`;
      frag.style.height = `${height}%`;
      frag.style.clipPath = `polygon(
            ${Math.random() * 20}% ${Math.random() * 20}%, 
            ${100 - Math.random() * 20}% ${Math.random() * 20}%, 
            ${100 - Math.random() * 20}% ${100 - Math.random() * 20}%, 
            ${Math.random() * 20}% ${100 - Math.random() * 20}%
        )`;

      shatter.appendChild(frag);
      fragments.push(frag);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
      },
    });

    // 1. Shatter Phase
    tl.to(fragments, {
      x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
      rotation: () => Math.random() * 360,
      scale: 0,
      opacity: 0,
      stagger: { amount: 0.5, from: "center" },
      ease: "power2.in",
      duration: 1
    })
      .set(shatter, { display: "none" })

      // 2. Horizontal Scroll Phase
      .to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 2
      });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* Shatter Overlay */}
      <div ref={shatterRef} className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-900">
        <h2 className="text-6xl md:text-9xl font-bold font-display text-white relative z-10 pointer-events-none mix-blend-difference">PROJECTS</h2>
      </div>

      {/* Horizontal Container */}
      <div ref={containerRef} className="flex h-full w-fit items-center px-10 md:px-20 gap-10">

        {/* Intro Card */}
        <div className="w-[80vw] md:w-[30vw] shrink-0">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 font-display">Featured Work</h3>
          <p className="text-gray-400 text-lg">
            Explore a curated selection of my robotics and engineering projects.
            <br className="hidden md:block" />
            From autonomous rovers to industrial automation.
          </p>
        </div>

        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative h-[60vh] md:h-[70vh] w-[85vw] md:w-[60vh] shrink-0 bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-2xl"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
              <div className="mb-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md text-xs font-mono mb-6 border border-white/10 text-white/80">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold font-display leading-tight">{project.title}</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8 line-clamp-4 text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
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
            <div className="absolute top-4 right-6 text-white/5 font-black text-8xl md:text-9xl -z-10 select-none font-display">
              0{index + 1}
            </div>
          </div>
        ))}

        {/* View All CTA */}
        <div className="h-[60vh] md:h-[70vh] w-[80vw] md:w-[40vw] shrink-0 flex items-center justify-center">
          <Link href="/projects">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden backdrop-blur-sm bg-white/5">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <span className="text-2xl font-bold group-hover:scale-110 transition-transform relative z-10">View All</span>
              <span className="text-sm text-gray-400 group-hover:text-black mt-2 relative z-10">See Archive</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
