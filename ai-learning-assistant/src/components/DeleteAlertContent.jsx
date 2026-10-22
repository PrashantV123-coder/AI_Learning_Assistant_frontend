import React from "react"
import { LuTriangleAlert, LuTrash2 } from "react-icons/lu"

const DeleteAlertContent = ({ content, onDelete }) => {
	return (
		<div className="w-full min-w-0 p-4 sm:p-6">
			<div className="flex items-start gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 sm:h-11 sm:w-11">
					<LuTriangleAlert size={21} />
				</div>

				<div className="min-w-0 flex-1 pt-1">
					<h3 className="text-sm font-semibold text-gray-900 sm:text-base">Confirm deletion</h3>

					<p className="mt-2 wrap-break-words text-sm leading-6 text-gray-600">{content}</p>
				</div>
			</div>

			<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<button
					type="button"
					onClick={onDelete}
					className="btn-small inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:w-auto"
				>
					<LuTrash2 size={16} />
					Delete
				</button>
			</div>
		</div>
	)
}

export default DeleteAlertContent
