"use client";

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { OWNER_INFO, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ArrowUp,
  Heart,
  Send,
  CheckCircle
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribing(false)
    setIsSubscribed(true)
    setEmail('')

    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Large Marquee Strip */}
      <div className="border-y border-gray-800 py-4 bg-gradient-to-r from-gray-900 via-accent/20 to-gray-900 overflow-hidden pause-on-hover group">
        <div className="flex whitespace-nowrap animate-marquee-seamless group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-display font-bold px-8 text-white">
              CONNECT WITH ME @ {OWNER_INFO.email} • PRUDHVI RAJ CHALAPAKA •
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-400">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Resume / CV
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${OWNER_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`https://linkedin.com/in/${OWNER_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#publications"
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-400">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for latest updates and posts from my journey.
            </p>
            {isSubscribed ? (
              <motion.div
                className="flex items-center gap-2 text-green-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Thanks for subscribing! 🎉</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  variant="accent"
                  className="shrink-0"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-400">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-gray-400">{OWNER_INFO.location}</span>
              </div>
              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <span>{OWNER_INFO.email}</span>
              </a>
              <a
                href={`tel:${OWNER_INFO.phone}`}
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <span>{OWNER_INFO.phone}</span>
              </a>

              {/* Social Icons */}
              <div className="flex gap-3 pt-4">
                <a
                  href={`https://linkedin.com/in/${OWNER_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://github.com/${OWNER_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${OWNER_INFO.email}`}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-2xl font-display font-bold">
                PR
              </div>
              <div>
                <h4 className="text-xl font-display font-bold">{OWNER_INFO.name}</h4>
                <p className="text-gray-400">{OWNER_INFO.title}</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-2">
                Made with <Heart className="w-4 h-4 inline text-accent" /> using Next.js & Tailwind
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} {OWNER_INFO.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-accent transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
