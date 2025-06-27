# Navigation System Documentation

## Overview

The Malric Pharma website features a responsive navigation system that adapts based on user authentication status and provides intuitive access to all application features.

## Components

### 1. Main Navigation (Navbar.tsx)

The navigation bar is a sticky component that remains at the top of the page during scrolling.

#### Features:

- **Responsive Design**: Desktop and mobile-optimized layouts
- **Authentication-aware**: Shows different links based on login status
- **Cart Integration**: Real-time cart item count display
- **Smooth Animations**: Mobile menu with slide animations

#### Desktop Navigation:

- Company logo (links to home)
- Public links: Home, Products
- Authenticated user links: Orders
- User menu with name display and logout button
- Shopping cart icon with item count badge

#### Mobile Navigation:

- Hamburger menu toggle
- Collapsible menu with smooth animations
- All desktop features adapted for mobile
- Touch-friendly buttons and links

### 2. Routing System (App.tsx)

The application uses React Router for client-side routing with protected routes.

#### Routes:

```
/ - Home page (public)
/products - Products page (public)
/login - Login form (public)
/signup - Sign up form (public)
/cart - Shopping cart (protected)
/checkout - Checkout process (protected)
/orders - Order history (protected)
```

#### Protected Routes:

- Uses `PrivateRoute` component to ensure authentication
- Redirects to login page if user is not authenticated
- Maintains redirect URL for post-login navigation

### 3. Navigation Links Configuration (navLinks.ts)

Centralized configuration for public navigation links.

```typescript
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];
```

## Authentication Integration

### User States:

1. **Not Authenticated**:

   - Shows: Home, Products, Login
   - Cart accessible but requires login
   - No user-specific features visible

2. **Authenticated**:
   - Shows: Home, Products, Orders
   - User name display with logout button
   - Full access to cart and checkout
   - Order history access

### User Experience:

- Seamless login/logout transitions
- Persistent cart state across authentication
- Clear visual indicators of authentication status
- Easy access to user-specific features

## Technical Implementation

### State Management:

- Uses `useAuth()` hook for authentication state
- Uses `useCart()` hook for cart item count
- React state for mobile menu toggle

### Responsive Design:

- Tailwind CSS utility classes
- Mobile-first approach
- Touch-friendly interface elements
- Optimized spacing and typography

### Icons:

- Lucide React icons for consistency
- Cart, user, menu, and logout icons
- Proper accessibility labels

## Security Considerations

### Protected Routes:

- Server-side validation required for sensitive endpoints
- Client-side route protection for UX only
- Token-based authentication with localStorage persistence

### User Data:

- Minimal user data display (name only)
- Secure logout with token cleanup
- Automatic token refresh handling

## Performance Features

### Optimizations:

- Lazy-loaded mobile menu animations
- Efficient re-renders with proper React keys
- Minimal bundle size with tree shaking
- Fast navigation with client-side routing

### Accessibility:

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios for visibility

## Future Enhancements

### Planned Features:

1. **User Dropdown Menu**: More user options and settings
2. **Search Integration**: Global search in navigation
3. **Notification Badge**: Order status and system notifications
4. **Admin Navigation**: Special navigation for admin users
5. **Breadcrumb Navigation**: For deep page hierarchies

### Potential Improvements:

- Mega menu for product categories
- Quick cart preview on hover
- Keyboard shortcuts for power users
- Progressive Web App (PWA) navigation

## Testing Considerations

### Test Coverage:

- Navigation link functionality
- Authentication state changes
- Mobile menu interactions
- Protected route access
- Cart count updates

### User Scenarios:

1. Guest user browsing products
2. User login/logout flow
3. Authenticated user accessing orders
4. Mobile navigation usage
5. Cart functionality across states

This navigation system provides a solid foundation for the Malric Pharma website with room for future enhancements and excellent user experience across all device types.
