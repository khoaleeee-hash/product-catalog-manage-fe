import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="from-orange-600 to-orange-700 bg-gradient-to-r text-white mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold italic tracking-tighter">
                                F<span className="text-fpt-orange">P</span>T
                                <span className="text-sm not-italic font-normal opacity-80 ml-1">
                                    Store
                                </span>
                            </span>
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Hệ thống cung cấp sản phẩm & dịch vụ nội bộ dành riêng cho CBNV FPT.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-fpt-orange flex items-center justify-center transition-all hover:scale-110">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-fpt-orange flex items-center justify-center transition-all hover:scale-110">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-fpt-orange flex items-center justify-center transition-all hover:scale-110">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Danh mục</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:text-fpt-orange transition">Sách</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Đồ điện tử</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Thời trang</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Đồ gia dụng</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Thể thao</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Hỗ trợ</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:text-fpt-orange transition">Hướng dẫn đặt hàng</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Chính sách giao hàng</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Chính sách đổi trả</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Câu hỏi thường gặp</a></li>
                            <li><a href="#" className="hover:text-fpt-orange transition">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li className="flex items-start space-x-2">
                                <i className="fa-solid fa-location-dot mt-1 text-fpt-orange"></i>
                                <span>Lô L29 - Khu công nghệ cao, TP Hồ Chí Minh</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <i className="fa-solid fa-phone text-fpt-orange"></i>
                                <span>Hotline: 1900 xxxx</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <i className="fa-solid fa-envelope text-fpt-orange"></i>
                                <span>support@fptstore.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <i className="fa-solid fa-clock text-fpt-orange"></i>
                                <span>7:00 - 18:00 (T2-T6)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm opacity-70">
                        © 2026 FPT Store System. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm opacity-70">
                        <a href="#" className="hover:text-fpt-orange transition">Điều khoản sử dụng</a>
                        <a href="#" className="hover:text-fpt-orange transition">Chính sách bảo mật</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;