import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Client Reviews | StudioLive",
  description: "Read what our clients have to say about their photography experience with StudioLive.",
};

const reviews = [
  {
    author: "Sarah & James",
    date: "2026-06-15",
    rating: 5,
    text: "Absolutely stunning photography. The team made us feel so comfortable and the final edits were breathtaking. Highly recommend!"
  },
  {
    author: "Emily R.",
    date: "2026-05-22",
    rating: 5,
    text: "StudioLive captured my senior portraits perfectly. They knew exactly how to use the natural light to make the photos look ethereal and cinematic."
  },
  {
    author: "The Thompson Family",
    date: "2026-04-10",
    rating: 5,
    text: "We book them every year for our family portraits. Always professional, always incredible results."
  }
];

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.studiolive.example.com",
  "name": "StudioLive",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "48"
  },
  "review": reviews.map(r => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": r.author
    },
    "datePublished": r.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": r.rating
    },
    "reviewBody": r.text
  }))
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <JsonLd data={reviewsSchema} />
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-5xl font-bold mb-6 text-center">Client Stories</h1>
        <p className="text-xl text-muted-foreground text-center mb-16 font-light">Don't just take our word for it. Read what our clients have experienced.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-card border border-white/5 p-8 rounded-2xl">
              <div className="flex text-primary mb-4">
                {"★".repeat(review.rating)}
              </div>
              <p className="text-muted-foreground italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">{review.author}</span>
                <span className="text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
