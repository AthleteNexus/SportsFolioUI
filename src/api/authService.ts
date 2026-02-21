import axios from "./axios";
import usersData from '@/mock-data/data.json';
import type { User } from '../models/User';

const API_URL = "http://localhost:8080";

export const authService = () => {
    // Login
    const doLogin = async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password,
        });
        return response.data;
    }

    // Signup
    const doSignup = async (username: string, password: string, emailId: string) => {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            username,
            password,
            emailId,
        });
        return response.data;
    }

    // Logout
    const doLogout = async (username: string) => {
        await axios.get(`${API_URL}/auth/logout`, {
            params: { username },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
        });
    }

    const doResetPassword = async (email: string): Promise<boolean> => {
        // Simulate OTP generation and verification using local mock data
        const users: User[] = usersData.users;
        const user = users.find(u => u.email === email);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return !!user;
    }
    return { doResetPassword, doLogin, doSignup, doLogout };
};