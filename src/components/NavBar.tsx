import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useAuth } from "@/app/AuthContext";
import { authService } from "@/api/authService";
import { useNavigate } from "react-router-dom";

function NavBar() {
	const [dark, setDark] = React.useState(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "dark") {
			document.documentElement.classList.add("dark");
			return true;
		} else {
			document.documentElement.classList.remove("dark");
			return false;
		}
	});
	const { user, logout } = useAuth();
	const { doLogout: apiLogout } = authService();
	const navigate = useNavigate();
	const handleLogout = async () => {
		if (user?.username) {
			try {
				await apiLogout(user.username);
			} catch (err) {
				console.error("Logout failed:", err);
			}
		}
		logout();
		navigate("/login");
	};
	const toggleTheme = () => {
		setDark((d) => {
			const newDark = !d;
			if (newDark) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			return newDark;
		});
	};
	return (
		<nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow">
			<div className="font-bold text-2xl tracking-tight">SportsFolio</div>
			{user ? (
				<>
					<ul className="flex gap-6 items-center">
						<li>
							<Link
								to="/feed"
								className="hover:text-blue-400 transition"
							>
								Feed
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className="hover:text-blue-400 transition"
							>
								Profile
							</Link>
						</li>
						<li>
							<Link
								to="/tournament"
								className="hover:text-blue-400 transition"
							>
								Tournaments
							</Link>
						</li>
						<li>
							<Link
								to="/post"
								className="hover:text-blue-400 transition"
							>
								Create Post
							</Link>
						</li>
						<li>
							<Link
								to="/friends"
								className="hover:text-blue-400 transition"
							>
								Friends
							</Link>
						</li>
					</ul>
					<div className="flex items-center gap-3">
						<button
							onClick={toggleTheme}
							className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
						>
							{dark ? (
								<Sun className="w-5 h-5" />
							) : (
								<Moon className="w-5 h-5" />
							)}
						</button>
						<button
							onClick={handleLogout}
							className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-medium"
						>
							Logout
						</button>
					</div>
				</>
			) : (
				<div className="flex items-center gap-3">
					<button
						onClick={toggleTheme}
						className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
					>
						{dark ? (
							<Sun className="w-5 h-5" />
						) : (
							<Moon className="w-5 h-5" />
						)}
					</button>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
