// FAQ data for SEO and featured snippets
import { BRANDS, detectBrandByLocation } from "../config/brands";
const currentBrand = BRANDS[detectBrandByLocation()];

export const pharmacyFAQs = [
  {
    question: "Is it safe to buy medicines online in Kenya?",
    answer: `Yes, it's completely safe when you buy from licensed pharmacies like ${currentBrand.name}. We are regulated by the Kenya Pharmacy & Poisons Board and follow strict quality standards for all our medications.`,
    category: "Safety & Trust",
  },
  {
    question: "Do you deliver medicines in Nairobi?",
    answer:
      "Yes, we offer same-day delivery in Nairobi and next-day delivery to other parts of Kenya. Delivery is free for orders over KES 2,000.",
    category: "Delivery",
  },
  {
    question: "How do I order prescription medicines online?",
    answer:
      "Simply upload your prescription during checkout, or send it to our pharmacist for verification. We ensure all prescription medicines are dispensed only with valid prescriptions.",
    category: "Ordering",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, Airtel Money, credit/debit cards, and bank transfers. All payments are processed securely through encrypted systems.",
    category: "Payment",
  },
  {
    question: "Are your medicines genuine?",
    answer:
      "All our medicines are 100% genuine and sourced directly from licensed pharmaceutical manufacturers and distributors. We never sell counterfeit or expired medications.",
    category: "Quality",
  },
  {
    question: "What areas do you deliver to in Kenya?",
    answer:
      "We deliver nationwide across Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all major towns. Same-day delivery is available in Nairobi.",
    category: "Delivery",
  },
  {
    question: "Do you have licensed pharmacists?",
    answer:
      "Yes, we have qualified and licensed pharmacists available 24/7 to provide medication guidance and answer your health questions.",
    category: "Professional Service",
  },
  {
    question: "Can I return medicines if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day return policy for unopened medicines. For opened medicines, returns are accepted only if there's a quality issue.",
    category: "Returns",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Same-day delivery in Nairobi (2-6 hours), next-day delivery to other major towns, and 2-3 days for remote areas. Express delivery available.",
    category: "Delivery",
  },
  {
    question: "Do you sell over-the-counter medicines?",
    answer:
      "Yes, we have a wide range of over-the-counter medicines including pain relievers, cold medicines, vitamins, and health supplements.",
    category: "Products",
  },
];

// Generate FAQ Schema for SEO
export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pharmacyFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};
