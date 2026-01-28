import type { is } from "date-fns/locale";

export interface User{
    email:string;
    password:string;
    role: 'user' | 'admin' | 'USER' | 'ADMIN'; 
}

export interface UserResponse{
    token: string;
    role: 'user' | 'admin' | 'USER' | 'ADMIN'; // ← Thêm role
    id: number; // ← Thêm id
    fullName: string; // ← Thêm fullName
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface DecodedToken{
    sub: string; // ← Email nằm trong "sub"
    iat: number;
    exp: number;
}

export interface RegisterRequest{
    fullName:string;
    phone:string;
    address:string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    userId: number;
    fullName: string;
    phone: string;
    address: string;
    email: string;
    role: 'user' | 'admin' | 'USER' | 'ADMIN';
    isActive: boolean;
}