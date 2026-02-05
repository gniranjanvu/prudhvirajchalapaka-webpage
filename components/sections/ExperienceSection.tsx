'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const experiences = [
  {
    id: 1,
    number: '01',
    role: 'Robotics Engineer Intern',
    company: 'Karthikesh Robotics',
    location: 'Chennai, India',
    period: 'May 2025 - Nov 2025',
    description: 'Developed Autonomous Mobile Robots with advanced navigation capabilities. Worked extensively with ROS2 framework and visualization tools. Implemented path planning algorithms for industrial automation systems.',
    technologies: ['ROS2', 'Python', 'Navigation', 'SLAM'],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    number: '02',
    role: 'Teaching Assistantship Intern',
    company: "Vignan's University",
    location: 'Guntur, India',
    period: 'Jan 2025 - Apr 2025',
    description: 'Taught ROS in practical sessions for undergraduate students. Conducted research on autonomous robots and assisted in projects. Helped students with Kinematical & Dynamical Analysis of robotic systems.',
    technologies: ['ROS', 'Teaching', 'Research', 'Kinematics'],
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 3,
    number: '03',
    role: 'ROS Intern',
    company: 'Karthikesh Robotics',
    location: 'Online',
    period: 'Jan 2025 - Feb 2025',
    description: 'Intensive training in ROS2 Framework fundamentals. Learned Docker containerization for ROS applications. Developed GUI applications for ROS2 using Qt and RViz plugins.',
    technologies: ['ROS2', 'Docker', 'Linux'],
    gradient: 'from-orange-500/20 to-red-500/20',
  },
]

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="experience" className="py-20 bg-white dark:bg-black" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Professional journey in robotics and automation
          </motion.p>
        </div>

        <div className="space-y-8 relative">
          {experiences.map((exp, index) => {
            const targetScale = 1 - (experiences.length - index) * 0.05
            const targetOpacity = 1 - (experiences.length - index) * 0.1

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="sticky top-20"
                style={{
                  zIndex: experiences.length - index,
                }}
              >
                <Card className={`glass-card hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${exp.gradient}`}>
                  <div className="absolute top-4 left-4 text-6xl font-bold text-gray-200 dark:text-gray-800 opacity-50">
                    {exp.number}
                  </div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{exp.role}</CardTitle>
                        <CardDescription className="text-base mt-2 font-semibold">
                          {exp.company} • {exp.location}
                        </CardDescription>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4 font-mono">
                        {exp.period}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-white/50 dark:bg-black/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
