'use client'

import { motion } from 'framer-motion'
import { Award, Star } from 'lucide-react'

export default function AwardsSection() {
  const awards = [
    {
      title: 'Award of Excellence',
      category: 'State Government Project',
      year: '2020',
      organization: 'Computer Society of India',
      icon: Award
    },
    {
      title: 'Skoch Gold Award',
      category: 'e-Governance',
      year: '2019',
      organization: 'SKOCH Group',
      icon: Star
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">AWARDS & ACHIEVEMENTS</h2>
          <div className="w-24 h-1 bg-government-blue mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-government-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <award.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{award.title}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {award.category}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Year:</span> {award.year}
              </p>
              <p className="text-government-blue font-semibold">by {award.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 