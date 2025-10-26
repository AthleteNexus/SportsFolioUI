import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { signup } from "@/api/authService";
import { Eye, EyeOff } from "lucide-react";
import usersData from "@/mock-data/data.json";

const SignupForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!username || !email || !password) {
			setError("All fields are required.");
			setSuccess("");
			return;
		}
		// Check for unique username/email using mock data
		const exists = usersData.users.some(
			(u: any) => u.username === username || u.email === email
		);
		if (exists) {
			setError("Username or email already exists.");
			setSuccess("");
			return;
		}
		const newUser = {
			username,
			email,
			password,
			name: "",
			bio: "",
			sports: [],
			friends: [],
			endorsements: [],
		};
		await signup(newUser);
		setSuccess("Signup successful! You can now log in.");
		setError("");
	};

	return (
		<Card className="max-w-sm mx-auto mt-12 p-0">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
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
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
				{success && <Alert className="mb-2">{success}</Alert>}
				<Button type="submit" className="w-full">
					Sign Up
				</Button>
				<Separator className="my-4" />
				<div className="flex flex-col items-center gap-2">
					<span className="text-sm">
						Already have an account?{" "}
						<a
							href="/login"
							className="text-blue-600 hover:underline"
						>
							Log in
						</a>
					</span>
				</div>
			</form>
		</Card>
	);
};

export default SignupForm;
