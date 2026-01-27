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