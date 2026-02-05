'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const publicationsData = [
  {
    id: 1,
    type: 'Journal',
    title: 'Integrating robotic surgery and pharmacotherapy: A dual approach to lung cancer management',
    authors: ['Prudhvi Raj Chalapaka', 'et al.'],
    venue: 'Elsevier',
    date: 'January 2024',
    abstract:
      'This research explores the synergistic integration of advanced robotic surgical systems with targeted pharmacotherapy for comprehensive lung cancer treatment. The study demonstrates improved patient outcomes through minimally invasive robotic procedures combined with precision drug delivery.',
    doi: '10.1016/example.doi',
    tags: ['Robotic Surgery', 'Medical Robotics', 'Pharmacotherapy', 'Lung Cancer'],
  },
]

export function PublicationsSection() {
  const [showFullAbstract, setShowFullAbstract] = useState<Record<number, boolean>>({})

  const toggleAbstract = (id: number) => {
    setShowFullAbstract((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyCitation = (pub: typeof publicationsData[0]) => {
    const citation = `${pub.authors.join(', ')}. "${pub.title}". ${pub.venue}, ${pub.date}.`
    navigator.clipboard.writeText(citation)
    // TODO: Show toast notification
    alert('Citation copied to clipboard!')
  }

  return (
    <section id="publications" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Publications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Research contributions to the field of robotics and automation
          </motion.p>
        </div>

        <div className="space-y-8">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card hover:shadow-2xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                      {pub.type}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{pub.date}</span>
                  </div>

                  {/* Typewriter effect title */}
                  <CardTitle className="text-2xl md:text-3xl leading-tight">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      {pub.title}
                    </motion.span>
                  </CardTitle>

                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Authors:</span> {pub.authors.join(', ')}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Published in:</span> {pub.venue}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Abstract</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {showFullAbstract[pub.id]
                          ? pub.abstract
                          : `${pub.abstract.slice(0, 200)}...`}
                      </p>
                      {pub.abstract.length > 200 && (
                        <button
                          onClick={() => toggleAbstract(pub.id)}
                          className="text-accent text-sm mt-2 hover:underline"
                        >
                          {showFullAbstract[pub.id] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button variant="accent" size="sm">
                        Read Paper
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyCitation(pub)}>
                        Copy Citation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Future Publications CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="glass-card inline-block">
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400">
                More publications coming soon. Currently working on research in autonomous navigation
                and industrial automation.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
