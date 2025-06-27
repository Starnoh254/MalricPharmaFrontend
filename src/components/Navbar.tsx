import { useState } from "react";
import { Link } from "react-router-dom"; // for internal navigation
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"; // icons for mobile toggle and cart
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import navLinks from "../utils/navLinks";
import logo from "../assets/malric.png";

export default function Navbar() {
  // State to toggle the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

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
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-heading list-none">
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
            {/* Authenticated user links */}
            {isAuthenticated && (
              <li>
                <Link
                  to="/orders"
                  className="hover:text-primary transition-colors"
                >
                  Orders
                </Link>
              </li>
            )}
          </ul>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Count */}
            <Link
              to="/cart"
              className="relative hover:text-primary transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={logout}
                  className="hover:text-primary transition-colors ml-2"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

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
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        } mt-4 space-y-4 font-heading text-center`}
      >
        <ul className="space-y-4 list-none">
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

          {/* Authenticated user links for mobile */}
          {isAuthenticated && (
            <li>
              <Link
                to="/orders"
                onClick={() => setIsOpen((prev) => !prev)}
                className="hover:text-secondary transition-colors block"
              >
                Orders
              </Link>
            </li>
          )}

          {/* Mobile Cart Link */}
          <li>
            <Link
              to="/cart"
              onClick={() => setIsOpen((prev) => !prev)}
              className="hover:text-secondary transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {itemCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </li>

          {/* Mobile user actions */}
          {isAuthenticated ? (
            <>
              <li className="flex items-center justify-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="hover:text-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen((prev) => !prev)}
                className="hover:text-secondary transition-colors block"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
