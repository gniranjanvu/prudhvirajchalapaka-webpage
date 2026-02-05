'use client'

import Link from 'next/link'
import { OWNER_INFO, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      {/* Marquee */}
      <div className="border-y border-gray-800 py-4 overflow-hidden mb-12">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-2xl font-bold px-8">
            CONNECT WITH ME @ {OWNER_INFO.email}
          </span>
          <span className="text-2xl font-bold px-8">
            CONNECT WITH ME @ {OWNER_INFO.email}
          </span>
          <span className="text-2xl font-bold px-8">
            CONNECT WITH ME @ {OWNER_INFO.email}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#experience" className="text-gray-400 hover:text-white transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <a href="#publications" className="text-gray-400 hover:text-white transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-gray-400 hover:text-white transition-colors">
                  Achievements
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{OWNER_INFO.email}</li>
              <li>{OWNER_INFO.phone}</li>
              <li>{OWNER_INFO.location}</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {OWNER_INFO.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 text-sm font-medium hover:text-accent transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
