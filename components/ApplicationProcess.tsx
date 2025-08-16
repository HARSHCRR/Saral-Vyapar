'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ApplicationProcess() {
  const steps = [
    {
      number: 1,
      title: 'Know your Approvals',
      description: 'Understand what approvals you need for your business'
    },
    {
      number: 2,
      title: 'Check Comprehensive list of Approvals',
      description: 'Review the complete list of required approvals and documents'
    },
    {
      number: 3,
      title: 'Registration & Account Activation',
      description: 'Create your account and activate it for portal access'
    },
    {
      number: 4,
      title: 'Fill Common Application Form',
      description: 'Complete the unified application form with all required details'
    },
    {
      number: 5,
      title: 'Apply for NOC/License',
      description: 'Submit your application for the required NOCs and licenses'
    },
    {
      number: 6,
      title: 'Pay Consolidated Fee',
      description: 'Make the consolidated payment for all applicable fees'
    },
    {
      number: 7,
      title: 'Download Issued Certificate',
      description: 'Download your approved certificates and documents'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">7 Steps Application Process</h2>
          <div className="w-24 h-1 bg-government-blue mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card text-center hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="w-16 h-16 bg-government-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-government-blue" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile view arrows */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center space-x-4">
            {steps.slice(0, -1).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex items-center"
              >
                <ArrowRight className="w-6 h-6 text-government-blue rotate-90" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center space-x-2">
              <span>User</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <span>Feedback / Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <span>Apply for Incentives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 