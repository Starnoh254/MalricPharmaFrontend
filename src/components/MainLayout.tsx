// src/components/MainLayout.tsx
import type { ReactNode } from "react";
import Navbar from "./Navbar"; // import your nav
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="bg-background text-primary min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <Navbar />
      {/* Main content that grows */}
      <main className="flex-1 px-4 py-4">{children}</main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}
