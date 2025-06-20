import { Link, NavLink, useLocation } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

export default function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
    return (
      <>
        <header className="flex items-center justify-between p-4">
          <Link to="/">
            <img src="/assets/logo png 1 1.png" alt="Logo" />
          </Link>
          <nav className="hidden space-x-6 md:block">
            <NavLink
              to="/"
              className="text-xl  hover:shadow-lg hover:shadow-[#00B425] p-4 rounded-lg"
            >
              Home
            </NavLink>
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
        </header>
      </>
    );
}