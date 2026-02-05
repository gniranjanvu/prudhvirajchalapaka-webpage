"use client";

import { ParallaxScrollCards } from "@/components/ui/ParallaxScrollCards";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";

// Maximum number of technologies to display on the card
const MAX_DISPLAYED_TECHNOLOGIES = 4;

export default function ExperienceSection() {
  const content = EXPERIENCES.map((exp, index) => ({
    title: `${exp.role}${exp.isCurrent ? ' (Current)' : ''}`,
    description: exp.description,
    content: (
      <div className="h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Briefcase className="w-12 h-12" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold">{exp.role}</h3>
          
          <div className="space-y-2 text-white/90">
            <p className="text-lg font-semibold">{exp.company}</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {exp.technologies.slice(0, MAX_DISPLAYED_TECHNOLOGIES).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link href={`/experience/${exp.id}`}>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 transition-all"
            >
              Know More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    ),
  }));

  return (
    <section id="experience" className="relative bg-black overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
            Professional Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white">
            Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional timeline showcasing roles and accomplishments in robotics and automation
          </p>
        </div>
      </div>

      {/* Parallax Cards */}
      <ParallaxScrollCards content={content} />
    </section>
  );
}
