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
    id: "p1", title: "A Royal Wedding at Taj Palace", slug: "royal-wedding-taj", serviceId: "1", category: "Wedding Photography", date: "2026-05-14", location: "New Delhi, India",
    description: "A beautiful traditional wedding featuring rich red and gold hues, intricate mehndi, and breathtaking palace architecture.",
    images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"],
  },
  {
    id: "p2", title: "Desert Elopement", slug: "desert-elopement", serviceId: "2", category: "Pre-Wedding Shoot", date: "2026-03-22", location: "Pushkar, Rajasthan",
    description: "An intimate and cinematic pre-wedding shoot captured during the golden hour in the sweeping sand dunes.",
    images: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"],
  },
  {
    id: "p3", title: "Editorial Fashion Campaign", slug: "editorial-fashion", serviceId: "3", category: "Portrait Photography", date: "2026-08-10", location: "Mumbai Studio",
    description: "High-contrast, Vogue-style editorial portraits for a premium bespoke jewelry brand.",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"],
  },
  {
    id: "p4", title: "New Beginnings", slug: "new-beginnings-maternity", serviceId: "4", category: "Maternity", date: "2026-06-05", location: "Botanical Gardens",
    description: "Soft, ethereal maternity photography blending the beauty of nature with the miracle of life.",
    images: ["https://images.unsplash.com/photo-1503673967005-726487e452a2?auto=format&fit=crop&q=80"],
  },
  {
    id: "p5", title: "Midnight Reception", slug: "midnight-reception", serviceId: "1", category: "Events", date: "2026-04-18", location: "Udaipur",
    description: "A glamorous nighttime reception with sparklers, dancing, and cinematic flash photography.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"],
  },
  {
    id: "p6", title: "Mountain Top Vows", slug: "mountain-vows", serviceId: "1", category: "Wedding Photography", date: "2026-02-12", location: "Manali",
    description: "A breathtaking snowy elopement shot against the majestic Himalayan peaks.",
    images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80"],
  },
  {
    id: "p7", title: "Urban Couple Shoot", slug: "urban-couple", serviceId: "2", category: "Pre-Wedding Shoot", date: "2026-07-22", location: "Mumbai",
    description: "A moody, cinematic cityscape shoot featuring vintage cars and neon lights.",
    images: ["https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80"],
  },
  {
    id: "p8", title: "Heirloom Portraits", slug: "heirloom-portraits", serviceId: "3", category: "Portrait Photography", date: "2026-01-05", location: "Kolkata",
    description: "Classic fine-art black and white portraits capturing raw emotion and legacy.",
    images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"],
  },
  {
    id: "p9", title: "Sangeet Night", slug: "sangeet-night", serviceId: "1", category: "Wedding Photography", date: "2026-09-15", location: "Goa",
    description: "A high-energy, colorful celebration filled with motion-blurred dancing shots.",
    images: ["https://images.unsplash.com/photo-1532712938736-59c79cbd3fa3?auto=format&fit=crop&q=80"],
  },
  {
    id: "p10", title: "Sunset Maternity", slug: "sunset-maternity", serviceId: "4", category: "Maternity", date: "2026-10-10", location: "Kerala",
    description: "Silhouetted maternity shots on the backwaters during a perfect golden sunset.",
    images: ["https://images.unsplash.com/photo-1492552181161-62217fc3076d?auto=format&fit=crop&q=80"],
  },
  {
    id: "p11", title: "Vintage Villa Wedding", slug: "vintage-villa", serviceId: "1", category: "Wedding Photography", date: "2026-11-20", location: "Jaipur",
    description: "Soft, pastel-toned wedding photography in a centuries-old heritage villa.",
    images: ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"],
  },
  {
    id: "p12", title: "The First Look", slug: "first-look", serviceId: "1", category: "Wedding Photography", date: "2026-12-05", location: "Agra",
    description: "Emotional, candid moments capturing the exact second the groom saw the bride.",
    images: ["https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80"],
  },
  {
    id: "p13", title: "Drone Aerials", slug: "drone-aerials", serviceId: "1", category: "Cinematography", date: "2026-08-30", location: "Andaman",
    description: "Spectacular top-down drone shots of a beachside mandap.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"],
  },
  {
    id: "p14", title: "Bridal Details", slug: "bridal-details", serviceId: "1", category: "Wedding Photography", date: "2026-05-18", location: "Delhi",
    description: "Macro photography focusing on the delicate jewelry, lehenga embroidery, and rings.",
    images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"],
  },
  {
    id: "p15", title: "Studio Live Tour", slug: "studio-live-tour", serviceId: "3", category: "Commercial", date: "2026-03-10", location: "Mumbai",
    description: "Behind the scenes shots of our professional studio lighting and setup.",
    images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80"],
  }
];
