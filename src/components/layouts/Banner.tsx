import React from 'react';

const Banner: React.FC = () => {
    return (
        <div className="container mx-auto px-4 mt-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center border-t-4 border-fpt-orange relative group">
                {/* Content */}
                <div className="p-8 md:p-12 md:w-1/2 z-10">
                    <div className="inline-block bg-fpt-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 animate-pulse">
                        🎉 KHUYẾN MÃI HOT
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-fpt-blue mb-3 leading-tight">
                        Ưu đãi dành riêng cho CBNV
                    </h2>
                    <p className="text-gray-600 mb-6 text-base leading-relaxed">
                        Freeship nội bộ các tòa nhà F-Town, F-Ville, F-Complex cho đơn hàng từ 50k.
                    </p>
                    <div className="flex items-center space-x-4">
                        <button className="bg-fpt-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-300 hover:shadow-xl hover:shadow-orange-400 flex items-center space-x-2">
                            <span>Đặt ngay</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <button className="text-fpt-blue font-semibold hover:text-fpt-orange transition flex items-center space-x-1">
                            <span>Xem chi tiết</span>
                            <i className="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>

                {/* Image with overlay */}
                <div className="md:w-1/2 h-64 md:h-80 bg-gray-200 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-fpt-blue/20 to-transparent z-10"></div>
                    <img
                        src="https://static.fireant.vn/Upload/20240126/images/-3370-1706169772.jpg"
                        alt="Banner Ưu đãi"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
