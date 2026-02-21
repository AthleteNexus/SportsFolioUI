import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/models/User";

interface AuthContextType {
	user: User | null;
	token: string | null;
    refreshToken: string | null;
	login: (user: User, token: string, refreshToken: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);
    const [refreshToken, setRefreshToken] = useState<string | null>(
		localStorage.getItem("refreshToken")
	);
	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	useEffect(() => {
		if (token) {
			// Restore user from localStorage if available
			const stored = localStorage.getItem("user");
			if (stored) {
				setUser(JSON.parse(stored));
			}
		} else {
			setUser(null);
		}
	}, [token]);

	const login = (user: User, token: string, refreshToken: string) => {
		setUser(user);
		setToken(token);
        setRefreshToken(refreshToken);
		localStorage.setItem("token", token);
		localStorage.setItem("refreshToken", refreshToken);
		localStorage.setItem("user", JSON.stringify(user));
	};

	const logout = () => {
		setUser(null);
		setToken(null);
        setRefreshToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, token, refreshToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
