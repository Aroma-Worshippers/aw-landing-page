// StaticHeader.jsx - Optimized version
import { useState, useEffect } from "react";

export default function StaticHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl md:px-6">
        
        {/* Logo - priority load (eager) */}
        <a href="https://www.aromaworshippers.com" className="flex-shrink-0">
          <img 
            src="/assets/logo png 1 1.png" 
            alt="Aroma Worshippers Logo" 
            className="h-10 md:h-12 w-auto"
            loading="eager"  // Priority - loads immediately
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-4 md:flex md:items-center">
          <a
            href="https://www.aromaworshippers.com"
            className="px-3 py-2 text-base font-medium transition-all rounded-lg md:text-lg hover:text-[#00B425] hover:bg-green-50"
          >
            Home
          </a>
          <a
            href="https://www.aromaworshippers.com#about"
            className="px-3 py-2 text-base font-medium transition-all rounded-lg md:text-lg hover:text-[#00B425] hover:bg-green-50"
          >
            About
          </a>
          <a
            href="https://www.aromaworshippers.com#events"
            className="px-3 py-2 text-base font-medium transition-all rounded-lg md:text-lg hover:text-[#00B425] hover:bg-green-50"
          >
            Events
          </a>
          <a
            href="https://www.aromaworshippers.com#contact"
            className="px-3 py-2 text-base font-medium transition-all rounded-lg md:text-lg hover:text-[#00B425] hover:bg-green-50"
          >
            Contact
          </a>
          <a
            href="/register.html"
            className="px-5 py-2 text-base font-semibold text-white transition-all rounded-md bg-[#00B425] hover:bg-[#009620] hover:shadow-lg md:text-lg"
          >
            Register
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-[#00B425]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-2">
              <a
                href="https://www.aromaworshippers.com"
                className="px-4 py-3 text-base rounded-lg hover:bg-green-50 hover:text-[#00B425]"
                onClick={handleLinkClick}
              >
                Home
              </a>
              <a
                href="https://www.aromaworshippers.com#about"
                className="px-4 py-3 text-base rounded-lg hover:bg-green-50 hover:text-[#00B425]"
                onClick={handleLinkClick}
              >
                About
              </a>
              <a
                href="https://www.aromaworshippers.com#events"
                className="px-4 py-3 text-base rounded-lg hover:bg-green-50 hover:text-[#00B425]"
                onClick={handleLinkClick}
              >
                Events
              </a>
              <a
                href="https://www.aromaworshippers.com#contact"
                className="px-4 py-3 text-base rounded-lg hover:bg-green-50 hover:text-[#00B425]"
                onClick={handleLinkClick}
              >
                Contact
              </a>
              <a
                href="/register.html"
                className="px-4 py-3 mt-2 text-base font-semibold text-center text-white rounded-md bg-[#00B425] hover:bg-[#009620]"
                onClick={handleLinkClick}
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}