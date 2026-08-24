import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Shop Prints & Albums | StudioLive",
  description: "Purchase premium photo albums, fine art prints, and custom frames directly from StudioLive.",
};

const products = [
  {
    id: 1,
    name: "Premium Layflat Photo Album",
    price: "299.00",
    description: "A gorgeous 10x10 handcrafted layflat album with genuine leather cover.",
    image: "/mock-images/portrait.jpg"
  },
  {
    id: 2,
    name: "Fine Art Print Collection",
    price: "150.00",
    description: "Set of 10 museum-quality archival prints in a custom presentation box.",
    image: "/mock-images/portrait.jpg"
  },
  {
    id: 3,
    name: "Custom Framing (16x24)",
    price: "199.00",
    description: "Professional framing with anti-reflective museum glass.",
    image: "/mock-images/portrait.jpg"
  }
];

const productSchema = products.map(product => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}));

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      {productSchema.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-6">Print Shop</h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Transform your digital memories into tangible heirlooms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden group">
              <div className="aspect-square bg-muted relative">
                 <div className="absolute inset-0 bg-cover bg-center grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url(${product.image})` }} />
              </div>
              <div className="p-6 text-center">
                <h2 className="font-playfair text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="text-2xl font-bold text-primary mb-6">${product.price}</div>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
