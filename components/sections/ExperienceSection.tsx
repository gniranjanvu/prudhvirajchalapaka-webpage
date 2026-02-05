"use client";

import { StickyScroll } from "@/components/ui/StickyScrollReveal";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  return (
    <section id="experience" className="py-20 bg-black dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Experience</h2>
          <p className="text-gray-400 max-w-xl">My professional timeline.</p>
        </div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
