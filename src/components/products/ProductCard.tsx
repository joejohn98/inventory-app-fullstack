import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function getStockBadge(stock: number) {
  if (stock === 0) {
    return (
      <span className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-md">
        Out of Stock
      </span>
    );
  }
  if (stock <= 10) {
    return (
      <span className="absolute top-2 right-2 px-2 py-1 bg-rose-600 text-white text-xs font-medium rounded-md">
        Low Stock
      </span>
    );
  }
  return null;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/inventory/${product.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.imageUrl || "/No_Image_Available.jpg"}
          width={400}
          height={400}
          loading="eager"
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {getStockBadge(product.stock)}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Department Badge */}
        <div className="mb-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
            {product.department}
          </span>
        </div>

        {/* Name & Description */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Stock */}
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
  );
};

export default ProductCard;
