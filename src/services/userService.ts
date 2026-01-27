import { type UserResponse } from "../types/User";
import axios from "axios";

const USER_URL = "http://localhost:8080/api/user";

const userService = {
    async login(
        email: string,
        password: string
    ): Promise<UserResponse> {
        try {
            console.log('Calling API:', `${USER_URL}/login`);
            console.log('Request data:', { email, password });
            
            const response = await axios.post<UserResponse>(
                `${USER_URL}/login`, 
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            
            console.log('Response success:', response);
            console.log('Response data:', response.data);
            
            return response.data;
            
        } catch (error: any) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response);
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
            
            let errorMessage = 'Đăng nhập thất bại';
            
            if (error.response?.data) {
                const data = error.response.data;
                if (data.error?.details) {
                    errorMessage = data.error.details;
                } else if (data.message) {
                    errorMessage = data.message;
                } else if (typeof data === 'string') {
                    errorMessage = data;
                }
            }
            
            throw new Error(errorMessage);
        }
    }
};

export default userService;