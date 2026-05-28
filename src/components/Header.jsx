// Header.jsx - Better typography and mobile experience
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: cleaner icons

export default function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home", showOnLanding: true },
    { name: "About", href: "#about", showOnLanding: true },
    { name: "Events", href: "#events", showOnLanding: true },
    { name: "Contact", href: "#contact", showOnLanding: true },
  ];

  const visibleLinks = isLandingPage
    ? navLinks
    : navLinks.filter((link) => link.name === "Home");

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl md:px-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/assets/logo png 1 1.png"
            alt="Aroma Worshippers Logo"
            className="w-auto h-10 md:h-12"
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-4 md:flex md:items-center">
          {visibleLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-2 text-base font-medium transition-all rounded-lg md:text-lg hover:text-[#00B425] hover:bg-green-50"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/register"
            className="px-5 py-2 text-base font-semibold text-white transition-all rounded-md bg-[#00B425] hover:bg-[#009620] hover:shadow-lg md:text-lg"
          >
            Register Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-[#00B425]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-lg top-full md:hidden animate-slideDown">
            <div className="flex flex-col p-4 space-y-2">
              {visibleLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-base font-medium rounded-lg hover:bg-green-50 hover:text-[#00B425]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/register"
                className="px-4 py-3 mt-2 text-base font-semibold text-center text-white rounded-md bg-[#00B425] hover:bg-[#009620]"
                onClick={() => setIsOpen(false)}
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
