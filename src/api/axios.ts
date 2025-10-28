import axios from 'axios';
import { useAuth } from "@/app/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Custom hook to setup interceptors
export const useAxiosInterceptors = () => {
	const { token, logout, login, user } = useAuth();

	api.interceptors.request.use(
		(config) => {
			if (token) config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		(error) => Promise.reject(error)
	);

	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			if (
				error.response?.status === 401 &&
				!originalRequest._retry &&
				localStorage.getItem("refreshToken")
			) {
				originalRequest._retry = true;
				try {
					const refreshResponse = await axios.post(
						"http://localhost:8080/auth/refresh",
						{
							refreshToken: localStorage.getItem("refreshToken"),
						}
					);
					const newToken = refreshResponse.data.accessToken;
					localStorage.setItem("token", newToken);
					login(user!, newToken, refreshResponse.data.refreshToken); // update context
					api.defaults.headers.common[
						"Authorization"
					] = `Bearer ${newToken}`;
					return api(originalRequest);
				} catch (refreshError) {
					logout();
				}
			}
			return Promise.reject(error);
		}
	);
};

export default api;
