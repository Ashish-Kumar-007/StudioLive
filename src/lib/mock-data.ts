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
    title: "A Royal Wedding at Taj Hotel",
    slug: "royal-wedding-taj",
    serviceId: "1",
    date: "2026-05-14",
    location: "City, Country",
    description: "A beautiful traditional wedding with modern candid moments.",
    images: ["/mock-images/p1-1.jpg", "/mock-images/p1-2.jpg"],
  }
];
