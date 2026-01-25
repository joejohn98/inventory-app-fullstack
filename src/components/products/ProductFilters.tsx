import { DEPARTMENTS, SortField, SortOrder } from "@/types/product";

interface ProductFiltersProps {
  department: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  lowStock: boolean;
  onDepartmentChange: (value: string) => void;
  onSortToggle: (field: SortField) => void;
  onLowStockChange: (value: boolean) => void;
}

const ProductFilters = ({
  department,
  sortBy,
  sortOrder,
  lowStock,
  onDepartmentChange,
  onSortToggle,
  onLowStockChange,
}: ProductFiltersProps) => {

  
  const getSortIndicator = (field: SortField) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const getSortButtonClass = (field: SortField) => {
    return sortBy === field
      ? "bg-purple-50 border-purple-200 text-purple-700"
      : "border-gray-200 text-gray-700 hover:bg-gray-50";
  };

  return (
    <div className="p-4 border-gray-200 bg-gray-50 rounded-b-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div>
          <label
            htmlFor="department-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department
          </label>
          <select
            id="department-filter"
            value={department}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none"
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <div className="flex gap-2">
            <button
              className={`flex-1 px-3 py-2 rounded-lg border ${getSortButtonClass("name")}`}
              onClick={() => onSortToggle("name")}
            >
              Name {getSortIndicator("name")}
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-lg border ${getSortButtonClass("price")}`}
              onClick={() => onSortToggle("price")}
            >
              Price {getSortIndicator("price")}
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-lg border ${getSortButtonClass("stock")}`}
              onClick={() => onSortToggle("stock")}
            >
              Stock {getSortIndicator("stock")}
            </button>
          </div>
        </div>

        {/* Stock Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Status
          </label>
          <label className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={lowStock}
              onChange={(e) => onLowStockChange(e.target.checked)}
              className="mr-2 h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Low Stock Only (≤ 10)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
