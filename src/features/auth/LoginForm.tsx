import React, { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { login } from "@/api/authService";
import { useAuth } from "@/app/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login: loginUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const user = await login(username, password);
		setLoading(false);
		if (!user) {
			setError("Invalid username or password");
		} else {
			setError("");
			loginUser(user, String(user.id));
			navigate("/feed");
		}
	};

	return (
		<Card className="max-w-sm mx-auto mt-12 p-0">
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="mt-1"
					/>
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 pr-10"
						/>
						<button
							type="button"
							className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							onClick={() => setShowPassword((v) => !v)}
							tabIndex={-1}
							aria-label={
								showPassword ? "Hide password" : "Show password"
							}
						>
							{showPassword ? (
								<EyeOff size={18} />
							) : (
								<Eye size={18} />
							)}
						</button>
					</div>
				</div>
				{error && (
					<Alert variant="destructive" className="mb-2">
						{error}
					</Alert>
				)}
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? (
						<span className="flex items-center justify-center gap-2">
							<Spinner size={20} />
							Loading...
						</span>
					) : (
						"Login"
					)}
				</Button>
				<Separator className="my-4" />
				<div className="flex flex-col items-center gap-2">
					<span className="text-sm">
						New user?{" "}
						<a
							href="/signup"
							className="text-blue-600 hover:underline"
						>
							Sign up
						</a>
					</span>
					<span className="text-sm">
						<a
							href="/reset"
							className="text-blue-600 hover:underline"
						>
							Forgot password?
						</a>
					</span>
				</div>
			</form>
		</Card>
	);
};

export default LoginForm;
