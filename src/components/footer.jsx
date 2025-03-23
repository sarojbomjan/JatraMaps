import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4"> 
          <div className="flex flex-col items-center justify-center text-center"> 
            {/* Copyright text */}
            <p className="text-sm text-gray-400 mb-4"> 
              &copy; {new Date().getFullYear()} JatraMaps. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex space-x-6">
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>

            {/* Icons */}
            <div className="flex space-x-6 mt-6"> 
              <a href="mailto:info@jatramaps.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+977-9803478720" className="text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://maps.google.com" className="text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;