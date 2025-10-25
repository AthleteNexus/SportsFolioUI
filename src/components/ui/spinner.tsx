export function Spinner({
	size = 24,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<span
			className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-primary dark:border-gray-700 dark:border-t-primary ${className}`}
			style={{ width: size, height: size, borderTopColor: "#2563eb" }}
			role="status"
			aria-label="Loading"
		/>
	);
}

export default Spinner;
