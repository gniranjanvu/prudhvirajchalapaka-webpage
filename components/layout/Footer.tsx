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
import ProfileCard from '@/components/ui/ProfileCard'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    } catch (error: any) {
      setErrorMsg(error.message)
    } finally {
      setIsSubscribing(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-[#e8e0d8] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#060606] dark:to-[#0a0a0a] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Large Marquee Strip */}
      <div className="border-y border-gray-300/50 dark:border-gray-200 dark:border-gray-800 py-4 bg-gradient-to-r from-transparent via-accent/20 to-transparent overflow-hidden pause-on-hover group">
        <div className="flex whitespace-nowrap animate-marquee-seamless group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-display font-bold px-8 text-gray-900 dark:text-white">
              CONNECT WITH ME @ {OWNER_INFO.email} • PRUDHVI RAJ CHALAPAKA •
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-600 dark:text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-600 dark:text-gray-400">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Resume / CV
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${OWNER_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`https://linkedin.com/in/${OWNER_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#publications"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                >
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-600 dark:text-gray-400">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
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
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/50 dark:bg-black/50 border-gray-300 dark:border-white/10 pl-10 pr-32 py-6 rounded-xl focus:ring-accent focus:border-accent font-mono text-sm"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Button
                    type="submit"
                    variant="accent"
                    disabled={isSubscribing || isSubscribed}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg focus:ring-2 focus:ring-accent/50 group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
                      {isSubscribing ? (
                        'JOINING...'
                      ) : isSubscribed ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          JOINED
                        </>
                      ) : (
                        <>
                          JOIN NOW
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </div>
                {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  Join 100+ others receiving monthly tech insights. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Contact Info - Get in Touch */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-display font-bold mb-6 tracking-wider uppercase text-gray-600 dark:text-gray-400">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">{OWNER_INFO.location}</span>
              </div>
              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-sm break-all">{OWNER_INFO.email}</span>
              </a>
              <a
                href={`tel:${OWNER_INFO.phone}`}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-sm">{OWNER_INFO.phone}</span>
              </a>

              {/* Social Icons */}
              <div className="flex gap-3 pt-4">
                <a
                  href={`https://linkedin.com/in/${OWNER_INFO.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black/5 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://github.com/${OWNER_INFO.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black/5 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${OWNER_INFO.email}`}
                  className="w-10 h-10 rounded-lg bg-black/5 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-accent hover:text-white transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Card - placed next to Get in Touch */}
          <div className="lg:col-span-3 flex items-start justify-center md:justify-end">
            <ProfileCard
              avatarUrl="/avatarUrl.png"
              name={OWNER_INFO.name}
              title={OWNER_INFO.title}
              handle={OWNER_INFO.github}
              status="Available"
              contactText="Contact"
              showUserInfo={true}
              behindGlowEnabled={true}
              enableMobileTilt={true}
              onContactClick={() => {
                window.location.href = `mailto:${OWNER_INFO.email}`;
              }}
              className="[&_section]:!h-[420px] [&_section]:!max-h-[420px]"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-2xl font-display font-bold">
                PR
              </div>
              <div>
                <h4 className="text-xl font-display font-bold">{OWNER_INFO.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{OWNER_INFO.title}</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 dark:text-gray-500 mb-2">
                Made with <Heart className="w-4 h-4 inline text-red-500 fill-red-500 animate-pulse" /> By Prudhviraj
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-500 text-sm">
            © {currentYear} {OWNER_INFO.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
