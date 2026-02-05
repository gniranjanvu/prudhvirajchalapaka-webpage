'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const allProjects = [
  {
    id: 1,
    slug: 'iravath',
    title: 'Iravath',
    category: 'Autonomous Rover',
    description: 'Advanced autonomous navigation system with ML-based obstacle detection and path planning using ROS NavStack.',
    technologies: ['ROS', 'NavStack', 'Jetson', 'ML', 'Python'],
    featured: true,
    year: '2024',
  },
  {
    id: 2,
    slug: 'dwa-local-planner',
    title: 'DWA Local Planner',
    category: 'Path Planning',
    description: 'Custom implementation of Dynamic Window Approach for local path planning in mobile robots with enhanced collision avoidance.',
    technologies: ['ROS2', 'Gazebo', 'RViz', 'C++', 'Python'],
    featured: true,
    year: '2024',
  },
  {
    id: 3,
    slug: 'mecanum-robot',
    title: 'Mecanum Robot',
    category: 'Mobile Robot',
    description: 'Omnidirectional mobile robot with 4DOF manipulator for object manipulation and precise navigation.',
    technologies: ['Arduino', 'Gazebo', 'ROS', 'Kinematics'],
    featured: false,
    year: '2023',
  },
  {
    id: 4,
    slug: 'modular-manufacturing',
    title: 'Modular Manufacturing',
    category: 'Industrial Automation',
    description: 'Automated industry system with pneumatic actuators and PLC control for modular manufacturing processes.',
    technologies: ['Pneumatics', 'PLC', 'Arduino', 'Automation'],
    featured: false,
    year: '2023',
  },
  {
    id: 5,
    slug: '6dof-robotic-arm',
    title: '6DOF Robotic Arm',
    category: 'Manipulator',
    description: '3D printed robotic arm with custom PCB and Android app control for pick-and-place operations.',
    technologies: ['Arduino', 'Custom PCB', 'Android', '3D Printing'],
    featured: false,
    year: '2022',
  },
]

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black pt-20">
        {/* Header */}
        <section className="py-20 gradient-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">All Projects</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Explore my complete portfolio of robotics, automation, and embedded systems projects
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="accent" size="sm">All Projects</Button>
              <Button variant="outline" size="sm">Featured</Button>
              <Button variant="outline" size="sm">Robotics</Button>
              <Button variant="outline" size="sm">Automation</Button>
              <Button variant="outline" size="sm">Embedded</Button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card className="glass-card h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                      {/* Project Image Placeholder */}
                      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-purple-500/20 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20 group-hover:scale-110 transition-transform">
                          {project.title[0]}
                        </div>
                        {project.featured && (
                          <Badge className="absolute top-4 right-4 bg-accent text-white">
                            ⭐ Featured
                          </Badge>
                        )}
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="outline" className="bg-white/90 dark:bg-black/90">
                            {project.year}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="group-hover:text-accent transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription>{project.category}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Let's collaborate on your next robotics or automation project
              </p>
              <Link href="/#contact">
                <Button variant="accent" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
