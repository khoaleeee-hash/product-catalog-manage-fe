import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserFromToken } from '../../utils/auth';
import { CircleUserRound, LogOut, UserPlus, LogIn, MapPin, ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount] = useState(3);
    const [user, setUser] = useState<{ email: string; role: 'user' | 'admin' } | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            console.log('User info from token:', userInfo);
            setUser(userInfo);
        } catch (error) {
            console.error('Error getting user from token:', error);
            setUser(null);
        }
    }, []);

    // Keep search keyword when on search page
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        if (q) {
            setSearchQuery(q);
        } else {
            setSearchQuery('');
        }
    }, [location.search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
        window.location.reload();
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleProfile = () => {
        if (user?.role === 'admin') {
            navigate('/admin/category');
        } else {
            navigate('/profile');
        }
    };

    const handleOrderHistory = () => {
        navigate('/orders');
    };

    const handleMyLocations = () => {
        navigate('/locations');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate đến trang search với query parameter
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(''); // Clear search input
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header className="from-orange-500 to-orange-500 bg-gradient-to-r sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95 w-full">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <div 
                    className="flex items-center cursor-pointer hover:opacity-90 transition"
                    onClick={() => navigate('/')}
                >
                    <div className="flex gap-0.5">
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-blue rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>F</span>
                        </div>
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-orange rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>P</span>
                        </div>
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-green rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>T</span>
                        </div>
                    </div>
                    <span className="text-white px-2 py-0.5 ml-2 text-2xl font-medium tracking-tight">
                        Store
                    </span>
                </div>

                {/* Search Bar - Desktop */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none outline-none focus:ring-2 focus:ring-fpt-orange transition-all text-sm shadow-sm"
                    />
                    <button
                        type="submit"
                        className="absolute left-3.5 top-3 text-gray-400 hover:text-fpt-orange transition-colors"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-fpt-orange transition-colors">
                        <i className="fa-solid fa-globe"></i>
                        <span className="text-sm font-medium">VN</span>
                    </div>
                    <div className="relative cursor-pointer hover:text-fpt-orange transition-colors group">
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-fpt-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-fpt-blue group-hover:scale-110 transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    
                    {/* User Menu with Hover */}
                    <div className="relative group">
                        <div className="cursor-pointer hover:text-fpt-orange transition-colors flex items-center gap-2">
                            <CircleUserRound size={28} />
                        </div>
                        
                        {/* Dropdown Menu - Hiện khi hover */}
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                            {user ? (
                                <div className="py-2">
                                    {/* User Info Header */}
                                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-fpt-orange/10 to-fpt-blue/10">
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            Xin chào,
                                        </p>
                                        <p className="text-base font-bold text-fpt-orange truncate">
                                            {user.email ? user.email.split('@')[0] : 'User'}
                                        </p>
                                        {user.role === 'admin' && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-fpt-orange text-white text-xs rounded-full">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Menu Items */}
                                    <button
                                        onClick={handleProfile}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <CircleUserRound size={18} className="text-fpt-orange" />
                                        <span className="font-medium">Thông tin tài khoản</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleMyLocations}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <MapPin size={18} className="text-fpt-orange" />
                                        <span className="font-medium">Địa chỉ của tôi</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleOrderHistory}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <ShoppingBag size={18} className="text-fpt-orange" />
                                        <span className="font-medium">Lịch sử đơn hàng</span>
                                    </button>
                                    
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => navigate('/admin/category')}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 border-t border-gray-200"
                                        >
                                            <i className="fa-solid fa-gauge text-fpt-orange"></i>
                                            <span className="font-medium">Trang quản trị</span>
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 border-t border-gray-200"
                                    >
                                        <LogOut size={18} />
                                        <span className="font-medium">Đăng xuất</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="py-2">
                                    {/* Welcome Header */}
                                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-fpt-orange/10 to-fpt-blue/10">
                                        <p className="text-sm text-gray-600">Chào mừng bạn đến,</p>
                                        <p className="text-base font-bold text-fpt-orange">FPT Store</p>
                                    </div>
                                    
                                    {/* Login & Register Buttons */}
                                    <button
                                        onClick={handleLogin}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <LogIn size={18} className="text-fpt-orange" />
                                        <span className="font-medium">Đăng nhập</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleRegister}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                    >
                                        <UserPlus size={18} className="text-fpt-orange" />
                                        <span className="font-medium">Đăng ký</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white text-2xl focus:outline-none hover:text-fpt-orange transition"
                >
                    <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-fpt-blue border-t border-blue-600 animate-fadeIn w-full">
                    <div className="w-full px-4 py-4 space-y-4 max-w-[1920px] mx-auto">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                placeholder="Tìm kiếm..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none outline-none focus:ring-2 focus:ring-fpt-orange text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute left-3.5 top-3 text-gray-400"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                        
                        {user && (
                            <div className="bg-white/10 rounded-lg p-3 text-white">
                                <p className="text-sm font-medium truncate">
                                    {user.email || 'User'}
                                </p>
                                <p className="text-xs text-fpt-orange capitalize">{user.role}</p>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3 text-white pt-2">
                            {user ? (
                                <>
                                    <div 
                                        onClick={handleProfile}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-fpt-orange transition bg-white/10 rounded-lg p-3"
                                    >
                                        <CircleUserRound size={24} />
                                        <span className="text-xs font-medium">Tài khoản</span>
                                    </div>
                                    <div 
                                        onClick={handleMyLocations}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-fpt-orange transition bg-white/10 rounded-lg p-3"
                                    >
                                        <MapPin size={24} />
                                        <span className="text-xs font-medium">Địa chỉ</span>
                                    </div>
                                    <div 
                                        onClick={handleOrderHistory}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-fpt-orange transition bg-white/10 rounded-lg p-3"
                                    >
                                        <ShoppingBag size={24} />
                                        <span className="text-xs font-medium">Đơn hàng</span>
                                    </div>
                                    <div 
                                        onClick={handleLogout}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-red-400 transition bg-white/10 rounded-lg p-3"
                                    >
                                        <LogOut size={24} />
                                        <span className="text-xs font-medium">Đăng xuất</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div 
                                        onClick={handleLogin}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-fpt-orange transition bg-white/10 rounded-lg p-3"
                                    >
                                        <LogIn size={24} />
                                        <span className="text-xs font-medium">Đăng nhập</span>
                                    </div>
                                    <div 
                                        onClick={handleRegister}
                                        className="flex flex-col items-center space-y-2 cursor-pointer hover:text-fpt-orange transition bg-white/10 rounded-lg p-3"
                                    >
                                        <UserPlus size={24} />
                                        <span className="text-xs font-medium">Đăng ký</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
