'use client'

import { useState } from 'react'
import { Search, Menu, X, User, Bell, Globe, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Industries', href: '#industries' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const quickLinks = [
    'Business Registration',
    'License Requirements',
    'AI Assistant',
    'Document Upload'
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🚀 Single Window System for Business Approvals</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <span>Blockchain Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">SV</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Saral Vyapar
              </h1>
              <p className="text-sm text-gray-600">Single Window System for Business Approvals</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for licenses, approvals, or help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
            <Link href="/login" className="btn-secondary flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {searchQuery && (
          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link}
                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-full text-sm transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-gray-50 border-t border-gray-200`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:space-x-8 py-4">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
} 