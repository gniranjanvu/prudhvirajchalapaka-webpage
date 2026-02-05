'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const achievementsData = [
  {
    id: 1,
    title: 'Team Head - SPARC',
    type: 'Leadership',
    date: '2023 - 2025',
    issuer: "Vignan's University",
    description: 'Led the robotics club as Vice-President, organizing workshops, competitions, and mentoring students in robotics and automation.',
    icon: '👑',
  },
  {
    id: 2,
    title: 'Outstanding Student Publication Award',
    type: 'Recognition',
    date: 'January 2024',
    issuer: 'Elsevier',
    description: 'Recognized for exceptional research publication on integrating robotic surgery and pharmacotherapy for lung cancer management.',
    icon: '🏆',
  },
  {
    id: 3,
    title: 'First Prize in Project Presentation',
    type: 'Competition',
    date: '2024',
    issuer: 'Srujanankura National Fest',
    description: 'Won first place for innovative robotics project presentation at national level technical festival.',
    icon: '🥇',
  },
  {
    id: 4,
    title: 'JASC 2024 - Top 5',
    type: 'Competition',
    date: '2024',
    issuer: 'Janatics India',
    description: 'Secured position in top 5 teams at Janatics Automation Student Challenge for innovative pneumatic automation solution.',
    icon: '⭐',
  },
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Achievements & Recognition
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Awards and recognitions received throughout my academic journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
            >
              <Card className="glass-card h-full hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {achievement.type}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {achievement.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {achievement.issuer}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quote/CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="glass-card inline-block max-w-2xl">
            <CardContent className="pt-6">
              <p className="text-lg italic text-gray-700 dark:text-gray-300">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                — Winston Churchill
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
