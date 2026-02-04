'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { OWNER_INFO, PROJECT_TYPES } from '@/lib/constants'

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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marquee Border */}
        <div className="relative mb-16">
          <div className="border-2 border-accent rounded-lg p-1 overflow-hidden">
            <div className="flex animate-marquee-fast whitespace-nowrap">
              <span className="text-xl font-bold px-8">WANNA TALK WITH ME? 👋</span>
              <span className="text-xl font-bold px-8">WANNA TALK WITH ME? 👋</span>
              <span className="text-xl font-bold px-8">WANNA TALK WITH ME? 👋</span>
              <span className="text-xl font-bold px-8">WANNA TALK WITH ME? 👋</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
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

                <Button type="submit" variant="accent" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href={`mailto:${OWNER_INFO.email}`} className="text-accent hover:underline">
                    {OWNER_INFO.email}
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href={`tel:${OWNER_INFO.phone}`} className="text-accent hover:underline">
                    {OWNER_INFO.phone}
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p>{OWNER_INFO.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent-dark text-white">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Available for Work</h3>
                <p className="mb-4">
                  I'm currently available for freelance projects and collaborations in robotics,
                  automation, and embedded systems.
                </p>
                <p className="text-sm opacity-90">
                  Response time: Usually within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-fast {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-fast {
          animation: marquee-fast 15s linear infinite;
        }
      `}</style>
    </section>
  )
}
