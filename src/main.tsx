import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import BrandProvider from "./context/BrandContext";
// Import environment validation
import "./config/env";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrandProvider>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </BrandProvider>
  </StrictMode>
);
