"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value?: number;
  total?: number;
  onChange?: (val: number) => void;
  size?: number;
}

export function StarRating({
  value = 0,
  total = 5,
  onChange,
  size = 26,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: total }).map((_, index) => {
        const n = index + 1;
        const active = (hover ?? value) >= n;

        return (
          <Star
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange?.(n)}
            className={`
              cursor-pointer transition-transform duration-150
              ${active ? "fill-yellow-400 text-yellow-400 scale-110" : "text-muted-foreground"}
            `}
            width={size}
            height={size}
          />
        );
      })}
    </div>
  );
}
    