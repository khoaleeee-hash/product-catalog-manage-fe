import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import ProductCard from '../../components/adminPage/ProductCard';
import { searchProducts } from '../../services/ProductService';
import type { Product } from '../../types/Product';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query.trim()) {
            searchProducts(query)
                .then((data) => {
                    setProducts(data);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [query]);

    if (loading) {
        return (
            <div className="bg-fpt-gray min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        Đang tìm kiếm...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-fpt-gray min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 container mx-auto px-4 mt-8 mb-20">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-fpt-blue mb-2">
                        Kết quả tìm kiếm
                    </h2>
                    <p className="text-gray-600">
                        Tìm kiếm cho: <span className="font-semibold text-fpt-orange">"{query}"</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Tìm thấy {products.length} sản phẩm
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fa-solid fa-magnifying-glass text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-lg">
                            Không tìm thấy sản phẩm nào phù hợp
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
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
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;