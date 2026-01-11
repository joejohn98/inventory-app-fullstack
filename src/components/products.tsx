"use client";

import { Filter, Package, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  department?: string;
}

const Products = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [department, setDepartment] = useState("all");
  const [lowStock, setLowStock] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  const clearFilters = () => {
    setSearchTerm("");
    setDepartment("all");
    setLowStock(false);
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Products
        </h2>
      </div>

      {/*  */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-auto md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/*  */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter size={18} className="mr-1.5" />
              Filters
            </button>

            <button
              className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>

        {/*  */}
        {isFiltersOpen && (
          <div className="p-4 border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  value={department}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-transparent outline-none"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="clothing">Clothing</option>
                  <option value="toys">Toys</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "name"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↓" : "↑")}
                  </button>
                  <button
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "price"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                  <button
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      sortBy === "stock"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Stock{" "}
                    {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <label className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={lowStock}
                    onChange={(e) => setLowStock(e.target.checked)}
                    className="mr-2 h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Low Stock Only (≤ 10)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
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
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/inventory/${product.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <div className="relative aspect-square bg-gray-50">
                <Image
                  src={product.imageUrl || "/No_Image_Available.jpg"}
                  width={400}
                  height={400}
                  loading="eager"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock <= 10 && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-md">
                    Low Stock
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-md">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                    {product.department}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Price:</span>
                    <span className="font-semibold text-gray-800">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Stock:</span>
                    <span
                      className={`font-semibold ${
                        product.stock <= 10 ? "text-rose-600" : "text-gray-800"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
