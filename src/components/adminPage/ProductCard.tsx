import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveImageUrl } from "../../utils/image";
import { addToCart } from "../../services/CartService";

interface ProductCardProps {
    id?: number;
    name: string;
    description: string;
    price: number;
    image: string;
    stockQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    image,
    stockQuantity
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!id) return;

        try {
            setIsAdding(true);

            await addToCart(id, 1);

            // 👉 có thể show toast ở đây
            console.log("Đã thêm vào giỏ hàng");

        } catch (error) {
            console.error("Add to cart failed", error);
            alert("Không thể thêm vào giỏ hàng");
        } finally {
            setTimeout(() => setIsAdding(false), 500);
        }
    };

    const goToDetail = () => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full relative group">
            
            {/* IMAGE */}
            <div
                className="h-48 overflow-hidden relative bg-gray-100 cursor-pointer"
                onClick={goToDetail}
            >
                <img
                    src={resolveImageUrl(image)}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h4
                    onClick={goToDetail}
                    className="font-bold text-gray-800 text-lg mb-2 cursor-pointer"
                >
                    {name}
                </h4>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-fpt-orange font-bold text-xl">
                            {price.toLocaleString('vi-VN')}đ
                        </span>

                        {stockQuantity > 0 && (
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`w-10 h-10 rounded-full bg-blue-50 text-fpt-blue hover:bg-fpt-orange hover:text-white flex items-center justify-center transition-all duration-300 ${
                                    isAdding ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                title="Thêm vào giỏ hàng"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        )}
                    </div>

                    {stockQuantity === 0 && (
                        <div className="text-red-500 font-semibold text-sm text-center py-2">
                            Out of stock
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
