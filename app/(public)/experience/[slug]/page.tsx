'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { use } from 'react'

const experienceData: Record<string, any> = {
  'robotics-engineer-karthikesh': {
    role: 'Robotics Engineer Intern',
    company: 'Karthikesh Robotics',
    location: 'Chennai, India',
    period: 'May 2025 - Nov 2025',
    type: 'Full-time Internship',
    description: 'Developed Autonomous Mobile Robots with advanced navigation capabilities. Worked extensively with ROS2 framework and visualization tools. Implemented path planning algorithms for industrial automation systems.',
    responsibilities: [
      'Developed autonomous navigation systems using ROS2 and NavStack',
      'Implemented SLAM algorithms for robot localization and mapping',
      'Created custom path planning algorithms for industrial environments',
      'Integrated sensors including LiDAR, IMU, and cameras',
      'Designed and tested robot control systems in Gazebo simulation',
      'Collaborated with team on multi-robot coordination systems',
    ],
    achievements: [
      'Successfully deployed 3 autonomous mobile robots in production',
      'Reduced navigation errors by 40% through algorithm optimization',
      'Developed reusable ROS2 packages for the team',
    ],
    technologies: ['ROS2', 'Python', 'C++', 'Navigation', 'SLAM', 'Gazebo', 'RViz'],
    skills: ['Autonomous Navigation', 'Path Planning', 'Robot Operating System', 'Sensor Fusion'],
  },
  'teaching-assistant-vignans': {
    role: 'Teaching Assistantship Intern',
    company: "Vignan's University",
    location: 'Guntur, India',
    period: 'Jan 2025 - Apr 2025',
    type: 'Part-time',
    description: 'Taught ROS in practical sessions for undergraduate students. Conducted research on autonomous robots and assisted in projects.',
    responsibilities: [
      'Conducted practical sessions on ROS for 50+ students',
      'Mentored students on robotics projects',
      'Assisted in research on autonomous navigation',
      'Helped students with kinematical and dynamical analysis',
      'Prepared course materials and assignments',
    ],
    achievements: [
      'Improved student practical understanding by 60%',
      'Guided 10+ student projects to successful completion',
      'Developed new lab exercises for ROS course',
    ],
    technologies: ['ROS', 'Teaching', 'Research', 'Kinematics', 'Python'],
    skills: ['Teaching', 'Mentoring', 'Research', 'Technical Documentation'],
  },
  'ros-intern-karthikesh': {
    role: 'ROS Intern',
    company: 'Karthikesh Robotics',
    location: 'Online',
    period: 'Jan 2025 - Feb 2025',
    type: 'Remote Internship',
    description: 'Intensive training in ROS2 Framework fundamentals. Learned Docker containerization for ROS applications.',
    responsibilities: [
      'Completed comprehensive ROS2 training program',
      'Learned Docker for ROS application deployment',
      'Developed GUI applications using Qt and RViz',
      'Created ROS2 packages and nodes',
      'Practiced with various ROS2 tools and libraries',
    ],
    technologies: ['ROS2', 'Docker', 'Linux', 'Qt', 'RViz'],
    skills: ['ROS2', 'Containerization', 'GUI Development', 'Linux'],
  },
}

export default function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const experience = experienceData[slug]

  if (!experience) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Experience Not Found</h1>
            <Link href="/#experience">
              <Button variant="accent">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black pt-20">
        {/* Header */}
        <section className="py-20 gradient-mesh">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/#experience" className="text-accent hover:underline mb-4 inline-block">
                ← Back to Experience
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{experience.role}</h1>
              <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
                {experience.company}
              </p>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <span>📍 {experience.location}</span>
                <span>📅 {experience.period}</span>
                <Badge>{experience.type}</Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {experience.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Responsibilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Key Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {experience.responsibilities.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-accent mr-3 mt-1">▸</span>
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Achievements */}
                {experience.achievements && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="glass-card bg-gradient-to-br from-accent/5 to-purple-500/5">
                      <CardHeader>
                        <CardTitle>Key Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {experience.achievements.map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-accent mr-3">🏆</span>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech: string) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Skills Developed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {experience.skills.map((skill: string) => (
                          <div
                            key={skill}
                            className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                          >
                            <span className="text-accent mr-2">✓</span>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
