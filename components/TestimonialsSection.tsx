'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Portal is Easy to Navigate. Also, team of Nivesh Mitra is very supportive",
      company: "Adani Airport"
    },
    {
      quote: "Nivesh Mitra portal is very efficient. It saves a lot of time",
      company: "Gail (India) Limited"
    },
    {
      quote: "Single Window Portal is very comfortable to get any NOC",
      company: "JK Cement Limited"
    },
    {
      quote: "This is wonderful initiative to provide the latest updates about application",
      company: "Triveni Engineering & Industries Ltd."
    },
    {
      quote: "Nivesh Mitra is a very entrepreneur friendly portal. It saves a lot of time",
      company: "PNC Infratech Limited"
    },
    {
      quote: "Its very good tool to obtain the Licenses without facing any trouble and without getting any delay",
      company: "Akshaya Patra"
    },
    {
      quote: "Transparent and quick procedure",
      company: "Jaiprakash Associates Limited"
    },
    {
      quote: "It is an easy and smooth platform",
      company: "DLF"
    },
    {
      quote: "Great Initiative. Thanks to all authorities",
      company: "Inox"
    },
    {
      quote: "Thank you for prompt action taken and granting Consents",
      company: "Hindustan Petroleum"
    },
    {
      quote: "The experience of using the portal has been good",
      company: "Taj Hotel Lucknow"
    },
    {
      quote: "Online procedure is very helpful to apply",
      company: "IFFCO"
    },
    {
      quote: "Good coordination with the department , very efficient Consent Management System",
      company: "India Oil Corporation Ltd."
    },
    {
      quote: "Fast response by Lucknow office, Responsiveness is very good",
      company: "PEPSICO"
    },
    {
      quote: "Swift process easy to apply online",
      company: "Asianpaints"
    },
    {
      quote: "very convenient and hassle-free portal",
      company: "D.A.V College Managing Committee"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Testimonials</h2>
          <div className="w-24 h-1 bg-government-blue mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-government-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Quote className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-3 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-government-blue">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 