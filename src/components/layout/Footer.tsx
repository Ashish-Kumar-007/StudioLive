import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">StudioLive</h3>
            <p className="text-sm text-muted-foreground">
              Professional photography studio capturing your best moments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services/wedding-photography" className="hover:text-foreground">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link href="/services/pre-wedding-photography" className="hover:text-foreground">
                  Pre-Wedding Shoots
                </Link>
              </li>
              <li>
                <Link href="/services/portrait-photography" className="hover:text-foreground">
                  Portrait Sessions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">Contact</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StudioLive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
