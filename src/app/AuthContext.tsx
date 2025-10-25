import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/models/User";

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (user: User, token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);

	useEffect(() => {
		if (token) {
			// Simulate fetching user from token (mock)
			setUser({
				id: 1,
				username: "demo",
				email: "demo@example.com",
				password: "",
				name: "Demo User",
				bio: "",
				sports: [],
				friends: [],
				endorsements: [],
			});
		} else {
			setUser(null);
		}
	}, [token]);

	const login = (user: User, token: string) => {
		setUser(user);
		setToken(token);
		localStorage.setItem("token", token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
