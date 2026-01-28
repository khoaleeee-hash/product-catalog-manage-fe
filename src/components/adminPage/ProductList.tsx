import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts, getProductsByCategoryId } from "../../services/ProductService";
import type { Product } from "../../types/Product";

interface ProductListProps {
  categoryId?: number | null;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] =
        useState<'none' | 'price-asc' | 'price-desc'>('none');

    useEffect(() => {
        setLoading(true);

        const fetch = async () => {
            try {
                const data = categoryId
                    ? await getProductsByCategoryId(categoryId)
                    : await getProducts();

                setProducts(data);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [categoryId]);

    // Reset sort khi đổi category (UX tốt hơn)
    useEffect(() => {
        setSortOrder('none');
    }, [categoryId]);

    const sortedProducts = React.useMemo(() => {
        if (sortOrder === 'none') return products;

        const cloned = [...products];

        return sortOrder === 'price-asc'
            ? cloned.sort((a, b) => a.price - b.price)
            : cloned.sort((a, b) => b.price - a.price);
    }, [products, sortOrder]);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Hiện không có sản phẩm nào
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-12 mb-20">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-fpt-blue border-l-4 border-fpt-green pl-3">
                    Sản phẩm
                </h3>

                {/* SORT DROPDOWN */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600">
                        Sắp xếp:
                    </span>

                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(
                                e.target.value as 'none' | 'price-asc' | 'price-desc'
                            )
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white
                                   focus:outline-none focus:ring-2 focus:ring-fpt-orange
                                   cursor-pointer"
                    >
                        <option value="none">Mặc định</option>
                        <option value="price-asc">Giá: Thấp → Cao</option>
                        <option value="price-desc">Giá: Cao → Thấp</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.imageUrl}
                        stockQuantity={product.stockQuantity}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
