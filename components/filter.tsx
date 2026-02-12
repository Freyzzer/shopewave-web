"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductFiltersState, CategoryItem } from "@/types/products";
import { SlidersHorizontal } from "lucide-react";

interface ProductFiltersProps {
  categories: CategoryItem[];
  value: ProductFiltersState;
  onChange: (filters: ProductFiltersState) => void;
}

export function ProductFilters({
  categories,
  value,
  onChange,
}: ProductFiltersProps) {
  const [open, setOpen] = useState(false);

  const toggleCategory = (id: string) => {
    const updated = value.categories.includes(id)
      ? value.categories.filter((c) => c !== id)
      : [...value.categories, id];

    onChange({ ...value, categories: updated });
  };

  const FiltersContent = (
    <div className="flex flex-col gap-8" role="group" aria-label="Product filters">
      {/* Categories */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-foreground">
          Categories
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge
              key={cat.name}
              variant={
                value.categories.includes(cat.name)
                  ? "default"
                  : "outline"
              }
              onClick={() => toggleCategory(cat.name)}
              className="cursor-pointer text-xs transition-colors"
              role="checkbox"
              aria-checked={value.categories.includes(cat.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleCategory(cat.name);
                }
              }}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </fieldset>

      {/* Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Price Range
        </label>
        <Slider
          value={value.priceRange}
          max={2000}
          step={50}
          onValueChange={(v) =>
            onChange({ ...value, priceRange: [v[0], v[1]] })
          }
          aria-label="Price range"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          ${value.priceRange[0]} - ${value.priceRange[1]}
        </p>
      </div>

      {/* Min Rating */}
      <div>
        <label
          htmlFor="min-rating"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Minimum Rating
        </label>
        <Select
          value={String(value.minRating)}
          onValueChange={(v) =>
            onChange({ ...value, minRating: Number(v) })
          }
        >
          <SelectTrigger id="min-rating" className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="4.5">4.5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stock only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="stock-only"
          checked={value.onlyStock}
          onCheckedChange={() =>
            onChange({ ...value, onlyStock: !value.onlyStock })
          }
        />
        <label
          htmlFor="stock-only"
          className="text-sm text-foreground cursor-pointer"
        >
          In stock only
        </label>
      </div>

      {/* Sort */}
      <div>
        <label
          htmlFor="sort-by"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Sort by
        </label>
        <Select
          value={value.sortBy}
          onValueChange={(v) => onChange({ ...value, sortBy: v })}
        >
          <SelectTrigger id="sort-by" className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Best Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full gap-2 text-sm"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto pb-8">{FiltersContent}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <div className="hidden rounded-xl border border-border bg-card p-6 lg:block">
        <h3 className="mb-6 text-sm font-semibold text-foreground">
          Filters
        </h3>
        {FiltersContent}
      </div>
    </>
  );
}
