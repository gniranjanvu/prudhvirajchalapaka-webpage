'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SKILLS, SKILL_CATEGORIES } from '@/lib/constants'
import { Code, Layers, Cpu, Wrench, Box, Zap } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
  box: <Box className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('programming')

  const filteredSkills = SKILLS.filter(skill => skill.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-material-primary/5 rounded-full blur-3xl" />
      
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
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proficiency across programming, robotics, and engineering tools
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
              }`}
            >
              {iconMap[category.icon]}
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card p-4 h-full hover:shadow-glass-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>

                {/* Level Indicator */}
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < Math.floor(skill.level / 20) 
                          ? 'bg-accent' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: 'Programming Languages', value: '5+', icon: <Code className="w-6 h-6" /> },
            { label: 'Frameworks & Tools', value: '15+', icon: <Layers className="w-6 h-6" /> },
            { label: 'Hardware Platforms', value: '8+', icon: <Cpu className="w-6 h-6" /> },
            { label: 'Years Learning', value: '4+', icon: <Zap className="w-6 h-6" /> },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center glass-card p-6 hover:shadow-glass-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-display font-bold text-accent mb-2">
                {stat.value}
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
