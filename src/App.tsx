import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import About from "./pages/About"; // Renamed from Home
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import BlogPage from "./pages/BlogPage";
import OnlinePharmaciesKenyaBlog from "./pages/OnlinePharmaciesKenyaBlog";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Root path now shows products for immediate shopping experience */}
          <Route path="/" element={<Products />} />

          {/* About page contains the previous home page content */}
          <Route path="/about" element={<About />} />

          {/* Keep products route for backward compatibility and navigation */}
          <Route path="/products" element={<Products />} />

          {/* Category routes */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/blog/online-pharmacies-kenya"
            element={<OnlinePharmaciesKenyaBlog />}
          />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
