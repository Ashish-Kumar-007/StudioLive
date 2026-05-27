import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  keywords: string[];
  snippet: string;
  img: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Chemistry of Light: Palace Wedding Cinematography in Rajasthan",
    slug: "chemistry-of-light-palace-weddings",
    category: "Destination Weddings",
    date: "May 12, 2026",
    author: "Ashish Kumar",
    keywords: ["luxury wedding photographer", "cinematic wedding films", "wedding cinematography", "luxury event photography"],
    snippet: "Unlocking the secrets of Udaipur palaces during golden hour. Learn how we harness natural light shafts and ARRI Alexa HDR arrays to capture authentic, cinematic heritage unions.",
    img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800"
  },
  {
    title: "Mastering the Gaze: The Psychology Behind Cinematic Portraits",
    slug: "psychology-of-cinematic-portraits",
    category: "Lighting Science",
    date: "April 24, 2026",
    author: "Vikram Rathore",
    keywords: ["cinematic portraits", "premium photography studio", "high-end photography studio"],
    snippet: "Why is a portrait emotionally moving? We explore the intersection of 85mm optical compression, candidate expression triggers, and side-spotlight shadows that evoke fine-art oil painting aesthetics.",
    img: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?q=80&w=800"
  },
  {
    title: "The Heritage Keepsake: Why Handcrafted Italian Leather Albums Matter",
    slug: "why-italian-albums-matter",
    category: "Fine-Art Preservation",
    date: "March 18, 2026",
    author: "Priya Sharma",
    keywords: ["professional photography services", "high-end photography studio", "cinematic photography studio"],
    snippet: "In a digital-first era, physical hand-bound albums remain the ultimate vessel for family legacies. Discover the custom Italian leather selection and chemical dye preservation formulas we use.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800"
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What makes a photography studio website 'cinematic'?",
    answer: "A cinematic photography studio uses visual storytelling tools—such as desaturated grading, anamorphic aspect ratios, three-point spotlight beams, and procedural audio feedback—to present portfolios as curated theatrical scenes rather than flat lists."
  },
  {
    question: "How do luxury wedding photographers handle palace locations in Rajasthan?",
    answer: "Elite studios specialize in location geography, matching natural golden hours with structural elements in City Palace Udaipur or Rambagh Palace Jaipur. They orchestrate permits, twilight aerial drone arrays, and dual cinema-grade setups seamlessly."
  },
  {
    question: "Why are physical Italian-crafted photobooks included in premium tiers?",
    answer: "Digital formats expire with software cycles. Fine-art handcrafted albums printed with acid-free chemical preservation techniques act as permanent, physical heirlooms that preserve emotional clarity for generations."
  }
];

export const BlogSystem: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useEffect(() => {
    // 1. Inject JSON-LD Schema Markup dynamically for SEO Rich Snippets
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "StudioLive Visual Arts Journal",
      "description": "Premium resources on destination weddings, portrait lighting science, and cinematic photography pipelines in Rajasthan.",
      "publisher": {
        "@type": "Organization",
        "name": "StudioLive",
        "logo": {
          "@type": "ImageObject",
          "url": "https://studiolive.com/logo.png"
        }
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": "2026-05-27",
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "description": post.snippet,
        "image": post.img,
        "keywords": post.keywords.join(", ")
      }))
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scriptArticle = document.createElement('script');
    scriptArticle.type = 'application/ld+json';
    scriptArticle.id = 'seo-article-schema';
    scriptArticle.text = JSON.stringify(articleSchema);
    document.head.appendChild(scriptArticle);

    const scriptFAQ = document.createElement('script');
    scriptFAQ.type = 'application/ld+json';
    scriptFAQ.id = 'seo-faq-schema';
    scriptFAQ.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFAQ);

    return () => {
      // Clean up scripts on unmount
      const existingArticleScript = document.getElementById('seo-article-schema');
      if (existingArticleScript) document.head.removeChild(existingArticleScript);

      const existingFAQScript = document.getElementById('seo-faq-schema');
      if (existingFAQScript) document.head.removeChild(existingFAQScript);
    };
  }, []);

  return (
    <section className="content-section min-h-screen py-24 px-[5%] max-w-[1200px] mx-auto relative z-20" id="blog">
      <div className="w-full flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-goldPrimary mb-3">
            Creative Journal
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            The Stories Behind The Lens
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-saffronPrimary to-transparent mx-auto" />
        </div>

        {/* Blog Posts Grid - Semantic HTML5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full text-left">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 bg-surfaceDark/40 flex flex-col justify-between group transition-all duration-500 hover:border-goldPrimary/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Header Image */}
              <header className="h-[220px] relative overflow-hidden pointer-events-none">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover desaturate-sweep"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgDark to-transparent opacity-65" />
                <span className="absolute top-5 left-5 bg-bgDark/80 border border-goldPrimary/20 text-goldPrimary text-[9px] font-bold font-mono tracking-widest uppercase py-1.5 px-3 rounded-full shadow-lg">
                  {post.category}
                </span>
              </header>

              {/* Main Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Author / Date Meta bar */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-textDim mb-4">
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="text-goldPrimary" /> {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-goldPrimary" /> {post.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white mb-4 tracking-wide group-hover:text-goldPrimary transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-textDim text-sm leading-relaxed mb-6">
                    {post.snippet}
                  </p>

                </div>

                {/* Read Button */}
                <div className="text-xs font-semibold uppercase text-goldPrimary flex items-center gap-2 tracking-[0.1em] group-hover:translate-x-1.5 transition-transform duration-300 mt-2">
                  Read Visual Article <ArrowRight size={14} />
                </div>

              </div>

            </article>
          ))}
        </div>

        {/* Interactive FAQ Block for Rich Snippets */}
        <div className="w-full glass-panel p-8 md:p-12 rounded-[40px] border border-goldPrimary/15 text-left shadow-2xl">
          
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-widest text-saffronPrimary uppercase mb-2 block font-mono">
              Knowledge Base
            </span>
            <h3 className="font-serif text-3xl text-white tracking-wide">
              Frequently Inquired Scripts
            </h3>
            <div className="w-16 h-[1px] bg-goldPrimary/40 mt-3" />
          </div>

          <div className="flex flex-col gap-4 w-full">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/5 pb-4 w-full"
              >
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                  className="w-full py-4 flex items-center justify-between text-left text-white hover:text-goldPrimary transition-colors duration-300 font-serif text-lg md:text-xl font-medium focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-goldPrimary/60 shrink-0 ml-4">
                    {openFAQIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQIndex === index ? 'max-h-[300px] mt-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-textDim text-sm md:text-base leading-relaxed pl-1 pb-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
