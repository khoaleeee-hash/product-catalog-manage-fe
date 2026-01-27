import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '../types/User';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getUserFromToken = (): { email: string; role: 'user' | 'admin' } | null => {
  const userStr = localStorage.getItem('user');
  console.log('Getting user from localStorage:', userStr);
  
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    console.log('Parsed user:', user);
    
    return {
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const isAdmin = (): boolean => {
  const user = getUserFromToken();
  const result = user?.role === 'admin';
  console.log('Is admin?', result, 'User:', user);
  return result;
};