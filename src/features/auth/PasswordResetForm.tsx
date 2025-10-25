import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { resetPassword } from "@/api/authService";
import { Eye, EyeOff } from "lucide-react";

const PasswordResetForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [showEmail, setShowEmail] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	// Use mock data for reset
	const usersData = require("@/mock-data/data.json");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			setError("Email is required.");
			setMessage("");
			return;
		}
		// Check for email using mock data
		const found = usersData.users.some((u: any) => u.email === email);
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (found) {
			setMessage(
				"OTP sent to your email (simulated). Please check your inbox."
			);
			setError("");
		} else {
			setError("Email not found.");
			setMessage("");
		}
	};

	return (
		<Card className="max-w-sm mx-auto mt-12 p-0">
			<CardHeader>
				<CardTitle>Reset Password</CardTitle>
			</CardHeader>
			<form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="email">Email</Label>
					<div className="relative">
						<Input
							id="email"
							type={showEmail ? "text" : "email"}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 pr-10"
						/>
						<button
							type="button"
							className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							onClick={() => setShowEmail((v) => !v)}
							tabIndex={-1}
							aria-label={showEmail ? "Hide email" : "Show email"}
						>
							{showEmail ? (
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
				{message && <Alert className="mb-2">{message}</Alert>}
				<Button type="submit" className="w-full">
					Send OTP
				</Button>
				<Separator className="my-4" />
				<div className="flex flex-col items-center gap-2">
					<span className="text-sm">
						<a
							href="/login"
							className="text-blue-600 hover:underline"
						>
							Back to Login
						</a>
					</span>
				</div>
			</form>
		</Card>
	);
};

export default PasswordResetForm;
