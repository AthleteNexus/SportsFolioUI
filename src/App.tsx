import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./features/feed/Feed";
import Profile from "./features/profile/Profile";
import Tournament from "./features/tournament/Tournament";
import PostForm from "./features/posts/PostForm";
import Friends from "./features/friends/Friends";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";
import PasswordResetForm from "./features/auth/PasswordResetForm";
import { useAuth } from "@/app/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function PrivateRoute({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const location = useLocation();
	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return <>{children}</>;
}

function App() {
	const { user } = useAuth();
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<main className="flex-1">
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
						element={
							user ? <Feed /> : <Navigate to="/login" replace />
						}
					/>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
