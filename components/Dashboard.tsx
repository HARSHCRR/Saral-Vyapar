'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Settings,
  BarChart3,
  Users,
  Building2
} from 'lucide-react'
import AutomationMonitor from './AutomationMonitor'

interface DashboardProps {
  onClose?: () => void
}

export default function Dashboard({ onClose }: DashboardProps) {
  const [showAutomationMonitor, setShowAutomationMonitor] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Total Applications',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Approved Licenses',
      value: '18',
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Reviews',
      value: '6',
      change: '-2%',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Active Automations',
      value: '3',
      change: '+1',
      icon: Bot,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'automation',
      title: 'GST Registration Automation Started',
      description: 'RPA bot initiated GST registration process',
      time: '2 minutes ago',
      status: 'running'
    },
    {
      id: 2,
      type: 'license',
      title: 'MSME License Approved',
      description: 'Your MSME registration has been approved',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'document',
      title: 'Document Uploaded',
      description: 'PAN Card uploaded successfully',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'chatbot',
      title: 'AI Assistant Consultation',
      description: 'Received license recommendations',
      time: '1 day ago',
      status: 'completed'
    }
  ]

  const automationSessions = [
    {
      id: 'gst_123456',
      type: 'GST Registration',
      status: 'otp_required',
      progress: 75,
      startTime: '2024-01-15T10:30:00Z'
    },
    {
      id: 'msme_789012',
      type: 'MSME Registration',
      status: 'running',
      progress: 45,
      startTime: '2024-01-15T11:00:00Z'
    },
    {
      id: 'food_345678',
      type: 'FSSAI License',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15T09:00:00Z'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'otp_required':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Bot className="w-4 h-4 text-blue-600" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'otp_required':
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Saral Vyapar Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAutomationMonitor(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span>Automation Monitor</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'automation', label: 'Automation', icon: Bot },
                { id: 'activities', label: 'Recent Activities', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Automation Sessions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Automation Sessions</h3>
                  <div className="space-y-4">
                    {automationSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(session.status)}
                            <span className="font-medium">{session.type}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(session.status)}`}>
                            {session.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{session.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${session.progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Started: {new Date(session.startTime).toLocaleTimeString()}
                        </p>
                        {session.status === 'otp_required' && (
                          <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                            ⚠️ OTP verification required
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Bot className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Start GST Automation</p>
                          <p className="text-sm text-gray-600">Automate GST registration process</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Generate MSME Form</p>
                          <p className="text-sm text-gray-600">Create pre-filled MSME application</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">AI Assistant</p>
                          <p className="text-sm text-gray-600">Get license recommendations</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'automation' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Automation Management</h3>
                  <button
                    onClick={() => setShowAutomationMonitor(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Open Monitor</span>
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Enhanced RPA Automation</h4>
                      <p className="text-gray-600">Human-in-the-loop OTP handling for secure government portal automation</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">Real-time Monitoring</h5>
                      <p className="text-sm text-gray-600">Live tracking of automation progress with detailed step-by-step logs</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">OTP Handling</h5>
                      <p className="text-sm text-gray-600">Secure OTP verification with user intervention when required</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">Session Management</h5>
                      <p className="text-sm text-gray-600">Start, pause, resume, and cancel automation sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'automation' ? 'bg-blue-100' :
                        activity.type === 'license' ? 'bg-green-100' :
                        activity.type === 'document' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'automation' && <Bot className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'license' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'document' && <FileText className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'chatbot' && <Users className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Automation Monitor Modal */}
      {showAutomationMonitor && (
        <AutomationMonitor onClose={() => setShowAutomationMonitor(false)} />
      )}
    </div>
  )
} 