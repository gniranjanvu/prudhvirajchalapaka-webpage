"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { EXPERIENCES } from "@/lib/constants";
import { use } from "react";

interface ExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const resolvedParams = use(params);
  const experienceId = parseInt(resolvedParams.id, 10);
  
  // Find the experience by ID
  const experience = EXPERIENCES.find((exp) => exp.id === experienceId);

  // Redirect to experience section if experience not found
  if (!experience) {
    redirect("/#experience");
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/#experience">
            <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              Back to Experience
            </Button>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {experience.isCurrent && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full border border-green-500/20">
                    Current Role
                  </span>
                )}
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20 capitalize">
                  {experience.type}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                {experience.role}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  <span className="text-lg font-medium">{experience.company}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>{experience.location}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>{experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}</span>
                </div>
              </div>
            </div>
            
            {/* Company Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-2xl font-bold font-display mb-6">About This Role</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {experience.description}
              </p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Technologies Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold font-display mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold font-display mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-gray-400">Type</span>
                  <span className="font-medium capitalize">{experience.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="font-medium">
                    {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className={`font-medium ${experience.isCurrent ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}`}>
                    {experience.isCurrent ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other Experiences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold font-display mb-6">Other Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.filter((exp) => exp.id !== experienceId).map((exp) => (
              <Link
                key={exp.id}
                href={`/experience/${exp.id}`}
                className="group bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-accent group-hover:to-purple-600 transition-all duration-300">
                    <Briefcase className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="font-bold font-display mb-2 group-hover:text-accent transition-colors">
                  {exp.role}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{exp.company}</p>
                <p className="text-gray-500 dark:text-gray-500 text-xs">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
