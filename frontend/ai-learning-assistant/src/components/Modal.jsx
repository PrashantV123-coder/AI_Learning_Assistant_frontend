import React, { useEffect } from "react"
import { LuX } from "react-icons/lu"

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
	useEffect(() => {
		if (!isOpen) return

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onClose?.()
			}
		}

		window.addEventListener("keydown", handleEscape)

		return () => {
			window.removeEventListener("keydown", handleEscape)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 sm:p-5"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onClose?.()
				}
			}}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={title && !hideHeader ? "modal-title" : undefined}
				className="relative flex max-h-[calc(100dvh-1.5rem)] w-full min-w-0 max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-2xl"
				onMouseDown={(event) => event.stopPropagation()}
			>
				{!hideHeader && (
					<div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 pr-14 sm:px-6">
						<h3
							id="modal-title"
							className="min-w-0 wrap-break-words text-base font-semibold text-gray-900 sm:text-lg"
						>
							{title}
						</h3>
					</div>
				)}

				<button
					type="button"
					onClick={onClose}
					aria-label="Close modal"
					className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-orange-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
				>
					<LuX size={19} />
				</button>

				<div className="custm-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
			</div>
		</div>
	)
}

export default Modal
