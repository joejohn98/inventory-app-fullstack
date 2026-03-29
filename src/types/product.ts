export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  sku: string;
  imageUrl: string | null;
  department?: string;
}

export type SortField = "name" | "price" | "stock";
export type SortOrder = "asc" | "desc";

export interface ProductFilterState {
  searchTerm: string;
  department: string;
  lowStock: boolean;
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
}

export const ITEMS_PER_PAGE = 8;

export const DEPARTMENTS = [
  { value: "all", label: "All Departments" },
  { value: "Kitchen", label: "Kitchen" },
  { value: "Clothing", label: "Clothing" },
  { value: "Toys", label: "Toys" },
  { value: "Electronics", label: "Electronics" },
] as const;

// Departments for product forms (excludes "all" filter option)
export const PRODUCT_DEPARTMENTS = DEPARTMENTS.filter(
  (dept) => dept.value !== "all",
);
