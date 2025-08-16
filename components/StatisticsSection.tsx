'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, CheckCircle, XCircle, Clock, Star } from 'lucide-react'

export default function StatisticsSection() {
  const licenseStats = [
    {
      title: 'Licenses/NOCs Issued',
      count: '1,767,789',
      percentage: '88.46%',
      icon: CheckCircle,
      color: 'text-government-green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Rejected',
      count: '177,342',
      percentage: '8.87%',
      icon: XCircle,
      color: 'text-government-red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Queries/Objections',
      count: '41,939',
      percentage: '2.10%',
      icon: Clock,
      color: 'text-government-gold',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Requests Pending',
      count: '11,425',
      percentage: '0.57%',
      icon: Clock,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ]

  const userExperience = [
    {
      title: 'Satisfied',
      count: '1,076,887',
      percentage: '90.72%',
      icon: Star,
      color: 'text-government-green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Moderate',
      count: '74,451',
      percentage: '6.27%',
      icon: Star,
      color: 'text-government-gold',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Unsatisfied',
      count: '35,688',
      percentage: '3.01%',
      icon: Star,
      color: 'text-government-red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ]

  const userFeedback = [
    { rating: 'Excellent', count: '100,631', percentage: '8.48%' },
    { rating: 'Very Good', count: '976,256', percentage: '82.24%' },
    { rating: 'Good', count: '74,451', percentage: '6.27%' },
    { rating: 'Fair', count: '9,709', percentage: '0.82%' },
    { rating: 'Poor', count: '25,979', percentage: '2.19%' }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Doing Business in Uttar Pradesh Now Becomes Even More Easy
          </h2>
          <div className="w-24 h-1 bg-government-blue mx-auto"></div>
        </motion.div>

        {/* Licenses/NOCs Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Licenses/NOCs Statistics
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`stat-card ${stat.bgColor} ${stat.borderColor}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.percentage}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{stat.title}</h4>
                <p className="text-2xl font-bold text-gray-800">({stat.count})</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            User Experience
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {userExperience.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`stat-card ${stat.bgColor} ${stat.borderColor}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.percentage}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{stat.title}</h4>
                <p className="text-2xl font-bold text-gray-800">({stat.count})</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            User Feedback
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {userFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.rating}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="stat-card text-center"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{feedback.rating}</h4>
                <p className="text-lg font-bold text-government-blue mb-1">({feedback.count})</p>
                <p className="text-sm text-gray-600">{feedback.percentage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 