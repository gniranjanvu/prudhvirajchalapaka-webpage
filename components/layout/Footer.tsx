'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { OWNER_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Large Marquee Strip */}
      <div className="border-y border-gray-800 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl md:text-4xl font-bold px-8 inline-flex items-center gap-4">
              CONNECT WITH ME @ {OWNER_INFO.email} • PRUDHVI RAJ CHALAPAKA
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About / Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-accent">P</span>R<span className="text-accent">C</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Robotics & Automation Engineer passionate about building intelligent systems.
            </p>
            <div className="flex space-x-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label={social.name}
                >
                  {social.icon === 'linkedin' && 'in'}
                  {social.icon === 'github' && 'gh'}
                  {social.icon === 'mail' && '✉'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="#education" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Education
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Projects
                </Link>
              </li>
              <li>
                <a href="#publications" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Publications
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Achievements
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates about my latest projects and research.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" variant="accent" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info Block */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Email</div>
              <a href={`mailto:${OWNER_INFO.email}`} className="text-gray-300 hover:text-accent transition-colors">
                {OWNER_INFO.email}
              </a>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Phone</div>
              <a href={`tel:${OWNER_INFO.phone}`} className="text-gray-300 hover:text-accent transition-colors">
                {OWNER_INFO.phone}
              </a>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Location</div>
              <p className="text-gray-300">{OWNER_INFO.location}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {OWNER_INFO.name}. Made with ❤️ using Next.js & Supabase
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2 group"
          >
            Back to Top 
            <motion.span
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              ↑
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  )
}
