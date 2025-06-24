function Testimonials() {
  const testimonials = [
    {
      quote: "This app saved my mum’s life!",
      name: "Grace W.",
    },
    {
      quote: "Affordable and fast delivery.",
      name: "James K.",
    },
    {
      quote: "The most reliable pharmacy I’ve used online.",
      name: "Aisha M.",
    },
  ];

  return (
    <section className="bg-white text-primary py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
          What Our Customers Say
        </h2>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-lg italic text-secondary mb-4">“{t.quote}”</p>
              <p className="font-semibold text-grayText">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
