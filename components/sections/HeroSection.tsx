'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OWNER_INFO, ROLES, HERO_STICKERS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const role = ROLES[currentRole]
    let charIndex = 0
    
    if (isTyping) {
      const typeInterval = setInterval(() => {
        if (charIndex <= role.length) {
          setDisplayText(role.substring(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setIsTyping(false), 2000)
        }
      }, 80)
      
      return () => clearInterval(typeInterval)
    } else {
      const deleteInterval = setInterval(() => {
        if (charIndex > 0) {
          charIndex--
          setDisplayText(role.substring(0, charIndex))
        } else {
          clearInterval(deleteInterval)
          setCurrentRole((prev) => (prev + 1) % ROLES.length)
          setIsTyping(true)
        }
      }, 40)
      
      return () => clearInterval(deleteInterval)
    }
  }, [currentRole, isTyping])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const nameLetters = "PRUDHVI RAJ".split('')
  const lastNameLetters = "CHALAPAKA".split('')

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900" />
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-material-primary/10 rounded-full blur-3xl animate-pulse animation-delay-300" />

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Stickers - Top */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center mb-8"
          variants={itemVariants}
        >
          {HERO_STICKERS.slice(0, 4).map((sticker, index) => (
            <motion.span
              key={sticker}
              className="sticker text-xs sm:text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{ 
                delay: 0.5 + index * 0.1,
                duration: 0.4,
                y: {
                  repeat: Infinity,
                  duration: 3 + index * 0.5,
                  ease: "easeInOut",
                }
              }}
            >
              {sticker}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Name */}
        <motion.div className="mb-4" variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight">
            <span className="block">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.05,
                    duration: 0.5,
                    ease: 'easeOut' as const,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight mt-2">
            <span className="gradient-text">
              {lastNameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.05,
                    duration: 0.5,
                    ease: 'easeOut' as const,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h2>
        </motion.div>

        {/* Typewriter Title */}
        <motion.div 
          className="h-12 sm:h-16 mb-8 flex items-center justify-center"
          variants={itemVariants}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-mono text-gray-700 dark:text-gray-300">
            <span className="text-accent font-semibold">&gt; </span>
            <span className="border-r-2 border-accent pr-1">{displayText}</span>
          </p>
        </motion.div>

        {/* Profile Photo - Gradient Border */}
        <motion.div 
          className="mb-10 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-material-primary to-accent rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse" />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-accent to-material-primary p-1">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-display font-bold text-accent">
                PR
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed px-4"
          variants={itemVariants}
        >
          {OWNER_INFO.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <Button 
            variant="accent" 
            size="lg" 
            className="gap-2 ripple group"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View My Work
          </Button>
          <Button variant="outline" size="lg" className="gap-2 group">
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            Download CV
          </Button>
        </motion.div>

        {/* Floating Stickers - Bottom */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center mb-12"
          variants={itemVariants}
        >
          {HERO_STICKERS.slice(4).map((sticker, index) => (
            <motion.span
              key={sticker}
              className="sticker text-xs sm:text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{ 
                delay: 1 + index * 0.1,
                duration: 0.4,
                y: {
                  repeat: Infinity,
                  duration: 4 + index * 0.3,
                  ease: "easeInOut",
                }
              }}
            >
              {sticker}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2 uppercase tracking-widest">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
