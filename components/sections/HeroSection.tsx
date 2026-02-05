'use client'

import { useEffect, useState } from 'react'
import { OWNER_INFO, ROLES, HERO_STICKERS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800" />
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(rgba(215, 25, 33, 0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">
            <span className="inline-block animate-fade-in">PRUDHVI</span>{' '}
            <span className="inline-block animate-fade-in animation-delay-100">RAJ</span>
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="inline-block animate-fade-in animation-delay-200">CHALAPAKA</span>
          </h2>
        </div>

        {/* Rotating Title */}
        <div className="h-16 mb-8 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-accent">&gt; </span>
            {ROLES[currentRole]}
            <span className="animate-pulse">_</span>
          </p>
        </div>

        {/* Bio */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          {OWNER_INFO.bio}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Button variant="accent" size="lg">
            View My Work
          </Button>
          <Button variant="outline" size="lg">
            Download CV
          </Button>
        </div>

        {/* Floating Stickers */}
        <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
          {HERO_STICKERS.map((sticker, index) => (
            <span
              key={sticker}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-mono border border-gray-200 dark:border-gray-700 hover:border-accent hover:scale-105 transition-all cursor-pointer"
              style={{
                animation: `float 6s ease-in-out ${index * 0.5}s infinite`,
              }}
            >
              {sticker}
            </span>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
