import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TextLink({ tittle }: { tittle: string }) {
  return (
    <Link
      href="/products"
      className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {tittle}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
