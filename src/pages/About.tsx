import { Link } from "react-router-dom";
import {
  Truck,
  Clock,
  ShieldCheck,
  Heart,
  Pill,
  Stethoscope,
  ArrowRight,
  Phone,
  MapPin,
} from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import MainLayout from "../components/MainLayout";
import Testimonials from "../components/Testimonials";
import AnimatedCounter from "../components/AnimatedCounter";
import SEOHelmet from "../components/SEOHelmet";
import { useInView } from "../hooks/useCountUp";
import { useBrand } from "../hooks/useBrand";

function About() {
  const { brand } = useBrand();
  // Hook to detect when stats section comes into view
  const { ref: statsRef, isInView: statsInView } = useInView(0.3);

  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free delivery within Nairobi in 24-48 hours. Same day delivery available for urgent orders.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description:
        "All medications are sourced from licensed suppliers and stored under optimal conditions.",
    },
    {
      icon: Clock,
      title: "Always Available",
      description:
        "24/7 customer support and emergency medication delivery when you need it most.",
    },
    {
      icon: Heart,
      title: "Healthcare Support",
      description:
        "Professional pharmaceutical consultation and medication management advice.",
    },
  ];

  const services = [
    {
      icon: Pill,
      title: "Prescription Medications",
      description:
        "Wide range of prescription drugs with proper verification and consultation.",
      link: "/",
    },
    {
      icon: Stethoscope,
      title: "Health Consultations",
      description:
        "Professional pharmaceutical advice and medication counseling services.",
      link: "/contact",
    },
    {
      icon: Heart,
      title: "Wellness Products",
      description:
        "Supplements, vitamins, and health products for your overall wellbeing.",
      link: "/",
    },
  ];

  const stats = [
    { number: 10000, suffix: "+", label: "Happy Customers" },
    { number: 5000, suffix: "+", label: "Products Available" },
    { number: 99.9, suffix: "%", label: "Customer Satisfaction", decimals: 1 },
    { number: 24, suffix: "/7", label: "Support Available" },
  ];

  return (
    <>
      <SEOHelmet
        url={`${brand.seo.siteUrl}/about`}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${brand.name}`,
          description: "Learn about Kenya's leading online pharmacy",
          url: `${brand.seo.siteUrl}/about`,
          mainEntity: {
            "@type": "Pharmacy",
            name: brand.name,
            foundingDate: "2020",
            description:
              "Kenya's trusted online pharmacy serving over 50,000 customers",
          },
        }}
      />
      <MainLayout>
        {/* Hero Section */}
        <HeroBanner />

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Why Choose {brand.name}?
              </h2>
              <p className="text-lg text-grayText max-w-2xl mx-auto">
                We're committed to providing the highest quality pharmaceutical
                services with convenience and care at the center of everything
                we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-grayText text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Our Services
              </h2>
              <p className="text-lg text-grayText max-w-2xl mx-auto">
                Comprehensive healthcare solutions tailored to meet your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-grayText mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary" ref={statsRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix}
                      shouldStart={statsInView}
                      duration={2000 + index * 200} // Stagger animations
                      decimals={stat.decimals || 0}
                      className="text-3xl md:text-4xl font-bold text-white"
                    />
                  </div>
                  <div className="text-green-100 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Browse our extensive collection of medications and health
              products. Professional consultation available for all your
              healthcare needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Shop Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+254714296170"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-secondary mb-2">Call Us</h3>
                <a
                  href="tel:+254714296170"
                  className="text-grayText hover:text-primary transition-colors"
                >
                  +254 714 296 170
                </a>
              </div>

              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-secondary mb-2">Visit Us</h3>
                <p className="text-grayText">Nairobi, Kenya</p>
              </div>

              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-secondary mb-2">
                  Operating Hours
                </h3>
                <p className="text-grayText">24/7 Online Service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </MainLayout>
    </>
  );
}

export default About;
