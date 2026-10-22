import React, { useEffect } from "react"
import { LuX } from "react-icons/lu"

const Drawer = ({ isOpen, onClose, title, children }) => {
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

	return (
		<>
			{/* Backdrop */}
			<div
				aria-hidden="true"
				onClick={onClose}
				className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
					isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
				}`}
			/>

			{/* Drawer panel */}
			<aside
				role="dialog"
				aria-modal="true"
				aria-labelledby="drawer-right-label"
				aria-hidden={!isOpen}
				className={`fixed right-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden border-l border-gray-200 bg-white shadow-2xl shadow-cyan-900/10 transition-transform duration-300 ease-in-out sm:w-[85vw] md:w-[60vw] lg:w-[40vw] ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Header */}
				<div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6">
					<h2
						id="drawer-right-label"
						className="min-w-0 wrap-break-words text-base font-semibold text-gray-900 sm:text-lg"
					>
						{title}
					</h2>

					<button
						type="button"
						onClick={onClose}
						aria-label="Close panel"
						className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
					>
						<LuX size={20} />
					</button>
				</div>

				{/* Scrollable content */}
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
					<div className="min-w-0 wrap-break-words text-sm leading-6 text-gray-700">{children}</div>
				</div>
			</aside>
		</>
	)
}

export default Drawer
