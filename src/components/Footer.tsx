import React from "react";

function Footer() {
	return (
		<footer className="w-full bg-gray-900 text-white text-center py-4 mt-auto shadow-inner">
			<span className="text-sm">
				&copy; {new Date().getFullYear()} SportsFolio. All rights
				reserved.
			</span>
		</footer>
	);
}

export default Footer;
