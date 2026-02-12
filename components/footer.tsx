import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 lg:px-6">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-foreground">ShopWave</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Quality products, secure shopping, and nationwide delivery.
          </p>
        </div>

        {/* Store */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Store
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/products"
                className="text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Support
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#"
                className="text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Newsletter
          </h4>
          <p className="text-sm text-muted-foreground">
            Get offers and updates directly in your inbox.
          </p>
          <form className="flex gap-2" aria-label="Newsletter subscription">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
              aria-required="true"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row lg:px-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground" aria-label="Facebook">
              Facebook
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground" aria-label="Instagram">
              Instagram
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground" aria-label="Twitter">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
