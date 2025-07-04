import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
          <Link to="/">
            <img src="/assets/logo png 1 1.png" alt="Logo" />
          </Link>
          {/* Desktop nav */}
          <nav className="hidden space-x-6 md:block">
            <a
              href="/#home"
              className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
            >
              Home
            </a>
            {isLandingPage && (
              <>
                <a
                  href="#about"
                  className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
                >
                  About
                </a>
                <a
                  href="#events"
                  className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
                >
                  Events
                </a>
                <a
                  href="#contact"
                  className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
                >
                  Contact
                </a>
              </>
            )}
            <Link
              to="/register"
              className="hidden px-4 py-2 text-white bg-[#00B425] rounded md:inline-block hover:shadow-xl"
            >
              Register Now
            </Link>
          </nav>
          {/* Hamburger icon */}
          {/* Hamburger Button */}
          <button
            className="block cursor-pointer md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                // Close icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
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
            <div className="absolute left-0 flex flex-col w-full p-6 space-y-4 text-lg bg-white shadow-md top-16 md:hidden">
              <a
                className="cursor-pointer hover:text-green-700"
                href="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                className="cursor-pointer hover:text-green-700"
                href="#about"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                className="cursor-pointer hover:text-green-700"
                href="#contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <a
                className="cursor-pointer hover:text-green-700"
                href="/register.html"
                onClick={() => setIsOpen(false)}
              >
                Register
              </a>
            </div>
          )}
        </header>
      </>
    );
}
