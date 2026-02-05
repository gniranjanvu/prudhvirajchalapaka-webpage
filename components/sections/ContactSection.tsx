'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { OWNER_INFO, PROJECT_TYPES, SOCIAL_LINKS } from '@/lib/constants'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Have a project in mind? Let's discuss how we can work together
          </motion.p>
        </div>

        {/* 4-Sided Marquee Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-12 border-2 border-accent rounded-2xl p-1 overflow-hidden"
        >
          {/* Top Marquee */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center overflow-hidden bg-accent">
            <div className="flex whitespace-nowrap animate-marquee-fast">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-white font-bold px-8">
                  WANNA TALK WITH ME? 👋
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center overflow-hidden bg-accent">
            <div className="flex whitespace-nowrap animate-marquee-reverse">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-white font-bold px-8">
                  LET'S BUILD SOMETHING AMAZING 🚀
                </span>
              ))}
            </div>
          </div>

          {/* Main Content with padding for marquees */}
          <div className="mt-12 mb-12 bg-white dark:bg-gray-900 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Me a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                        >
                          <option value="">Select a type</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <Button type="submit" variant="accent" className="w-full" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Availability Status */}
                <Card className="glass-card bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <h3 className="text-xl font-bold">Available for Work</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      I'm currently available for freelance projects and collaborations in robotics,
                      automation, and embedded systems.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Response time: Usually within 24 hours
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Info Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <a href={`mailto:${OWNER_INFO.email}`} className="text-accent hover:underline text-sm">
                          {OWNER_INFO.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <a href={`tel:${OWNER_INFO.phone}`} className="text-accent hover:underline text-sm">
                          {OWNER_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{OWNER_INFO.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Connect on Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-white transition-all text-center font-medium"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
