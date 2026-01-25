"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import Pagination from "./pagination";
import ProductCard from "./products/ProductCard";
import ProductSearchBar from "./products/ProductSearchBar";
import ProductFilters from "./products/ProductFilters";
import ProductEmptyState from "./products/ProductEmptyState";
import { Product, SortField, SortOrder } from "@/types/product";

const ITEMS_PER_PAGE = 8;

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [department, setDepartment] = useState("all");
  const [lowStock, setLowStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();

  // Sync department from URL
  useEffect(() => {
    const deptParam = searchParams.get("department");
    if (deptParam) {
      setDepartment(deptParam);
    }
  }, [searchParams]);

  // Filter Functions
  const searchFilter = (product: Product) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.sku.toLowerCase().includes(term)
    );
  };

  const departmentFilter = (product: Product) => {
    return (
      department === "all" || product.department?.toLowerCase() === department
    );
  };

  const stockFilter = (product: Product) => {
    return !lowStock || product.stock <= 10;
  };

  const sortProducts = (a: Product, b: Product) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      comparison = a.price - b.price;
    } else if (sortBy === "stock") {
      comparison = a.stock - b.stock;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  };

  // Computed Values
  const filteredProducts = useMemo(() => {
    return products
      .filter(searchFilter)
      .filter(departmentFilter)
      .filter(stockFilter)
      .sort(sortProducts);
  }, [products, searchTerm, department, lowStock, sortBy, sortOrder]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    );
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Event Handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    setPage(1);
  };

  const handleLowStockChange = (value: boolean) => {
    setLowStock(value);
    setPage(1);
  };

  const handleSortToggle = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setDepartment("all");
    setLowStock(false);
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
    setIsFiltersOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Products
        </h2>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <ProductSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          isFiltersOpen={isFiltersOpen}
          onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
          onClearFilters={handleClearFilters}
        />

        {isFiltersOpen && (
          <ProductFilters
            department={department}
            sortBy={sortBy}
            sortOrder={sortOrder}
            lowStock={lowStock}
            onDepartmentChange={handleDepartmentChange}
            onSortToggle={handleSortToggle}
            onLowStockChange={handleLowStockChange}
          />
        )}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <ProductEmptyState onClearFilters={handleClearFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
