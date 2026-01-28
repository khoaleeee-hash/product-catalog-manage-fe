import React, { useEffect, useState } from 'react';
import CategoryService from '../../services/CategoryService';
import type { GetCategoryResponse } from '../../types/Category';

const CategoryList: React.FC = () => {
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

    console.log("FULL RESPONSE:", response.data);

    if (response.data.payload) {
      setCategories(response.data.payload);
    } else {
      setError("Không thể tải danh mục");
    }
  } catch (err) {
    console.error(err);
    setError("Lỗi khi tải danh mục");
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
                {/* <a href="#" className="text-sm font-semibold text-fpt-orange hover:underline hidden md:flex items-center space-x-1">
                    <span>Xem tất cả</span>
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </a> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={category.categoryId}
                        className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group border border-transparent hover:border-fpt-orange relative overflow-hidden"
                        style={{
                            animationDelay: `${index * 50}ms`
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-fpt-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 mx-auto mb-3 bg-fpt-orange/10 group-hover:bg-fpt-orange rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <i className="fa-solid fa-layer-group text-xl text-fpt-orange group-hover:text-white transition-colors"></i>
                            </div>
                            
                            {category.imageUrl && (
                                <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.categoryName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Fallback image nếu load lỗi
                                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                        }}
                                    />
                                </div>
                            )}
                            
                            <span className="font-semibold text-gray-700 group-hover:text-fpt-orange transition-colors text-sm">
                                {category.categoryName}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && !loading && !error && (
                <div className="text-center py-10 text-gray-500">
                    Không có danh mục nào
                </div>
            )}
        </div>
    );
};

export default CategoryList;
