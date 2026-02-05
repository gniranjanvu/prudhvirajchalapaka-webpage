'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const skillsData = {
  Programming: [
    { name: 'Python', rating: 5 },
    { name: 'C', rating: 5 },
    { name: 'C++', rating: 4 },
    { name: 'MATLAB', rating: 4 },
    { name: 'Java', rating: 2 },
  ],
  Frameworks: [
    { name: 'ROS', rating: 5 },
    { name: 'ROS2', rating: 5 },
    { name: 'YOLO', rating: 4 },
    { name: 'TensorFlow', rating: 3 },
    { name: 'Arduino', rating: 5 },
    { name: 'Isaac Sim', rating: 3 },
  ],
  Hardware: [
    { name: 'Arduino', rating: 5 },
    { name: 'Raspberry Pi', rating: 4 },
    { name: 'STM32', rating: 3 },
    { name: 'FPGA', rating: 2 },
    { name: 'Jetson Nano', rating: 4 },
  ],
  Tools: [
    { name: 'Git', rating: 4 },
    { name: 'Linux', rating: 5 },
    { name: 'Gazebo', rating: 5 },
    { name: 'Webots', rating: 4 },
    { name: 'TIA Portal', rating: 3 },
    { name: 'ROBOGUIDE', rating: 3 },
  ],
  CAD: [
    { name: 'SolidWorks', rating: 4 },
    { name: 'Fusion 360', rating: 5 },
    { name: 'NX CAD', rating: 3 },
  ],
  Technologies: [
    { name: 'CNC', rating: 3 },
    { name: '3D Printing', rating: 5 },
    { name: 'PLCs', rating: 4 },
  ],
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1 }}
          className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export function SkillsSection() {
  const categories = Object.keys(skillsData) as Array<keyof typeof skillsData>

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Technical proficiencies across robotics, automation, and embedded systems
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-card h-full hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="text-accent">{'{'}</span>
                    {category}
                    <span className="text-accent">{'}'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillsData[category].map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <StarRating rating={skill.rating} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="glass-card inline-block">
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400">
                Continuously learning and expanding my skill set in robotics, AI, and automation
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
