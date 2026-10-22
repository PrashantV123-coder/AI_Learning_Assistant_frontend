import React from "react"
import { LuTrash2 } from "react-icons/lu"
import { getInitials } from "../../utils/helper"

const SummaryCard = ({
	colors,
	role,
	topicsToFocus,
	experience,
	questions,
	description,
	lastUpdated,
	onSelect,
	onDelete,
}) => {
	return (
		<article
			className="group relative min-w-0 cursor-pointer overflow-hidden rounded-xl border border-gray-200/70 bg-white p-2 shadow-sm transition-shadow duration-200 hover:shadow-lg"
			onClick={onSelect}
		>
			{/* Role header */}
			<div className="relative rounded-lg p-3 sm:p-4" style={{ background: colors?.bgcolor || "#f9fafb" }}>
				<div className="flex min-w-0 items-start gap-3 pr-9 sm:gap-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white sm:h-12 sm:w-12">
						<span className="text-base font-semibold text-gray-900 sm:text-lg">{getInitials(role)}</span>
					</div>

					<div className="min-w-0 flex-1">
						<h2 className="wrap-break-words text-base font-semibold leading-6 text-gray-900 sm:text-lg">
							{role}
						</h2>

						{topicsToFocus && (
							<p className="mt-1 wrap-break-words text-xs leading-5 text-gray-700 sm:text-sm">
								{topicsToFocus}
							</p>
						)}
					</div>
				</div>

				{/* Delete button */}
				<button
					type="button"
					aria-label="Delete session"
					title="Delete session"
					className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-500 transition-colors hover:border-rose-200 hover:bg-rose-100 sm:right-3 sm:top-3"
					onClick={(e) => {
						e.stopPropagation()
						onDelete?.()
					}}
				>
					<LuTrash2 size={16} />
				</button>
			</div>

			{/* Session details */}
			<div className="px-2 pb-3 pt-1 sm:px-3">
				<div className="mt-3 flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 sm:px-3">
						Experience: {experience} {Number(experience) === 1 ? "Year" : "Years"}
					</span>

					<span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 sm:px-3">
						{questions} Q&amp;A
					</span>

					{lastUpdated && (
						<span className="max-w-full wrap-break-words rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 sm:px-3">
							Last Updated: {lastUpdated}
						</span>
					)}
				</div>

				{description && (
					<p className="mt-3 line-clamp-2 wrap-break-words text-xs font-medium leading-5 text-gray-500 sm:text-sm">
						{description}
					</p>
				)}
			</div>
		</article>
	)
}

export default SummaryCard
