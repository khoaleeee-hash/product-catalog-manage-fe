import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FPTLogo from '../assets/fpt_logo.png';
import UserService from '../services/UserService';
import type { RegisterRequest } from '../types/User';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterRequest>({
        fullName: '',
        phone: '',
        address: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        try {
            setLoading(true);
            const response = await UserService.register(formData);

            if (response.data.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                navigate('/login');
            } else {
                setError(response.data.message || 'Đăng ký thất bại');
            }
        } catch (err: any) {
            console.error('Register error:', err);
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center min-h-screen font-sans py-6 px-4">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-2xl border-t-4 border-fpt-orange">
                <div className="text-center mb-4">
                    <div className='flex justify-center mb-3'>
                        <img src={FPTLogo} alt="FPT Logo" className="w-24" />
                    </div>
                    <h1 className="flex justify-center text-[#F27125] text-3xl font-bold mb-2 text-center">
                        FPT Store
                    </h1>
                    <p className="text-gray-600 text-sm">Đăng ký tài khoản mới</p>
                </div>

                {error && (
                    <div className="mb-3 p-2.5 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        <i className="fa-solid fa-circle-exclamation mr-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Row 1: Full Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fa-solid fa-user text-sm"></i>
                                </span>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="* Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fa-solid fa-envelope text-sm"></i>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="* Địa chỉ email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Phone and Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Số điện thoại
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fa-solid fa-phone text-sm"></i>
                                </span>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="* Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Địa chỉ
                            </label>
                            <div className="relative">
                                <span className="absolute top-2.5 left-0 pl-3 flex items-start text-gray-400">
                                    <i className="fa-solid fa-location-dot text-sm"></i>
                                </span>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="* Nhập địa chỉ"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Password and Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fa-solid fa-lock text-sm"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="* Mật khẩu (6+ ký tự)"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-fpt-orange transition-colors"
                                >
                                    <i className={`fa-solid text-sm ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fa-solid fa-lock text-sm"></i>
                                </span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="* Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-fpt-orange transition-colors"
                                >
                                    <i className={`fa-solid text-sm ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-fpt-orange hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg shadow-md transform active:scale-[0.98] transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center text-sm">
                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                Đang xử lý...
                            </span>
                        ) : (
                            'Đăng Ký'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500">
                        Đã có tài khoản?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-fpt-orange font-bold hover:underline"
                        >
                            Đăng nhập ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
