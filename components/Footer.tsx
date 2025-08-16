'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const footerLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'API Documentation', href: '#' },
    { name: 'Status', href: '#' },
    { name: 'Blog', href: '#' }
  ]

  const quickLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Industries', href: '#industries' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API', href: '/api' },
    { name: 'Partners', href: '/partners' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Live Chat', href: '/chat' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Status Page', href: '/status' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SV</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Saral Vyapar</h3>
                <p className="text-gray-300">Single Window System for Business Approvals</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering entrepreneurs with AI-powered business approval processes, 
              blockchain-verified licenses, and automated form submissions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium">Head Office</p>
                <p className="text-gray-300 text-sm">123 Innovation Street, Tech City, TC 12345</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-300 text-xs">24/7 Support Available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-gray-300 text-sm">support@saralvyapar.com</p>
                <p className="text-gray-300 text-xs">We'll respond within 2 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links and Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Saral Vyapar. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with ❤️ for Indian Entrepreneurs
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 