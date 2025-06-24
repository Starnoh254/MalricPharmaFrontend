// src/components/Footer.tsx
import { Link } from "react-router-dom";
import navLinks from "../utils/navLinks";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Left side: copyright */}
        <p className="text-center md:text-left mb-4 md:mb-0">
          © {new Date().getFullYear()} Malric Pharma. All rights reserved.
        </p>

        {/* Right side: links */}
        <div className="flex gap-6">
          {navLinks.map((navLink) => {
            return (
              <Link to={navLink.path} className="hover:text-white">
                {navLink.name}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
