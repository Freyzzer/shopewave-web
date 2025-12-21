"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import { ProductFiltersState, CategoryItem } from "@/types/products";


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
    <Card className=" border-none shadow-nones">
      <CardContent className="space-y-5 p-4">
        <p className="font-semibold text-lg">Filtros</p>

        {/* Categorías */}
        <div>
          <p className="mb-2 text-sm font-medium">Categorías</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.name}
                variant={
                  value.categories.includes(cat.name)
                    ? "default"
                    : "outline"
                }
                onClick={() => toggleCategory(cat.name)}
                className="cursor-pointer"
              >
                {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Precio</p>
          <Slider
            value={value.priceRange}
            max={2000}
            step={50}
            onValueChange={(v) =>
              onChange({ ...value, priceRange: [v[0], v[1]] })
            }
          />
          <p className="text-xs text-muted-foreground mt-1">
            ${value.priceRange[0]} - ${value.priceRange[1]}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Rating mínimo</p>
          <Select
            value={String(value.minRating)}
            onValueChange={(v) =>
              onChange({ ...value, minRating: Number(v) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Cualquiera</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={value.onlyStock}
            onCheckedChange={() =>
              onChange({
                ...value,
                onlyStock: !value.onlyStock,
              })
            }
          />
          <span className="text-sm">Solo con stock</span>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Ordenar por</p>
          <Select
            value={value.sortBy}
            onValueChange={(v) =>
              onChange({ ...value, sortBy: v })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="price-asc">Precio ↑</SelectItem>
              <SelectItem value="price-desc">Precio ↓</SelectItem>
              <SelectItem value="rating">Mejor rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* MOBILE */}
      <div className="lg:hidden mb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              Filtros
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-full p-0"
          >
            <SheetHeader className="p-4">
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-full">
              {FiltersContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block w-full">
        <Card>{FiltersContent}</Card>
      </div>
    </>
  );
}
