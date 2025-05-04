import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import Wheel from "../assets/Wheel.png";

export default function Navbar() {
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-white bg-gray-200  shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <img src={Wheel} alt="" width={100} height={90} />
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className=" text-xl md:text-2xl font-bold text-orange-600"
              >
                JatraMaps
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => handleScrollToSection("header-section")}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollToSection("upcoming-section")}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer"
              >
                Events
              </button>
              <button
                onClick={() => handleScrollToSection("about-section")}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 Lrounded-md cursor-pointer"
              >
                About Us
              </button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              <Link
                to={"/login"}
                className="hidden md:block px-4 py-2 bg-white-100 text-black font-medium hover:bg-orange-600 hover:text-white rounded-md cursor-pointer"
              >
                Login
              </Link>
              <button></button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mt-25 bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              onClick={() => handleScrollToSection("header-section")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md"
            >
              Home
            </Link>
            <button
              onClick={() => handleScrollToSection("upcoming-section")}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md"
            >
              Events
            </button>

            <button
              onClick={() => handleScrollToSection("about-section")}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              About Us
            </button>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3"></div>
              <div className="mt-3 space-y-1">
                <Link
                  to={"/login"}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
