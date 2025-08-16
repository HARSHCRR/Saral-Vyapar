'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Shield, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import DotGrid from './DotGrid';

export default function HeroSection() {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Assistant',
      description: 'Get instant guidance on licenses and approvals'
    },
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Secure and tamper-proof license management'
    },
    {
      icon: Zap,
      title: 'Automated Forms',
      description: 'Auto-fill government forms with RPA technology'
    },
    {
      icon: Users,
      title: 'Single Window',
      description: 'All approvals in one unified platform'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Tracking',
      description: 'Monitor application status in real-time'
    },
    {
      icon: CheckCircle,
      title: 'Instant Approvals',
      description: 'Fast-track processing for eligible businesses'
    }
  ]

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 relative">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#E0E7FF"
          activeColor="#4F46E5"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Simplify Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Business Journey</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Saral Vyapar is your AI-powered single window system for all business approvals, 
            licenses, and registrations. Get started in minutes, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/chatbot" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>Ask AI Assistant</span>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/50 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          <div className="stat-card bg-white/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Businesses Served</div>
          </div>
          <div className="stat-card bg-white/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
            <div className="text-gray-600">Licenses Issued</div>
          </div>
          <div className="stat-card bg-white/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="stat-card bg-white/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 