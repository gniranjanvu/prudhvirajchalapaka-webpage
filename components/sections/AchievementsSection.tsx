'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ACHIEVEMENTS, CERTIFICATIONS } from '@/lib/constants'
import { Trophy, Award, Star, Users, Flag, BookOpen, ExternalLink, Medal } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  flag: <Flag className="w-6 h-6" />,
  book: <BookOpen className="w-6 h-6" />,
}

export function AchievementsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="achievements" className="py-20 md:py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
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
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Awards, recognitions, and professional certifications
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ACHIEVEMENTS.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
            >
              <Card className="glass-card h-full hover:shadow-glass-lg transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6">
                  {/* Icon & Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-material-primary/20 text-accent group-hover:scale-110 transition-transform">
                      {iconMap[achievement.icon] || <Award className="w-6 h-6" />}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {achievement.type}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-accent transition-colors">
                    {achievement.title}
                  </h3>

                  {/* Organization & Date */}
                  <p className="text-sm text-accent font-medium mb-2">
                    {achievement.organization}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-mono">
                    {achievement.date}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
            <Medal className="inline w-8 h-8 text-accent mr-2" />
            Professional Certifications
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full hover:shadow-glass-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1 line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className="text-sm text-accent font-medium mb-1">
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {cert.date}
                        </p>
                      </div>
                    </div>
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        View Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
