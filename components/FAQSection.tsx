export default function FAQSection() {
  const faqs = [
    {
      question: "What are research peptides?",
      answer:
        "Research peptides are short chains of amino acids used in laboratory research. They are intended for research use only and not for human consumption.",
    },
    {
      question: "How are peptides shipped?",
      answer:
        "All products are shipped discreetly and securely from Australia. Orders are packaged to maintain product integrity during transit.",
    },
    {
      question: "How should peptides be stored?",
      answer:
        "Peptides are supplied lyophilized and should be stored refrigerated (2–8°C) before reconstitution. After reconstitution, store refrigerated and use within 30 days.",
    },
    {
      question: "How long does shipping take?",
      answer: "Estimated delivery within Australia is 3–7 business days after dispatch. Processing time is usually 24–48 hours.",
    },
    {
      question: "Are your peptides lab tested?",
      answer: "Yes — our products are prepared following strict quality controls and are third-party tested where applicable. Certificates of analysis are available on request.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="section-padding container-custom">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 text-slate-700">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-2">{f.question}</h3>
              <p className="text-sm leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
