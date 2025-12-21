import { ArrowLeft, Search } from "lucide-react";

export default function SearchHeader({
  searchQuery,
  onSearchChange,
  onSearch,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
