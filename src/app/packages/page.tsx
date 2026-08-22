import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Photography Packages & Pricing in Your City | StudioLive",
  description: "Explore our affordable and premium photography packages for weddings, pre-weddings, and portraits.",
};

const packages = [
  {
    name: "Essential",
    price: "From $500",
    description: "Perfect for short sessions and portraits.",
    features: ["2 Hours Coverage", "50 Edited Photos", "Online Gallery", "1 Photographer"],
  },
  {
    name: "Premium",
    price: "From $1,500",
    description: "Ideal for weddings and large events.",
    features: ["8 Hours Coverage", "300 Edited Photos", "Premium Album", "2 Photographers"],
    popular: true,
  },
  {
    name: "Ultimate",
    price: "From $2,500",
    description: "Full coverage with cinematic videography.",
    features: ["Full Day Coverage", "Unlimited Photos", "Cinematic Video", "Drone Coverage"],
  }
];

export default function PackagesPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Packages & Pricing</h1>
        <p className="text-xl text-muted-foreground">Transparent pricing for your special moments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div key={idx} className={`relative flex flex-col p-8 rounded-2xl border bg-card ${pkg.popular ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
            {pkg.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full font-medium">
                Most Popular
              </span>
            )}
            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-muted-foreground mb-6">{pkg.description}</p>
            <div className="text-4xl font-bold mb-8">{pkg.price}</div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {pkg.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-center text-muted-foreground">
                  <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'} asChild>
              <Link href="/book">Select Package</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
