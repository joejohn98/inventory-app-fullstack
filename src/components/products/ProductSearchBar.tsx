import { Search, Filter } from "lucide-react";

interface ProductSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

const ProductSearchBar = ({
  searchTerm,
  onSearchChange,
  isFiltersOpen,
  onToggleFilters,
  onClearFilters,
}: ProductSearchBarProps) => {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="relative w-full md:w-auto md:flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <button
          className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors ${
            isFiltersOpen
              ? "bg-purple-50 border-purple-200 text-purple-700"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={onToggleFilters}
        >
          <Filter size={18} className="mr-1.5" />
          Filters
        </button>

        <button
          className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ProductSearchBar;
