export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  serviceId: string;
  category: string;
  date: string;
  location: string;
  description: string;
  images: string[];
}

export const services: Service[] = [
  {
    id: "1",
    title: "Wedding Photography",
    slug: "wedding-photography",
    description: "Capture the magic of your special day with our candid and traditional wedding photography.",
    image: "/mock-images/wedding.jpg",
  },
  {
    id: "2",
    title: "Pre-Wedding Shoot",
    slug: "pre-wedding-photography",
    description: "Tell your love story with beautiful outdoor and indoor pre-wedding sessions.",
    image: "/mock-images/pre-wedding.jpg",
  },
  {
    id: "3",
    title: "Portrait Photography",
    slug: "portrait-photography",
    description: "Professional portraits for personal branding, models, and families.",
    image: "/mock-images/portrait.jpg",
  },
  {
    id: "4",
    title: "Maternity & Newborn",
    slug: "maternity-newborn-photography",
    description: "Celebrate the beginning of a new life with our gentle maternity and newborn photography.",
    image: "/mock-images/maternity.jpg",
  },
];

export const portfolio: PortfolioProject[] = [
  {
    id: "p1",
    title: "A Royal Wedding at Taj Palace",
    slug: "royal-wedding-taj",
    serviceId: "1",
    category: "Wedding Photography",
    date: "2026-05-14",
    location: "New Delhi, India",
    description: "A beautiful traditional wedding featuring rich red and gold hues, intricate mehndi, and breathtaking palace architecture.",
    images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"],
  },
  {
    id: "p2",
    title: "Desert Elopement",
    slug: "desert-elopement",
    serviceId: "2",
    category: "Pre-Wedding Shoot",
    date: "2026-03-22",
    location: "Pushkar, Rajasthan",
    description: "An intimate and cinematic pre-wedding shoot captured during the golden hour in the sweeping sand dunes.",
    images: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80"],
  },
  {
    id: "p3",
    title: "Editorial Fashion Campaign",
    slug: "editorial-fashion",
    serviceId: "3",
    category: "Portrait Photography",
    date: "2026-08-10",
    location: "Mumbai Studio",
    description: "High-contrast, Vogue-style editorial portraits for a premium bespoke jewelry brand.",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"],
  },
  {
    id: "p4",
    title: "New Beginnings",
    slug: "new-beginnings-maternity",
    serviceId: "4",
    category: "Maternity",
    date: "2026-06-05",
    location: "Botanical Gardens",
    description: "Soft, ethereal maternity photography blending the beauty of nature with the miracle of life.",
    images: ["https://images.unsplash.com/photo-1503673967005-726487e452a2?auto=format&fit=crop&q=80"],
  }
];
