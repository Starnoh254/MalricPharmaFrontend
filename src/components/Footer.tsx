// src/components/Footer.tsx
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import navLinks from "../utils/navLinks";
import { useBrand } from "../hooks/useBrand";

export default function Footer() {
  const { brand } = useBrand();
  return (
    <footer className="bg-secondary text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary mb-4">
              {brand.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted pharmacy providing quality healthcare products and
              services to the community.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-gray-300">Nairobi, Kenya</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+254708733882"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+254 708 733 882</span>
              </a>
              <a
                href={`mailto:${
                  brand.seo.author?.toLowerCase()?.includes("angelic")
                    ? "info@angelicstar.co.ke"
                    : "info@malricpharma.co.ke"
                }`}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>
                  {brand.seo.author?.toLowerCase()?.includes("angelic")
                    ? "info@angelicstar.co.ke"
                    : "info@malricpharma.co.ke"}
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              {navLinks.map((navLink) => (
                <Link
                  key={navLink.path}
                  to={navLink.path}
                  className="block text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {navLink.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href={brand.socials.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={brand.socials.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={brand.socials.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={brand.socials.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
