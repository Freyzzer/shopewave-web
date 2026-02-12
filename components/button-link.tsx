import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ButtonLink({ title }: { title: string }) {
  return (
    <Link
      href="/products"
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      {title}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
