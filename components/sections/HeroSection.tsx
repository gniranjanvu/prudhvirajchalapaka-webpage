"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Download } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";

const Lanyard = dynamic(() => import('@/components/ui/Lanyard'), { ssr: false });

const stickers = [
  { text: "#ROS2 🤖", x: "10%", y: "20%", rotate: -10, delay: 0 },
  { text: "#AI 🧠", x: "85%", y: "15%", rotate: 15, delay: 0.5 },
  { text: "#Embedded ⚡", x: "5%", y: "60%", rotate: 5, delay: 1 },
  { text: "#PLC 🔧", x: "80%", y: "70%", rotate: -8, delay: 1.5 },
  { text: "#Vision 👁️", x: "15%", y: "85%", rotate: 12, delay: 2 },
  { text: "#Debugging 🐛", x: "75%", y: "40%", rotate: -5, delay: 2.5 },
  { text: "#Gazebo 🌐", x: "50%", y: "90%", rotate: 0, delay: 3 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-dot-pattern">
      <MouseSpotlight />

      {/* Background Decorative Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Stickers */}
      {stickers.map((sticker, i) => (
        <motion.div
          key={sticker.text}
          className="absolute z-20 px-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-sm font-mono font-bold text-foreground shadow-lg pointer-events-none select-none"
          style={{
            left: sticker.x,
            top: sticker.y,
            rotate: sticker.rotate
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: sticker.delay },
            scale: { duration: 0.5, delay: sticker.delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
          }}
        >
          {sticker.text}
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="container relative z-10 px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
          
          {/* Left: Lanyard */}
          <div className="h-[500px] lg:h-[600px] relative">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
          
          {/* Right: Text content */}
          <div className="flex flex-col items-start gap-6">
            <TextReveal text="PRUDHVI RAJ" className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-foreground" delay={0.3} />
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md text-xs font-mono animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
              <span>AVAILABLE FOR RESEARCH & COLLABORATION</span>
            </div>

            {/* Typewriter Subtitle */}
            <div className="h-12 overflow-hidden">
              <TypewriterEffect
                words={[
                  { text: "Robotics & Automation Engineer", className: "text-xl md:text-2xl text-muted-foreground font-mono text-[#D71921]" },
                  { text: "ROS/ROS2 Developer", className: "text-xl md:text-2xl text-muted-foreground font-mono text-blue-500" },
                  { text: "Industrial Automation Specialist", className: "text-xl md:text-2xl text-muted-foreground font-mono text-green-500" },
                  { text: "Research Enthusiast", className: "text-xl md:text-2xl text-muted-foreground font-mono text-purple-500" },
                ]}
                className="text-xl md:text-2xl"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
              <a href="/api/resume/download">
                <Button variant="default" size="lg" className="rounded-full px-8 bg-[#D71921] hover:bg-[#b0151b] text-white">
                  <Download className="mr-2 w-4 h-4" /> Download Resume
                </Button>
              </a>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm">
                  View Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground to-transparent" />
      </div>
    </section>
  );
}
