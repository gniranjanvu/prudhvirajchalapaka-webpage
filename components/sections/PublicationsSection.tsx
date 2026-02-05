'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PUBLICATIONS } from '@/lib/constants'
import { BookOpen, ExternalLink, Quote, Users, FileText } from 'lucide-react'

export function PublicationsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="publications" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-material-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-mono uppercase tracking-wider rounded-full mb-4">
            Research Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Academic papers and research contributions
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PUBLICATIONS.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
            >
              <Card className="glass-card hover:shadow-glass-lg transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white shadow-lg shadow-accent/25">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Type Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="accent" className="text-xs uppercase">
                          {pub.type}
                        </Badge>
                        <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                          {pub.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
                        {pub.title}
                      </h3>

                      {/* Authors */}
                      <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 text-accent" />
                        <p className="text-sm">
                          {pub.authors.join(', ')}
                        </p>
                      </div>

                      {/* Journal/Conference */}
                      <div className="flex items-center gap-2 mb-4 text-accent">
                        <FileText className="w-4 h-4" />
                        <p className="font-medium">
                          {pub.journal}
                        </p>
                      </div>

                      {/* Abstract */}
                      <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                        <Quote className="absolute top-3 left-3 w-4 h-4 text-gray-300 dark:text-gray-600" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic pl-6">
                          {pub.abstract}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {pub.doi && (
                          <span className="font-mono text-gray-500 dark:text-gray-400">
                            DOI: {pub.doi}
                          </span>
                        )}
                        {pub.citations > 0 && (
                          <span className="text-gray-500 dark:text-gray-400">
                            {pub.citations} citations
                          </span>
                        )}
                        {pub.link && (
                          <a 
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-accent hover:underline font-medium"
                          >
                            Read Paper <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Publications', value: PUBLICATIONS.length },
            { label: 'Total Citations', value: PUBLICATIONS.reduce((acc, p) => acc + p.citations, 0) },
            { label: 'Research Areas', value: 2 },
          ].map((stat) => (
            <div 
              key={stat.label}
              className="text-center glass-card p-4 hover:shadow-glass transition-all"
            >
              <div className="text-2xl md:text-3xl font-display font-bold text-accent">
                {stat.value}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
