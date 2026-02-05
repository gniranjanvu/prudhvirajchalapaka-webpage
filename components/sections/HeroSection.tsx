'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { OWNER_INFO, ROLES, HERO_STICKERS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Split name into letters for animation
  const firstName = 'PRUDHVI'
  const middleName = 'RAJ'
  const lastName = 'CHALAPAKA'

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(rgba(215, 25, 33, 0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Photo with Liquid Glass Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <div className="relative w-32 h-32 mx-auto gradient-border rounded-full p-1">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {OWNER_INFO.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </motion.div>

        {/* Main Heading with Letter-by-Letter Animation */}
        <div className="mb-8" ref={nameRef}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">
            <div className="inline-flex">
              {firstName.split('').map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>{' '}
            <div className="inline-flex">
              {middleName.split('').map((letter, i) => (
                <motion.span
                  key={`middle-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (firstName.length + i) * 0.05 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <div className="inline-flex">
              {lastName.split('').map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (firstName.length + middleName.length + i) * 0.05 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </h2>
        </div>

        {/* Rotating Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="h-16 mb-8 flex items-center justify-center"
        >
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-accent">&gt; </span>
            {ROLES[currentRole]}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >
              _
            </motion.span>
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {OWNER_INFO.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Button variant="accent" size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work
          </Button>
          <Button variant="outline" size="lg">
            Download CV
          </Button>
        </motion.div>

        {/* Floating Stickers with Random Movement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto"
        >
          {HERO_STICKERS.map((sticker, index) => (
            <motion.span
              key={sticker}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 2.1 + index * 0.1 },
                scale: { duration: 0.5, delay: 2.1 + index * 0.1 },
                y: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                },
                x: {
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.2,
                },
              }}
              className="glass-card px-4 py-2 rounded-full text-sm font-mono hover:scale-105 transition-transform cursor-pointer"
            >
              {sticker}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
