import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveImageUrl } from "../../utils/image";

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    description,
    price,
    image
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 600);
    };

    const goToDetail = () => {
        navigate(`/products/${id}`);
    };

    console.log("IMAGE:", image);
    console.log("RESOLVED:", resolveImageUrl(image));

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full relative group border border-transparent hover:border-fpt-orange/20">
            
            {/* IMAGE */}
            <div
                className="h-48 overflow-hidden relative bg-gray-100 cursor-pointer"
                onClick={goToDetail}
            >
                <img
                    src={resolveImageUrl(image)}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                {/* NAME */}
                <h4
                    onClick={goToDetail}
                    className="font-bold text-gray-800 text-lg mb-2 group-hover:text-fpt-blue transition-colors cursor-pointer line-clamp-1"
                >
                    {name}
                </h4>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-fpt-orange font-bold text-xl">
                        {price.toLocaleString('vi-VN')}đ
                    </span>

                    {/* ADD TO CART */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-10 h-10 rounded-full bg-blue-50 text-fpt-blue hover:bg-fpt-orange hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 disabled:opacity-50 ${
                            isAdding ? 'animate-bounce bg-fpt-orange text-white' : ''
                        }`}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
