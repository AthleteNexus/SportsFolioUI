import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { resetPassword } from "@/api/authService";

const PasswordResetForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			setError("Email is required.");
			setMessage("");
			return;
		}
		const found = await resetPassword(email);
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
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1"
					/>
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
