import axios from "./axios";

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

    // Verify OTP (Email verification after signup)
    const verifyOtp = async (email: string, otp: string) => {
        const response = await axios.post(`${API_URL}/auth/verify-otp`, {
            email,
            otp,
        });
        return response.data;
    }

    // Resend OTP
    const resendOtp = async (email: string) => {
        const response = await axios.post(`${API_URL}/auth/resend-otp`, {
            email,
        });
        return response.data;
    }

    // Request Password Reset (Send OTP to email)
    const forgotPassword = async (email: string) => {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, {
            email,
        });
        return response.data;
    }

    // Reset Password with OTP
    const resetPassword = async (email: string, otp: string, newPassword: string, confirmPassword: string) => {
        const response = await axios.post(`${API_URL}/auth/reset-password`, {
            email,
            otp,
            newPassword,
            confirmPassword,
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

    return { 
        doLogin, 
        doSignup, 
        verifyOtp, 
        resendOtp, 
        forgotPassword, 
        resetPassword, 
        doLogout 
    };
};