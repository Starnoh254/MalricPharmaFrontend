import heroImage from "../assets/hero-banner.png";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="bg-background text-primary py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* === Left Side: Text + CTA === */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            Affordable health
            <br /> at your doorstep
          </h1>
          <p className="text-lg text-grayText mb-6">
            Order your medication easily and securely from the comfort of your
            home.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl shadow-md hover:bg-secondary transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* === Right Side: Image === */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Pharmacy delivery illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
