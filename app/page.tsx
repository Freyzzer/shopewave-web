import SectionProduct from "@/components/section-product";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center px-4 py-16 md:py-24 lg:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Limited Time Offer
          </p>
          <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Up to 50% off on select products
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Discover quality products at unbeatable prices. Free shipping on orders over $500.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* Product Sections */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:px-6">
        <SectionProduct />
      </div>
    </>
  );
}
