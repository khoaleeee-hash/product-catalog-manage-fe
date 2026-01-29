import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast} from 'react-toastify';
import FPTLogo from '../assets/fpt_logo.png';
import userService from '../services/userService';
import { type DecodedToken, type UserResponse } from '../types/User';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response: UserResponse = await userService.login(email, password);
      
      console.log('Login response:', response);
      console.log('token:', response.token);
      console.log('Role from response:', response.role);
      console.log('Full name:', response.fullName);
      console.log('User ID:', response.id);
      
      // Decode token để lấy email
      const decodedToken = jwtDecode<DecodedToken>(response.token);
      console.log('Decoded token:', decodedToken);
      console.log('Email from token:', decodedToken.sub);
      
      // Normalize role to lowercase
      const normalizedRole = response.role.toLowerCase() as 'user' | 'admin';
      
      console.log('Normalized role:', normalizedRole);
      
      // Lưu token và user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        email: decodedToken.sub,
        role: normalizedRole,
        fullName: response.fullName,
        id: response.id
      }));
      
      console.log('Saved to localStorage');
      
      // Navigate dựa vào role
      if (normalizedRole === 'admin') {
        console.log('Navigating to ADMIN dashboard');
        navigate('/admin/category');
      } else {
        console.log('Navigating to HOME page');
        navigate('/');
      }
      
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border-t-4 border-fpt-orange">
        <div className="text-center mb-8">
            <div className='flex justify-center mb-6'>
                <img src={FPTLogo} alt="FPT Logo" className="w-32 " />
            </div>
          <h1 className="flex justify-center text-[#F27125] text-5xl font-bold mb-10 text-center lg:text-left">
            FPT Store
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tài khoản (Email)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="email"
                placeholder="* Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Mật khẩu
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="* Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fpt-orange focus:ring-2 focus:ring-fpt-orange/20 transition-all"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-fpt-orange transition-colors"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-fpt-orange border-gray-300 rounded focus:ring-fpt-orange accent-fpt-orange"
              />
              <span className="ml-2">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-sm font-medium text-blue-700 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fpt-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transform active:scale-[0.98] transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Đang xử lý...
              </span>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Gặp sự cố đăng nhập? <br />
            Liên hệ{' '}
            <a href="#" className="text-fpt-orange font-bold hover:underline">
              IT Helpdesk
            </a>{' '}
            để được hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;