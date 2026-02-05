'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const educationData = [
  {
    id: 1,
    degree: 'B.Tech Robotics & Automation',
    institution: "Vignan's University",
    location: 'Guntur, India',
    period: '2021 - 2025',
    grade: 'CGPA: 7.62/10',
    description: 'Specialized in autonomous robotics, industrial automation, and embedded systems. Led robotics club and published research on robotic surgery.',
    highlights: [
      'Team Head - SPARC (Robotics Club)',
      'Published research in Elsevier',
      'Winner of multiple robotics competitions',
    ],
  },
  {
    id: 2,
    degree: 'Intermediate MPC',
    institution: 'NRI Junior College',
    location: 'Guntur, India',
    period: '2019 - 2021',
    grade: '804/1000',
    description: 'Mathematics, Physics, and Chemistry with focus on analytical and problem-solving skills.',
    highlights: [],
  },
  {
    id: 3,
    degree: 'SSC (Secondary School Certificate)',
    institution: 'Gretnaltes Public School',
    location: 'Guntur, India',
    period: '2018 - 2019',
    grade: 'GPA: 9.2/10',
    description: 'Comprehensive secondary education with excellent academic performance.',
    highlights: [],
  },
]

export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Academic journey and continuous learning
          </motion.p>
        </div>

        <div className="relative space-y-6 md:space-y-8">
          {educationData.map((edu, index) => {
            const cardProgress = useTransform(
              scrollYProgress,
              [0, 0.3 + index * 0.15, 0.5 + index * 0.15],
              [0, 0, 1]
            )

            return (
              <motion.div
                key={edu.id}
                style={{
                  opacity: cardProgress,
                  scale: useTransform(cardProgress, [0, 1], [0.9, 1]),
                  rotateX: useTransform(cardProgress, [0, 1], [20, 0]),
                }}
                className="perspective-1000"
              >
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{edu.degree}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          {edu.institution} • {edu.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          {edu.period}
                        </span>
                        <Badge variant="outline" className="mt-2">
                          {edu.grade}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>
                    {edu.highlights.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Highlights:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
