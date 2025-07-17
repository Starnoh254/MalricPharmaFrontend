import MainLayout from "../components/MainLayout";
import SEOHelmet from "../components/SEOHelmet";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Truck,
  Clock,
  Star,
} from "lucide-react";

export default function OnlinePharmaciesKenyaBlog() {
  return (
    <>
      <SEOHelmet
        title="Best Online Pharmacies in Kenya 2025 - Complete Guide | Malric Pharma"
        description="Discover the top online pharmacies in Kenya. Compare services, prices, and delivery options. Learn how to safely buy medicines online from licensed pharmacies."
        keywords="online pharmacies Kenya, best online pharmacy Kenya, buy medicines online Kenya, licensed pharmacy Kenya, online chemist Kenya"
        url="https://malricpharma.co.ke/blog/online-pharmacies-kenya"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Best Online Pharmacies in Kenya 2025 - Complete Guide",
          description:
            "Comprehensive guide to online pharmacies in Kenya, including safety tips, comparisons, and how to choose the right pharmacy for your needs.",
          author: {
            "@type": "Organization",
            name: "Malric Pharma",
          },
          publisher: {
            "@type": "Organization",
            name: "Malric Pharma",
            logo: {
              "@type": "ImageObject",
              url: "https://malricpharma.co.ke/logo.png",
            },
          },
          datePublished: "2025-01-15",
          dateModified: "2025-01-15",
        }}
      />
      <MainLayout>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Online Pharmacies in Kenya: Complete Guide 2025
              </h1>
              <p className="text-xl text-blue-100">
                Everything you need to know about buying medicines online safely
                in Kenya
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose Online Pharmacies in Kenya?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Online pharmacies in Kenya have revolutionized how people access
                healthcare and medications. With the convenience of ordering
                from home and having medicines delivered to your doorstep,
                online pharmacies offer a modern solution to traditional
                pharmacy visits.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Truck className="text-blue-600 w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Same-day delivery in Nairobi, next-day for other regions
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <Shield className="text-green-600 w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Licensed & Safe
                  </h3>
                  <p className="text-gray-600">
                    All reputable online pharmacies are licensed by Kenya
                    Pharmacy Board
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <Clock className="text-purple-600 w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    24/7 Access
                  </h3>
                  <p className="text-gray-600">
                    Order anytime, professional consultation available
                  </p>
                </div>
              </div>
            </div>

            {/* Top Online Pharmacies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Top Online Pharmacies in Kenya
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-500 w-6 h-6 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    1. Malric Pharma
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Leading online pharmacy in Kenya with over 1000+ medicines and
                  health products. Licensed by Kenya Pharmacy Board with
                  same-day delivery in Nairobi.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                    <span>Licensed by Kenya Pharmacy Board</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                    <span>Free delivery on orders over KES 2,000</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                    <span>24/7 pharmacist consultation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                    <span>Secure payment options</span>
                  </div>
                </div>
                <a
                  href="https://malricpharma.co.ke"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Visit Malric Pharma
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>

            {/* How to Choose */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                How to Choose the Right Online Pharmacy in Kenya
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    1. Check License
                  </h3>
                  <p className="text-gray-600">
                    Ensure the online pharmacy is licensed by the Kenya Pharmacy
                    and Poisons Board. Look for the license number on their
                    website.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    2. Verify Pharmacist Availability
                  </h3>
                  <p className="text-gray-600">
                    Reputable online pharmacies have licensed pharmacists
                    available for consultation and prescription verification.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    3. Check Reviews and Ratings
                  </h3>
                  <p className="text-gray-600">
                    Read customer reviews and check ratings on Google, Facebook,
                    and other platforms to gauge service quality.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    4. Delivery Coverage
                  </h3>
                  <p className="text-gray-600">
                    Ensure the pharmacy delivers to your location and check
                    delivery times and fees.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Safety Tips for Buying from Online Pharmacies in Kenya
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">
                  Important Safety Guidelines
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>
                      Only buy from licensed online pharmacies in Kenya
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>
                      Always provide valid prescriptions for prescription
                      medicines
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>Verify medicine authenticity upon delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>Check expiry dates and packaging integrity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>
                      Keep receipts and medicine information for records
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                The Future of Online Pharmacies in Kenya
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Online pharmacies in Kenya are transforming healthcare access by
                providing convenient, safe, and affordable medicine delivery
                services. As technology advances and more pharmacies embrace
                digital platforms, we can expect even better services and wider
                coverage across the country.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're looking for prescription medicines,
                over-the-counter drugs, or health supplements, choosing a
                reputable online pharmacy like Malric Pharma ensures you receive
                quality products with professional service.
              </p>

              <div className="bg-blue-50 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Ready to Experience the Best Online Pharmacy in Kenya?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied customers who trust Malric Pharma
                  for their medicine needs.
                </p>
                <a
                  href="https://malricpharma.co.ke"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Shop Now at Malric Pharma
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
