import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import SEOHelmet from "../components/SEOHelmet";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useBrand } from "../hooks/useBrand";

export default function BlogPage() {
  const { brand } = useBrand();
  const blogPosts = [
    {
      title: "Best Online Pharmacies in Kenya 2025 - Complete Guide",
      excerpt:
        "Discover the top online pharmacies in Kenya. Compare services, prices, and delivery options. Learn how to safely buy medicines online from licensed pharmacies.",
      slug: "online-pharmacies-kenya",
      date: "January 15, 2025",
      author: `${brand.name} Team`,
      category: "Pharmacy Guide",
      readTime: "8 min read",
      image: "/hero-banner.png",
    },
    // Future blog posts can be added here
  ];

  return (
    <>
      <SEOHelmet
        url={`${brand.seo.siteUrl}/blog`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${brand.name} Health Blog`,
          description:
            "Health and pharmacy insights from Kenya's leading online pharmacy",
          url: `${brand.seo.siteUrl}/blog`,
          publisher: {
            "@type": "Organization",
            name: brand.name,
            logo: {
              "@type": "ImageObject",
              url: `${brand.seo.siteUrl}/logo.png`,
            },
          },
        }}
      />
      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Health & Pharmacy Blog
              </h1>
              <p className="text-xl text-blue-100">
                Expert advice on health, medicines, and pharmacy services in
                Kenya
              </p>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="text-center mt-12">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  More Health Content Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6">
                  We're constantly adding new articles about health, medicines,
                  and pharmacy services. Stay tuned for more expert insights and
                  practical health tips.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    Medicine Safety Tips
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                    Health & Wellness
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                    Pharmacy Services
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                    Healthcare in Kenya
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
