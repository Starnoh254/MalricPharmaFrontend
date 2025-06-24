import { useState } from "react";
import { Link } from "react-router-dom"; // for internal navigation
import { Menu, X } from "lucide-react"; // icons for mobile toggle
import navLinks from "../utils/navLinks";
import logo from "../assets/malric.png";

export default function Navbar() {
  // State to toggle the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Main nav container
    // `sticky` keeps it on top while scrolling
    // `top-0` sticks it to the top
    // `z-50` ensures it's above other content
    // `shadow-md` adds a subtle drop shadow
    <nav className="bg-background text-secondary w-full px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/">
          <img src={logo} alt="" className="w-32 " />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 font-heading list-none">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav with animation */}
      <ul
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-60 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        } mt-4 space-y-4 font-heading list-none text-center`}
      >
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              onClick={() => setIsOpen((prev) => !prev)}
              className="hover:text-secondary transition-colors block"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
