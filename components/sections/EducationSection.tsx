"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function EducationSection() {
  return (
    <section id="education" className="pt-20 pb-0 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" /> Academic Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6 leading-tight">
            Forging Knowledge into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My educational background laid the foundation for my expertise in Robotics and Embedded Systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Degree 1 */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">

              <CardItem translateZ="100" className="w-full mt-4 mb-6">
                <div className="relative w-full h-48 rounded-xl overflow-hidden group-hover/card:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 opacity-80 z-10 mix-blend-multiply" />
                  <Image
                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc2549c1?q=80&w=2070&auto=format&fit=crop"
                    height="1000"
                    width="1000"
                    className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                    alt="University"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <GraduationCap className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-white font-bold text-lg">B.Tech</h3>
                  </div>
                </div>
              </CardItem>

              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Bachelor of Technology
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Electronics and Communication Engineering
              </CardItem>
              <CardItem
                as="p"
                translateZ="40"
                className="text-neutral-500 text-xs mt-2 dark:text-neutral-400 font-mono"
              >
                Vignan's Foundation (2021 - Present)
              </CardItem>
              <CardItem translateZ="80" className="w-full mt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-gray-100 dark:bg-zinc-900 p-3 rounded-lg">
                    <span className="text-sm font-semibold">CGPA</span>
                    <span className="text-lg font-bold text-blue-500">8.5/10</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">Specialization in Robotics & Embedded Systems. Active member of Robotics Club.</div>
                </div>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  2021-2025
                </CardItem>
                <CardItem translateZ={20}>
                  <Link href="/education/btech">
                    <Button size="sm" className="bg-black dark:bg-white dark:text-black text-white text-xs font-bold px-4 py-2 rounded-xl">
                      Know More
                    </Button>
                  </Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Degree 2 */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">

              <CardItem translateZ="100" className="w-full mt-4 mb-6">
                <div className="relative w-full h-48 rounded-xl overflow-hidden group-hover/card:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-80 z-10 mix-blend-multiply" />
                  <Image
                    src="https://images.unsplash.com/photo-1544531838-3dc52c41624b?q=80&w=2070&auto=format&fit=crop"
                    height="1000"
                    width="1000"
                    className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                    alt="College"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <GraduationCap className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-white font-bold text-lg">Intermediate</h3>
                  </div>
                </div>
              </CardItem>

              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Intermediate (12th)
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                MPC - Mathematics, Physics, Chemistry
              </CardItem>
              <CardItem
                as="p"
                translateZ="40"
                className="text-neutral-500 text-xs mt-2 dark:text-neutral-400 font-mono"
              >
                Narayana Junior College (2019 - 2021)
              </CardItem>
              <CardItem translateZ="80" className="w-full mt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-gray-100 dark:bg-zinc-900 p-3 rounded-lg">
                    <span className="text-sm font-semibold">Grade</span>
                    <span className="text-lg font-bold text-purple-500">96%</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">Focus on advanced mathematics and physical sciences.</div>
                </div>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  2019-2021
                </CardItem>
                <CardItem translateZ={20}>
                  <Link href="/education/intermediate">
                    <Button size="sm" className="bg-black dark:bg-white dark:text-black text-white text-xs font-bold px-4 py-2 rounded-xl">
                      Know More
                    </Button>
                  </Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
}
