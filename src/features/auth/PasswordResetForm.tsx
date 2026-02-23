import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { authService } from "@/api/authService";
import { Eye, EyeOff } from "lucide-react";

type Step = "email" | "otp" | "newPassword";

const PasswordResetForm: React.FC = () => {
	const [step, setStep] = useState<Step>("email");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		forgotPassword,
		verifyOtp: verify,
		resetPassword,
		resendOtp,
	} = authService();

	const handleRequestReset = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			setError("Email is required.");
			setMessage("");
			return;
		}

		setLoading(true);
		try {
			await forgotPassword(email);
			setMessage("OTP sent to your email. Please check your inbox.");
			setError("");
			setStep("otp");
		} catch (err: unknown) {
			console.error("Password reset request error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setMessage("");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!otp) {
			setError("OTP is required.");
			setMessage("");
			return;
		}

		setLoading(true);
		try {
			await verify(email, otp);
			setMessage(
				"OTP verified successfully. Please enter your new password.",
			);
			setError("");
			setStep("newPassword");
		} catch (err: unknown) {
			console.error("OTP verification error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setMessage("");
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newPassword || !confirmPassword) {
			setError("Both password fields are required.");
			setMessage("");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			setMessage("");
			return;
		}

		// Validate password requirements
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (!passwordRegex.test(newPassword)) {
			setError(
				"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)",
			);
			setMessage("");
			return;
		}

		setLoading(true);
		try {
			await resetPassword(email, otp, newPassword, confirmPassword);
			setMessage(
				"Password reset successfully! You can now login with your new password.",
			);
			setError("");
			// Reset form
			setEmail("");
			setOtp("");
			setNewPassword("");
			setConfirmPassword("");
			setStep("email");
		} catch (err: unknown) {
			console.error("Password reset error:", err);
			let message = "An unexpected error occurred.";
			const anyErr = err as any;
			message =
				anyErr.response?.data?.message ??
				anyErr.response?.data ??
				message;
			setError(message);
			setMessage("");
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		setLoading(true);
		try {
			await resendOtp(email);
			setMessage(
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
			setMessage("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-sm mx-auto mt-12 p-0">
			<CardHeader>
				<CardTitle>
					{step === "email"
						? "Reset Password"
						: step === "otp"
							? "Verify OTP"
							: "Set New Password"}
				</CardTitle>
			</CardHeader>
			<form
				className="space-y-4 px-6 pb-6"
				onSubmit={
					step === "email"
						? handleRequestReset
						: step === "otp"
							? handleVerifyOtp
							: handleResetPassword
				}
			>
				{step === "email" && (
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
				)}

				{step === "otp" && (
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

				{step === "newPassword" && (
					<>
						<div>
							<Label htmlFor="newPassword">New Password</Label>
							<div className="relative">
								<Input
									id="newPassword"
									type={showPassword ? "text" : "password"}
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
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
						</div>
						<div>
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									required
									className="mt-1 pr-10"
								/>
								<button
									type="button"
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									onClick={() =>
										setShowConfirmPassword((v) => !v)
									}
									tabIndex={-1}
									aria-label={
										showConfirmPassword
											? "Hide password"
											: "Show password"
									}
								>
									{showConfirmPassword ? (
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
				)}

				{error && (
					<Alert variant="destructive" className="mb-2">
						{error}
					</Alert>
				)}
				{message && <Alert className="mb-2">{message}</Alert>}
				<Button type="submit" className="w-full" disabled={loading}>
					{loading
						? "Processing..."
						: step === "email"
							? "Send OTP"
							: step === "otp"
								? "Verify OTP"
								: "Reset Password"}
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
								setStep("email");
								setOtp("");
								setError("");
								setMessage("");
							}}
						>
							Back to Email
						</Button>
					</>
				)}

				{step === "newPassword" && (
					<Button
						type="button"
						variant="ghost"
						className="w-full"
						onClick={() => {
							setStep("otp");
							setNewPassword("");
							setConfirmPassword("");
							setError("");
							setMessage("");
						}}
					>
						Back to OTP Verification
					</Button>
				)}

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
