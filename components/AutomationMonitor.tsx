'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Smartphone,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react'

interface AutomationSession {
  id: string
  licenseType: string
  status: 'running' | 'completed' | 'failed' | 'cancelled' | 'otp_required'
  currentStep: string
  startTime: string
  otpRequired: boolean
  steps?: Array<{
    step: string
    timestamp: string
    details: string
  }>
  otpPrompt?: {
    message: string
    phone: string
    type: string
    expiresIn: string
  }
}

interface AutomationMonitorProps {
  sessionId?: string
  onClose?: () => void
}

export default function AutomationMonitor({ sessionId, onClose }: AutomationMonitorProps) {
  const [sessions, setSessions] = useState<AutomationSession[]>([])
  const [selectedSession, setSelectedSession] = useState<AutomationSession | null>(null)
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Set selected session if sessionId is provided
  useEffect(() => {
    if (sessionId && sessions.length > 0) {
      const session = sessions.find(s => s.id === sessionId)
      if (session) {
        setSelectedSession(session)
      }
    }
  }, [sessionId, sessions])

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('http://localhost:5000/api/rpa/sessions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  const fetchSessionDetails = async (sessionId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/rpa/session/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const session = await response.json()
        setSelectedSession(session)
      }
    } catch (error) {
      console.error('Failed to fetch session details:', error)
    }
  }

  const submitOtp = async () => {
    if (!selectedSession || !otp) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/rpa/session/${selectedSession.id}/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ otp })
      })

      if (response.ok) {
        setOtp('')
        setShowOtp(false)
        // Refresh session details
        setTimeout(() => fetchSessionDetails(selectedSession.id), 1000)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit OTP')
      }
    } catch (error) {
      console.error('Failed to submit OTP:', error)
      alert('Failed to submit OTP')
    } finally {
      setLoading(false)
    }
  }

  const cancelSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to cancel this automation?')) return

    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`http://localhost:5000/api/rpa/session/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchSessions()
        if (selectedSession?.id === sessionId) {
          setSelectedSession(null)
        }
      }
    } catch (error) {
      console.error('Failed to cancel session:', error)
    }
  }

  const refreshSessions = async () => {
    setRefreshing(true)
    await fetchSessions()
    setRefreshing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />
      case 'otp_required':
        return <Smartphone className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'cancelled':
        return 'text-gray-600 bg-gray-50 border-gray-200'
      case 'otp_required':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Automation Monitor</h2>
              <p className="text-blue-100">Track your RPA automation sessions</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={refreshSessions}
                disabled={refreshing}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sessions List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-2" />
                    <p>No active automation sessions</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedSession?.id === session.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedSession(session)
                        fetchSessionDetails(session.id)
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(session.status)}
                          <span className="font-medium">{session.licenseType}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(session.status)}`}>
                          {session.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Step: {session.currentStep}</p>
                        <p>Started: {new Date(session.startTime).toLocaleTimeString()}</p>
                      </div>
                      {session.otpRequired && (
                        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                          ⚠️ OTP Required
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedSession ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{selectedSession.licenseType}</h3>
                    <p className="text-gray-600">Session ID: {selectedSession.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full border text-sm ${getStatusColor(selectedSession.status)}`}>
                      {selectedSession.status.replace('_', ' ')}
                    </span>
                    {selectedSession.status === 'running' && (
                      <button
                        onClick={() => cancelSession(selectedSession.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* OTP Input */}
                {selectedSession.otpRequired && selectedSession.otpPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Smartphone className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">OTP Verification Required</h4>
                    </div>
                    <p className="text-orange-700 mb-3">{selectedSession.otpPrompt.message}</p>
                    <p className="text-sm text-orange-600 mb-4">
                      Phone: {selectedSession.otpPrompt.phone} | Expires in: {selectedSession.otpPrompt.expiresIn}s
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <input
                          type={showOtp ? 'text' : 'password'}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowOtp(!showOtp)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showOtp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button
                        onClick={submitOtp}
                        disabled={!otp || loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? 'Submitting...' : 'Submit OTP'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Steps Timeline */}
                <div>
                  <h4 className="font-semibold mb-4">Automation Steps</h4>
                  <div className="space-y-3">
                    {selectedSession.steps?.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{step.step}</p>
                          <p className="text-sm text-gray-600">{step.details}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(step.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4" />
                  <p>Select a session to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 