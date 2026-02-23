import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { authService } from "@/api/authService";
import { Eye, EyeOff } from "lucide-react";

const SignupForm: React.FC = () => {
	// Form step: "signup" | "otp"
	const [step, setStep] = useState<"signup" | "otp">("signup");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const { doSignup: signup, verifyOtp: verify, resendOtp } = authService();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!username || !email || !password) {
			setError("All fields are required.");
			setSuccess("");
			return;
		}

		// Validate password requirements
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (!passwordRegex.test(password)) {
			setError(
				"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)",
			);
			setSuccess("");
			return;
		}

		setLoading(true);
		try {
			await signup(username, password, email);
			setSuccess("Signup successful! OTP has been sent to your email.");
			setError("");
			setStep("otp");
		} catch (err: unknown) {
			console.error("Signup error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!otp) {
			setError("OTP is required.");
			setSuccess("");
			return;
		}

		setLoading(true);
		try {
			await verify(email, otp);
			setSuccess("Email verified successfully! You can now log in.");
			setError("");
			// Reset form
			setUsername("");
			setEmail("");
			setPassword("");
			setOtp("");
			setStep("signup");
		} catch (err: unknown) {
			console.error("OTP verification error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		setLoading(true);
		try {
			await resendOtp(email);
			setSuccess(
				"OTP resent to your email. Please verify within 10 minutes.",
			);
			setError("");
			setOtp("");
		} catch (err: unknown) {
			console.error("Resend OTP error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-sm mx-auto mt-12 p-0">
			<CardHeader>
				<CardTitle>
					{step === "signup" ? "Sign Up" : "Verify Email"}
				</CardTitle>
			</CardHeader>
			<form
				className="space-y-4 px-6 pb-6"
				onSubmit={step === "signup" ? handleSignup : handleVerifyOtp}
			>
				{step === "signup" ? (
					<>
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									className="mt-1 pr-10"
								/>
								<button
									type="button"
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									onClick={() => setShowPassword((v) => !v)}
									tabIndex={-1}
									aria-label={
										showPassword
											? "Hide password"
											: "Show password"
									}
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
							<p className="text-xs text-gray-500 mt-1">
								Must contain: 8+ characters, uppercase,
								lowercase, digit, special character (!@#$%^&*)
							</p>
						</div>
					</>
				) : (
					<div>
						<Label htmlFor="otp">Verification Code</Label>
						<Input
							id="otp"
							type="text"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							placeholder="Enter the OTP sent to your email"
							required
							className="mt-1"
						/>
						<p className="text-xs text-gray-500 mt-1">
							OTP sent to: {email}
						</p>
					</div>
				)}
				{error && (
					<Alert variant="destructive" className="mb-2">
						{error}
					</Alert>
				)}
				{success && <Alert className="mb-2">{success}</Alert>}
				<Button type="submit" className="w-full" disabled={loading}>
					{loading
						? "Processing..."
						: step === "signup"
							? "Sign Up"
							: "Verify OTP"}
				</Button>

				{step === "otp" && (
					<>
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={handleResendOtp}
							disabled={loading}
						>
							Resend OTP
						</Button>
						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => {
								setStep("signup");
								setOtp("");
								setError("");
								setSuccess("");
							}}
						>
							Back to Signup
						</Button>
					</>
				)}

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
