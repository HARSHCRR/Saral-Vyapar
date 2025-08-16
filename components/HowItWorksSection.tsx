'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: 'Chat with AI Assistant',
      description: 'Start by chatting with our AI assistant. Tell us about your business and get personalized guidance on required licenses.',
      details: [
        'Describe your business type',
        'Specify your industry',
        'Get instant recommendations'
      ]
    },
    {
      number: 2,
      icon: FileText,
      title: 'Complete Master Form',
      description: 'Fill out our comprehensive master form once. We\'ll use this information for all your applications.',
      details: [
        'Business details',
        'Contact information',
        'Document uploads'
      ]
    },
    {
      number: 3,
      icon: Zap,
      title: 'Automated Processing',
      description: 'Our RPA bots automatically fill government forms and submit applications on your behalf.',
      details: [
        'Auto-form filling',
        'Instant submission',
        'Real-time tracking'
      ]
    },
    {
      number: 4,
      icon: CheckCircle,
      title: 'Get Blockchain Verified Licenses',
      description: 'Receive your approved licenses as NFTs on blockchain for maximum security and transparency.',
      details: [
        'NFT licenses',
        'Blockchain verification',
        'Instant access'
      ]
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your business approvals in 4 simple steps. From AI guidance to blockchain-verified licenses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex space-x-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-600 mx-auto mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full mr-3">
                      Step {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Process Timeline</h3>
                <p className="text-gray-600">Complete your business setup in minutes</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span className="font-medium">AI Consultation</span>
                  </div>
                  <span className="text-sm text-gray-500">2-5 min</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <span className="font-medium">Form Completion</span>
                  </div>
                  <span className="text-sm text-gray-500">5-10 min</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <span className="font-medium">Auto Processing</span>
                  </div>
                  <span className="text-sm text-gray-500">Instant</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <span className="font-medium">License Issuance</span>
                  </div>
                  <span className="text-sm text-gray-500">1-7 days</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-center">
                <div className="text-2xl font-bold mb-1">95% Success Rate</div>
                <div className="text-sm opacity-90">Average processing time reduced by 80%</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto">
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
} 