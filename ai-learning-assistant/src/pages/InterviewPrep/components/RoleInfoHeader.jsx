import React from "react"

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
	return (
		<div className="relative mb-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
			<div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
				<div className="flex flex-col gap-4">
					{/* Role and topics */}
					<div className="min-w-0">
						<h2 className="wrap-break-words text-xl font-semibold leading-tight text-gray-900 sm:text-2xl lg:text-3xl">
							{role}
						</h2>

						{topicsToFocus && (
							<p className="mt-2 wrap-break-words text-sm leading-6 text-gray-600 sm:text-base">
								{topicsToFocus}
							</p>
						)}
					</div>

					{/* Session information */}
					<div className="flex flex-wrap items-center gap-2 sm:gap-3">
						<span className="inline-flex max-w-full items-center rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
							Experience: {experience} {Number(experience) === 1 ? "Year" : "Years"}
						</span>

						<span className="inline-flex max-w-full items-center rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
							{questions} Q&amp;A
						</span>

						{lastUpdated && (
							<span className="inline-flex max-w-full items-center rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
								Last Updated: {lastUpdated}
							</span>
						)}
					</div>

					{description && (
						<p className="max-w-3xl wrap-break-words text-sm leading-6 text-gray-600">{description}</p>
					)}
				</div>
			</div>

			{/* Background decorative effects */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-8 -top-8 flex h-36 w-36 items-center justify-center sm:-right-4 sm:-top-4 sm:h-48 sm:w-48"
			>
				<div className="absolute h-16 w-16 animate-blob1 rounded-full bg-lime-400 blur-[45px] sm:blur-[65px]" />
				<div className="absolute h-16 w-16 animate-blob2 rounded-full bg-teal-400 blur-[45px] sm:blur-[65px]" />
				<div className="absolute h-16 w-16 animate-blob3 rounded-full bg-cyan-300 blur-[35px] sm:blur-[45px]" />
				<div className="absolute h-16 w-16 animate-blob1 rounded-full bg-fuchsia-200 blur-[35px] sm:blur-[45px]" />
			</div>
		</div>
	)
}

export default RoleInfoHeader
