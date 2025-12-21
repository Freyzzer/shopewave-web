import CategoryPill from "./category-pill";


interface Category {
  id: string;
  name: string;
  emoji: string;
}
const categories: Category[] = [
  { id: "beauty", name: "Beauty", emoji: "💄" },
  { id: "fragrances", name: "Fragrances", emoji: "🌸" },
  { id: "furniture", name: "Furniture", emoji: "🛋️" },
  { id: "groceries", name: "Groceries", emoji: "🛒" },
  { id: "laptops", name: "Laptops", emoji: "💻" },
  { id: "mens-shirts", name: "Shirts", emoji: "👔" },
  { id: "mens-shoes", name: "Shoes", emoji: "👞" },
  { id: "mens-watches", name: "Watches", emoji: "⌚" },
  { id: "smartphones", name: "Phones", emoji: "📱" },
  { id: "womens-bags", name: "Bags", emoji: "👜" },
  { id: "womens-dresses", name: "Dresses", emoji: "👗" },
  { id: "womens-shoes", name: "Heels", emoji: "👠" },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}) {
    return(
  <div className="border-b border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-4">
      <div className="flex gap-3">
        <CategoryPill
          category={{ id: "all", name: "All", emoji: "🛍️" }}
          isSelected={selectedCategory === "all"}
          onClick={() => onCategoryChange("all")}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </div>
    </div>
  </div>
)
};