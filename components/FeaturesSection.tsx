'use client'

import { motion } from 'framer-motion'
import { Bot, Shield, Zap, FileText, BarChart3, Globe, Users, CheckCircle } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Chatbot',
      description: 'Get instant answers to all your business queries. Our AI assistant guides you through the entire approval process.',
      benefits: ['24/7 Support', 'Instant Responses', 'Personalized Guidance']
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'All licenses and approvals are stored on blockchain for maximum security and transparency.',
      benefits: ['Tamper-proof', 'Transparent', 'Immutable Records']
    },
    {
      icon: Zap,
      title: 'RPA Automation',
      description: 'Automated form filling saves hours of manual work. Our bots handle government portal submissions.',
      benefits: ['Time Saving', 'Error-free', 'Instant Submission']
    },
    {
      icon: FileText,
      title: 'Smart Document Management',
      description: 'Upload, organize, and track all your business documents in one secure location.',
      benefits: ['Cloud Storage', 'Auto-organization', 'Version Control']
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track your application progress, processing times, and success rates with detailed analytics.',
      benefits: ['Live Updates', 'Performance Metrics', 'Predictive Insights']
    },
    {
      icon: Globe,
      title: 'Multi-platform Access',
      description: 'Access your business dashboard from anywhere - web, mobile, or tablet.',
      benefits: ['Cross-platform', 'Mobile-friendly', 'Offline Support']
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your business approval process in one comprehensive platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have simplified their approval process with Saral Vyapar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Start Free Trial
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 