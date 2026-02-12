"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ title }: { title?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label={title || "Go back"}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {title}
    </button>
  );
}
