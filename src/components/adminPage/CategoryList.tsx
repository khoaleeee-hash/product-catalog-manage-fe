import React, { useEffect, useState } from 'react';
import CategoryService from '../../services/CategoryService';
import type { GetCategoryResponse } from '../../types/Category';

interface CategoryListProps {
    onSelectCategory: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await CategoryService.getCategories();

            if (response.data.payload) {
                setCategories(response.data.payload);
            } else {
                setError('Không thể tải danh mục');
            }
        } catch (err) {
            console.error(err);
            setError('Lỗi khi tải danh mục');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 mt-10">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fpt-orange"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 mt-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-fpt-blue border-l-4 border-fpt-orange pl-3">
                    Danh mục sản phẩm
                </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Tất cả */}
                <div
                    onClick={() => onSelectCategory(0)}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group"
                >
                    <div className="w-12 h-12 mx-auto mb-3 bg-fpt-orange rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-layer-group text-xl text-white"></i>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">
                        Tất cả
                    </span>
                </div>

                {/* Danh mục */}
                {categories.map((category) => (
                    <div
                        key={category.categoryId}
                        onClick={() => onSelectCategory(category.categoryId)}
                        className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group"
                    >
                        <div className="w-12 h-12 mx-auto mb-3 bg-fpt-orange rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-layer-group text-xl text-white"></i>
                        </div>

                        {category.imageUrl && (
                            <img
                                src={category.imageUrl}
                                alt={category.categoryName}
                                className="w-full h-24 object-cover rounded-xl mb-3"
                                loading="lazy"
                            />
                        )}

                        <span className="font-semibold text-gray-700 text-sm">
                            {category.categoryName}
                        </span>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    Không có danh mục nào
                </div>
            )}
        </div>
    );
};

export default CategoryList;
