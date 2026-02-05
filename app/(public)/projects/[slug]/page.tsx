'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { use } from 'react'

// Mock project data - in real app this would come from database
const projectsData: Record<string, any> = {
  'iravath': {
    title: 'Iravath',
    category: 'Autonomous Rover',
    description: 'Advanced autonomous navigation system with ML-based obstacle detection and path planning using ROS NavStack.',
    fullDescription: `Iravath is a sophisticated autonomous mobile robot designed for outdoor navigation in challenging terrains. The project integrates multiple cutting-edge technologies to create a robust navigation system.

The robot features a custom-built chassis with mecanum wheels for omnidirectional movement, equipped with multiple sensors including LiDAR, IMU, and RGB-D cameras. The perception system uses YOLO for object detection and custom ML models for terrain classification.

Path planning is achieved through a hybrid approach combining global planning using A* algorithm and local planning with DWA (Dynamic Window Approach). The system includes real-time obstacle avoidance and dynamic replanning capabilities.`,
    technologies: ['ROS', 'NavStack', 'Jetson Nano', 'YOLO', 'Python', 'C++', 'OpenCV'],
    year: '2024',
    duration: '6 months',
    role: 'Lead Developer',
    team: '4 members',
    features: [
      'Autonomous navigation in outdoor environments',
      'Real-time obstacle detection and avoidance',
      'ML-based terrain classification',
      'GPS waypoint navigation',
      'Remote monitoring and control interface',
    ],
    challenges: [
      'Optimizing ML models for Jetson Nano',
      'Sensor fusion for accurate localization',
      'Power management for extended runtime',
    ],
    results: [
      'Successfully navigated 5km autonomous route',
      'Winner of college robotics competition',
      'Published research paper on navigation algorithm',
    ],
  },
  'dwa-local-planner': {
    title: 'DWA Local Planner',
    category: 'Path Planning',
    description: 'Custom implementation of Dynamic Window Approach for local path planning in mobile robots.',
    fullDescription: `A from-scratch implementation of the Dynamic Window Approach (DWA) algorithm for local path planning in ROS2. This project involved deep understanding of motion planning algorithms and their practical implementation.

The planner generates velocity commands considering robot dynamics, obstacle constraints, and goal orientation. It evaluates multiple trajectories in velocity space and selects the optimal path based on a multi-objective cost function.`,
    technologies: ['ROS2', 'Gazebo', 'RViz', 'C++', 'Python'],
    year: '2024',
    duration: '3 months',
    role: 'Solo Developer',
    team: '1 member',
    features: [
      'Custom DWA implementation in C++',
      'Integration with ROS2 Navigation Stack',
      'Visualization tools in RViz',
      'Tunable cost function parameters',
    ],
  },
  'mecanum-robot': {
    title: 'Mecanum Robot',
    category: 'Mobile Robot',
    description: 'Omnidirectional mobile robot with 4DOF manipulator.',
    fullDescription: `An integrated robotic system combining omnidirectional mobility with manipulation capabilities. The robot uses mecanum wheels for holonomic motion and features a custom-designed 4DOF manipulator.`,
    technologies: ['Arduino', 'Gazebo', 'ROS', 'Kinematics'],
    year: '2023',
    duration: '4 months',
    role: 'Lead Developer',
    team: '3 members',
  },
  'modular-manufacturing': {
    title: 'Modular Manufacturing',
    category: 'Industrial Automation',
    description: 'Automated industry system with pneumatic actuators and PLC control.',
    fullDescription: `An industrial automation project implementing a modular manufacturing cell with PLC-controlled pneumatic systems. The system demonstrates Industry 4.0 concepts with automated material handling and quality control.`,
    technologies: ['Pneumatics', 'PLC', 'TIA Portal', 'Arduino'],
    year: '2023',
    duration: '5 months',
    role: 'Automation Engineer',
    team: '5 members',
  },
  '6dof-robotic-arm': {
    title: '6DOF Robotic Arm',
    category: 'Manipulator',
    description: '3D printed robotic arm with custom PCB and Android app control.',
    fullDescription: `A complete robotic arm system featuring custom hardware design, electronics, and mobile app control. All mechanical parts were 3D printed and a custom PCB was designed for motor control.`,
    technologies: ['Arduino', 'Custom PCB', 'Android', '3D Printing', 'Kinematics'],
    year: '2022',
    duration: '4 months',
    role: 'Full Stack Developer',
    team: '2 members',
  },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projectsData[slug]

  if (!project) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link href="/projects">
              <Button variant="accent">Back to Projects</Button>
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
              <Link href="/projects" className="text-accent hover:underline mb-4 inline-block">
                ← Back to Projects
              </Link>
              <Badge className="mb-4">{project.category}</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Image Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-96 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-white/20">
                    {project.title[0]}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>About the Project</CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Features */}
                {project.features && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {project.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-accent mr-2">✓</span>
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
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
                {/* Project Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Project Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Year</div>
                        <div className="font-semibold">{project.year}</div>
                      </div>
                      {project.duration && (
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
                          <div className="font-semibold">{project.duration}</div>
                        </div>
                      )}
                      {project.role && (
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Role</div>
                          <div className="font-semibold">{project.role}</div>
                        </div>
                      )}
                      {project.team && (
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Team Size</div>
                          <div className="font-semibold">{project.team}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button variant="accent" className="w-full">
                    View Source Code
                  </Button>
                  <Button variant="outline" className="w-full">
                    Live Demo
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              Check out more projects in the{' '}
              <Link href="/projects" className="text-accent hover:underline">
                projects page
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
