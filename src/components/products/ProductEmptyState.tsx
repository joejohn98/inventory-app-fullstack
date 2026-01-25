import { Package } from "lucide-react";

interface ProductEmptyStateProps {
  onClearFilters: () => void;
}

const ProductEmptyState = ({ onClearFilters }: ProductEmptyStateProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <Package size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 mb-4">
        Try adjusting your search or filter criteria
      </p>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductEmptyState;
