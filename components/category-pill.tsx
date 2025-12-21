export default function CategoryPill({
    category,
    isSelected,
    onClick,
}: {
    category: { id: string; name: string; emoji: string };
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex min-w-fit flex-col  items-center gap-1 rounded-full px-4 py-2 transition-all ${isSelected ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
        >
            <span className="text-xs font-medium text-gray-700">{category.name}</span>
        </button>
    );
}
