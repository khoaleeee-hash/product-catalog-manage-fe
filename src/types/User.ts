export interface User{
    email:string;
    password:string;
    role: 'customer' | 'admin' | 'CUSTOMER' | 'ADMIN'; 
}

export interface UserResponse{
    token: string;
    role: 'customer' | 'admin' | 'CUSTOMER' | 'ADMIN'; // ← Thêm role
    id: number; // ← Thêm id
    fullName: string; // ← Thêm fullName
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface DecodedToken{
    sub: string; 
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
    id: number;
    fullName: string;
    phone: string;
    address: string;
    email: string;
    role: 'customer' | 'admin' | 'CUSTOMER' | 'ADMIN';
    isActive: boolean;
}

export interface getUserProfileResponse {
    id: number;
    fullName: string;
    phone: string;
    address: string;
    email: string;
    role: 'customer' | 'admin' | 'CUSTOMER' | 'ADMIN';
    isActive: boolean;
}