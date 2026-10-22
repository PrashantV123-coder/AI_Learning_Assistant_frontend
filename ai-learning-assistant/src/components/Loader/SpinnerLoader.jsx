import React from "react"

const SpinnerLoader = ({ text = "Loading...", size = "md" }) => {
	const sizeClasses = {
		sm: "h-4 w-4 border-2",
		md: "h-5 w-5 border-2",
		lg: "h-8 w-8 border-[3px]",
	}

	const spinnerSize = sizeClasses[size] || sizeClasses.md

	return (
		<div role="status" aria-live="polite" className="flex min-w-0 items-center justify-center gap-2">
			<span
				aria-hidden="true"
				className={`${spinnerSize} shrink-0 animate-spin rounded-full border-gray-200 border-t-orange-500`}
			/>

			{text && <span className="wrap-break-words text-sm text-gray-600">{text}</span>}

			<span className="sr-only">{text || "Loading..."}</span>
		</div>
	)
}

export default SpinnerLoader
