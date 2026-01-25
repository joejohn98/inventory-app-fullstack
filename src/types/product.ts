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
  { value: "kitchen", label: "Kitchen" },
  { value: "clothing", label: "Clothing" },
  { value: "toys", label: "Toys" },
  { value: "electronics", label: "Electronics" },
] as const;
