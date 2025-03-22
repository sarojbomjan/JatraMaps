import { useState } from "react";
import { Sun, Moon, Menu, X, Search, User } from 'lucide-react';
import LoginModal from "./login_modal"; 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-xl md:text-2xl font-bold text-blue-600">
                JatraMaps
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Home
              </a>
              <a href="/events" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Events
              </a>
              <a href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                About Us
              </a>
              <a href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Blog
              </a>
              <a href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Contact
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                <Sun className="h-5 w-5" />
              </button>
              <button onClick={openLoginModal} className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                Login
              </button>
              <button className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                Register
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Home
            </a>
            <a href="/events" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Events
            </a>
            <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              About Us
            </a>
            <a href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Blog
            </a>
            <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Contact
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-600" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Guest User</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button onClick={openLoginModal} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Login
                </button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
}