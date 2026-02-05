'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EDUCATION } from '@/lib/constants'
import { GraduationCap, MapPin, Calendar, Award, CheckCircle } from 'lucide-react'

export function EducationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section id="education" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-material-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-mono uppercase tracking-wider rounded-full mb-4">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building a strong foundation in engineering and technology
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div 
          className="grid gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {EDUCATION.map((edu, index) => (
            <motion.div key={edu.id} variants={itemVariants}>
              <Card className="glass-card overflow-hidden hover:shadow-glass-lg transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Icon/Visual */}
                    <div className="lg:w-1/4 bg-gradient-to-br from-accent to-accent-dark p-6 lg:p-8 flex items-center justify-center">
                      <div className="text-center text-white">
                        <GraduationCap className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3" />
                        <div className="text-2xl lg:text-3xl font-bold font-display">{edu.grade}</div>
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="lg:w-3/4 p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl lg:text-2xl font-display font-bold group-hover:text-accent transition-colors">
                              {edu.degree}
                            </h3>
                            {edu.isCurrent && (
                              <Badge variant="accent" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-accent font-semibold text-lg">{edu.field}</p>
                        </div>
                      </div>

                      {/* Institution & Meta */}
                      <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                          {edu.institution}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight) => (
                          <div 
                            key={highlight} 
                            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 text-accent" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
