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

export default function IndustrialSectors() {
  const sectors = [
    {
      name: 'Food Processing and Dairy',
      icon: Utensils,
      description: 'Food processing units and dairy products manufacturing'
    },
    {
      name: 'Handloom and Textile',
      icon: Scissors,
      description: 'Traditional handloom and modern textile manufacturing'
    },
    {
      name: 'Information Technology',
      icon: Monitor,
      description: 'IT services, software development, and digital solutions'
    },
    {
      name: 'Tourism',
      icon: Plane,
      description: 'Tourism infrastructure and hospitality services'
    },
    {
      name: 'Micro, Small and Medium Enterprises',
      icon: Building2,
      description: 'MSME sector development and support'
    },
    {
      name: 'Electronics Manufacturing',
      icon: Microscope,
      description: 'Electronics and semiconductor manufacturing'
    },
    {
      name: 'Film',
      icon: Camera,
      description: 'Film production and entertainment industry'
    },
    {
      name: 'Renewable Energy',
      icon: Sun,
      description: 'Solar, wind, and other renewable energy projects'
    },
    {
      name: 'Civil Aviation',
      icon: PlaneTakeoff,
      description: 'Aviation infrastructure and services'
    },
    {
      name: 'Pharmaceuticals',
      icon: Pill,
      description: 'Pharmaceutical manufacturing and research'
    },
    {
      name: 'Logistics & Warehousing',
      icon: Truck,
      description: 'Logistics, warehousing, and supply chain solutions'
    },
    {
      name: 'Electric Vehicle Manufacturing',
      icon: Car,
      description: 'EV manufacturing and related infrastructure'
    },
    {
      name: 'Defence & Aerospace',
      icon: Shield,
      description: 'Defence manufacturing and aerospace technology'
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Industrial Sectors</h2>
          <div className="w-24 h-1 bg-government-blue mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-government-blue rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
                  <sector.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-government-blue transition-colors duration-300">
                    {sector.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{sector.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 