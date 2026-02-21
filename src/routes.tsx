import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Feed from "./features/feed/Feed";
import Profile from "./features/profile/Profile";
import Tournament from "./features/tournament/Tournament";
import PostForm from "./features/posts/PostForm";
import Friends from "./features/friends/Friends";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";
import PasswordResetForm from "./features/auth/PasswordResetForm";
import PrivateRoute from "./features/auth/PrivateRoute";
import { useAuth } from "@/app/AuthContext";

const AppRoutes: React.FC = () => {
	const { user } = useAuth();
	return (
		<Routes>
			<Route path="/login" element={<LoginForm />} />
			<Route path="/signup" element={<SignupForm />} />
			<Route path="/reset" element={<PasswordResetForm />} />
			<Route
				path="/feed"
				element={
					<PrivateRoute>
						<Feed />
					</PrivateRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/tournament"
				element={
					<PrivateRoute>
						<Tournament />
					</PrivateRoute>
				}
			/>
			<Route
				path="/post"
				element={
					<PrivateRoute>
						<PostForm />
					</PrivateRoute>
				}
			/>
			<Route
				path="/friends"
				element={
					<PrivateRoute>
						<Friends />
					</PrivateRoute>
				}
			/>
			<Route
				path="*"
				element={user ? <Feed /> : <Navigate to="/login" replace />}
			/>
		</Routes>
	);
};

export default AppRoutes;
