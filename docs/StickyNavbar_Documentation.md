# 🌐 Responsive Sticky Navbar — React + TailwindCSS

This document explains the implementation of a responsive **sticky navbar** for a pharmacy website using React, TailwindCSS, and React Router DOM.

---

## 📌 Why We Use `sticky` Instead of `fixed`

### ❌ `fixed` (Not Used)
When a navbar is set to `position: fixed`, it is taken **out of the normal document flow**. This causes the main content to appear **behind the navbar**, requiring awkward manual spacing like `padding-top: 4rem` or `pt-16`. This is **not responsive**, especially on mobile where the navbar height might change.

### ✅ `sticky` (Used)
We use:
```tsx
<nav className="sticky top-0 z-50">
```

This keeps the navbar visible at the top **while scrolling**, but unlike `fixed`, it **remains part of the normal layout flow** — so it doesn’t overlap the content below.

---

## 🧱 Full Navbar Code (With Explanation)

```tsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "Login", path: "/login" },
  ]

  return (
    <nav className="bg-background text-primary w-full px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="font-heading font-bold text-2xl">
          <Link to="/">Malric Pharma</Link>
        </h1>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 font-heading list-none">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="hover:text-secondary transition-colors"
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

      {/* Mobile nav */}
      <ul
        className={\`md:hidden overflow-hidden transition-all duration-300 ease-in-out transform \${isOpen
          ? "max-h-60 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"} mt-4 space-y-4 font-heading list-none text-center\`}
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
  )
}
```

---

## 🧠 Explanation of `navLinks` Array

```ts
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Cart", path: "/cart" },
  { name: "Login", path: "/login" },
]
```

Instead of writing `<Link>` components manually, we use this array to **dynamically generate** nav items with `.map()` — this makes the code:

- **Cleaner**: No repetition
- **Maintainable**: Just edit one array to update nav
- **Scalable**: Add more pages easily

This pattern works for **both desktop and mobile** versions of the nav.

---

## 📱 Responsive Behavior

| Feature         | Behavior                           |
|----------------|------------------------------------|
| Desktop nav     | Shows horizontal links (via `md:flex`) |
| Mobile nav      | Collapses into a hamburger menu    |
| Hamburger icon  | Toggles menu open/close state      |

---

## ✅ Benefits of This Navbar

- Sticky on scroll ✅
- Fully responsive ✅
- No padding hacks ✅
- Clean and DRY code ✅
- Easy to scale and update ✅

---

Now your navbar is ✨ modern ✨, clean, responsive, and headache-free.
