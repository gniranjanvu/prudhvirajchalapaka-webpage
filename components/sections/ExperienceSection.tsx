"use client";

import { useRef } from "react";
import { StickyScroll } from "@/components/ui/StickyScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const content = [
  {
    title: "Robotics Engineer Intern (Current)",
    description:
      "Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems. Developing solutions for mobile robots and implementing NavStack for navigation. Technologies: ROS2, Python, C++, NavStack, Gazebo, SLAM.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex flex-col items-center justify-center text-white p-10">
        <h3 className="text-2xl font-bold mb-4">Robotics Intern</h3>
        <Link href="/experience/robotics-intern">
          <Button variant="outline" className="border-white text-white hover:bg-white/20">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    ),
  },
  {
    title: "Teaching Assistantship Intern",
    description:
      "Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects. Conducted lab sessions and helped with curriculum development.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] flex flex-col items-center justify-center text-white p-10">
        <h3 className="text-2xl font-bold mb-4">Teaching Assistant</h3>
        <Link href="/experience/teaching-assistant">
          <Button variant="outline" className="border-white text-white hover:bg-white/20">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    ),
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-black dark:bg-black relative overflow-hidden">
      {/* Parallax Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.3]),
        }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-display text-white mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            My professional timeline.
          </motion.p>
        </motion.div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
