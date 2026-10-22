import React from "react"

const SkeletonLoader = () => {
	return (
		<div role="status" aria-label="Loading content" className="w-full min-w-0 animate-pulse space-y-4">
			{/* Title */}
			<div className="h-5 w-2/3 max-w-xs rounded-md bg-gray-200 sm:h-6" />

			{/* Text lines */}
			<div className="space-y-2">
				<div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
				<div className="h-3.5 w-11/12 rounded bg-gray-200 sm:h-4" />
				<div className="h-3.5 w-4/5 rounded bg-gray-200 sm:h-4" />
			</div>

			{/* Content placeholder */}
			<div className="space-y-3 rounded-xl border border-gray-100 p-3 sm:p-4">
				<div className="h-4 w-1/2 rounded bg-gray-200" />

				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div className="h-20 rounded-lg bg-gray-200 sm:h-24" />
					<div className="h-20 rounded-lg bg-gray-200 sm:h-24" />
				</div>

				<div className="h-3.5 w-full rounded bg-gray-200" />
				<div className="h-3.5 w-3/4 rounded bg-gray-200" />
			</div>

			<span className="sr-only">Loading, please wait...</span>
		</div>
	)
}

export default SkeletonLoader
