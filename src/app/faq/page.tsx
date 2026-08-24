import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | StudioLive",
  description: "Find answers to common questions about our photography services, booking process, pricing, and more.",
};

const faqs = [
  {
    question: "How far in advance should we book?",
    answer: "For weddings, we recommend booking 9-12 months in advance. For portrait and pre-wedding sessions, 1-2 months is usually sufficient."
  },
  {
    question: "Do you travel for destination weddings?",
    answer: "Yes, we absolutely love traveling for destination weddings! Please contact us for a custom travel quote based on your location."
  },
  {
    question: "How many images will we receive?",
    answer: "For a standard 8-hour wedding, you can expect between 400-600 fully edited, high-resolution images. Portrait sessions typically yield 50-100 images."
  },
  {
    question: "What is your turnaround time?",
    answer: "We provide sneak peeks within 48 hours. The full wedding gallery is delivered within 4-6 weeks, and portrait sessions within 2-3 weeks."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <JsonLd data={faqSchema} />
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground text-center mb-16 font-light">Everything you need to know about working with StudioLive.</p>
        
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-white/5 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
