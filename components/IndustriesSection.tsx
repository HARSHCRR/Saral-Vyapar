'use client'

import { motion } from 'framer-motion'
import { 
  Utensils, 
  Scissors, 
  Monitor, 
  Plane, 
  Building2, 
  Microscope, 
  Camera, 
  Sun, 
  PlaneTakeoff, 
  Pill, 
  Truck, 
  Car, 
  Shield 
} from 'lucide-react'

export default function IndustriesSection() {
  const industries = [
    {
      name: 'Food Processing & Dairy',
      icon: Utensils,
      description: 'Food processing units and dairy products manufacturing',
      licenses: ['FSSAI License', 'GST Registration', 'MSME Registration'],
      processingTime: '15-30 days'
    },
    {
      name: 'Handloom & Textile',
      icon: Scissors,
      description: 'Traditional handloom and modern textile manufacturing',
      licenses: ['Handloom Registration', 'GST Registration', 'MSME Registration'],
      processingTime: '10-20 days'
    },
    {
      name: 'Information Technology',
      icon: Monitor,
      description: 'IT services, software development, and digital solutions',
      licenses: ['STPI Registration', 'GST Registration', 'MSME Registration'],
      processingTime: '10-15 days'
    },
    {
      name: 'Tourism & Hospitality',
      icon: Plane,
      description: 'Tourism infrastructure and hospitality services',
      licenses: ['Tourism License', 'GST Registration', 'MSME Registration'],
      processingTime: '20-30 days'
    },
    {
      name: 'Micro, Small & Medium Enterprises',
      icon: Building2,
      description: 'MSME sector development and support',
      licenses: ['Udyam Registration', 'GST Registration', 'Trade License'],
      processingTime: '1-3 days'
    },
    {
      name: 'Electronics Manufacturing',
      icon: Microscope,
      description: 'Electronics and semiconductor manufacturing',
      licenses: ['BIS Certification', 'GST Registration', 'MSME Registration'],
      processingTime: '30-45 days'
    },
    {
      name: 'Film & Entertainment',
      icon: Camera,
      description: 'Film production and entertainment industry',
      licenses: ['Film License', 'GST Registration', 'MSME Registration'],
      processingTime: '15-25 days'
    },
    {
      name: 'Renewable Energy',
      icon: Sun,
      description: 'Solar, wind, and other renewable energy projects',
      licenses: ['MNRE Registration', 'GST Registration', 'MSME Registration'],
      processingTime: '20-35 days'
    },
    {
      name: 'Civil Aviation',
      icon: PlaneTakeoff,
      description: 'Aviation infrastructure and services',
      licenses: ['DGCA License', 'GST Registration', 'MSME Registration'],
      processingTime: '45-60 days'
    },
    {
      name: 'Pharmaceuticals',
      icon: Pill,
      description: 'Pharmaceutical manufacturing and research',
      licenses: ['Drug License', 'GST Registration', 'MSME Registration'],
      processingTime: '30-45 days'
    },
    {
      name: 'Logistics & Warehousing',
      icon: Truck,
      description: 'Logistics, warehousing, and supply chain solutions',
      licenses: ['Transport License', 'GST Registration', 'MSME Registration'],
      processingTime: '15-25 days'
    },
    {
      name: 'Electric Vehicle Manufacturing',
      icon: Car,
      description: 'EV manufacturing and related infrastructure',
      licenses: ['AIS Certification', 'GST Registration', 'MSME Registration'],
      processingTime: '25-40 days'
    },
    {
      name: 'Defence & Aerospace',
      icon: Shield,
      description: 'Defence manufacturing and aerospace technology',
      licenses: ['DIPP License', 'GST Registration', 'MSME Registration'],
      processingTime: '60-90 days'
    }
  ]

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Supported Industries</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We support businesses across all major industries with specialized license requirements and processing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {industry.name}
                  </h4>
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Licenses:</h5>
                  <div className="space-y-1">
                    {industry.licenses.map((license) => (
                      <div key={license} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {license}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Processing Time:</span>
                    <span className="font-semibold text-blue-600">{industry.processingTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">13</div>
            <div className="text-gray-700 font-semibold">Industries Supported</div>
            <div className="text-sm text-gray-600 mt-1">Comprehensive coverage</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-700 font-semibold">License Types</div>
            <div className="text-sm text-gray-600 mt-1">All major approvals</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
            <div className="text-gray-700 font-semibold">Success Rate</div>
            <div className="text-sm text-gray-600 mt-1">Across all industries</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our support. Contact us to learn how we can help your specific industry.
            </p>
            <button className="btn-primary text-lg px-8 py-3">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 