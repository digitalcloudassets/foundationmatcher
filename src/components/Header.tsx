import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-rose-600">
              Foundation Matcher
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-800 hover:text-rose-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-rose-600 transition-colors"
            >
              Results
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-rose-600 transition-colors"
            >
              Brands
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-rose-600 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-800 hover:text-rose-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-rose-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Results
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-rose-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Brands
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-rose-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;