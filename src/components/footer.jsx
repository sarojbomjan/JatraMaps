import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300'>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} JatraMaps. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer
