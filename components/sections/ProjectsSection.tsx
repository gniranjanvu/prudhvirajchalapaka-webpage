'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const projectsData = [
  {
    id: 1,
    title: 'Iravath',
    category: 'Autonomous Rover',
    description: 'Advanced autonomous navigation system with ML-based obstacle detection and path planning using ROS NavStack.',
    technologies: ['ROS', 'NavStack', 'Jetson', 'ML', 'Python'],
    featured: true,
    image: '/images/projects/iravath.jpg',
  },
  {
    id: 2,
    title: 'DWA Local Planner',
    category: 'Path Planning',
    description: 'Custom implementation of Dynamic Window Approach for local path planning in mobile robots with enhanced collision avoidance.',
    technologies: ['ROS2', 'Gazebo', 'RViz', 'C++', 'Python'],
    featured: true,
    image: '/images/projects/dwa.jpg',
  },
  {
    id: 3,
    title: 'Mecanum Robot',
    category: 'Mobile Robot',
    description: 'Omnidirectional mobile robot with 4DOF manipulator for object manipulation and precise navigation.',
    technologies: ['Arduino', 'Gazebo', 'ROS', 'Kinematics'],
    featured: false,
    image: '/images/projects/mecanum.jpg',
  },
  {
    id: 4,
    title: 'Modular Manufacturing',
    category: 'Industrial Automation',
    description: 'Automated industry system with pneumatic actuators and PLC control for modular manufacturing processes.',
    technologies: ['Pneumatics', 'PLC', 'Arduino', 'Automation'],
    featured: false,
    image: '/images/projects/manufacturing.jpg',
  },
  {
    id: 5,
    title: '6DOF Robotic Arm',
    category: 'Manipulator',
    description: '3D printed robotic arm with custom PCB and Android app control for pick-and-place operations.',
    technologies: ['Arduino', 'Custom PCB', 'Android', '3D Printing'],
    featured: false,
    image: '/images/projects/arm.jpg',
  },
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Innovative robotics and automation projects
          </motion.p>
        </div>
      </div>

      {/* Horizontal Scroll on Desktop */}
      <div className="hidden lg:block h-[600px] sticky top-20">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          <div className="min-w-[400px] flex items-center justify-center">
            <Link href="/projects">
              <Button variant="accent" size="lg">
                View All Projects →
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Grid on Mobile */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
        <div className="col-span-full flex justify-center mt-8">
          <Link href="/projects">
            <Button variant="accent" size="lg">
              View All Projects →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="min-w-[400px] lg:min-w-[500px]"
    >
      <Card className="glass-card h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden">
        {/* Project Image Placeholder */}
        <div className="relative h-64 bg-gradient-to-br from-accent/20 to-purple-500/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
            {project.title[0]}
          </div>
          {project.featured && (
            <Badge className="absolute top-4 right-4 bg-accent text-white">⭐ Featured</Badge>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-base mt-1">{project.category}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              View Details →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
