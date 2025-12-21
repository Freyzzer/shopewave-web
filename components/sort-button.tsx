import { ChevronDown } from "lucide-react";

export default function SortButton({
  sortBy,
  onSortChange,
}: {
  sortBy: string;
  onSortChange: () => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={onSortChange}
            className={`flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              sortBy !== "default"
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            Price{" "}
            {sortBy === "price-asc" ? "↑" : sortBy === "price-desc" ? "↓" : ""}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
