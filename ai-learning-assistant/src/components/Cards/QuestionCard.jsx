import React, { useEffect, useRef, useState } from "react"
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu"
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview.jsx"

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [height, setHeight] = useState(0)
	const contentRef = useRef(null)

	useEffect(() => {
		if (isExpanded && contentRef.current) {
			setHeight(contentRef.current.scrollHeight + 16)
		} else {
			setHeight(0)
		}
	}, [isExpanded, answer])

	const toggleExpand = () => {
		setIsExpanded((prev) => !prev)
	}

	const handleLearnMore = () => {
		setIsExpanded(true)
		onLearnMore?.()
	}

	return (
		<article className="group mb-4 overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:px-5">
			{/* Question header */}
			<div className="flex items-start gap-3">
				<span className="mt-0.5 shrink-0 text-sm font-semibold text-gray-400 sm:text-base">Q</span>

				<button
					type="button"
					onClick={toggleExpand}
					aria-expanded={isExpanded}
					className="min-w-0 flex-1 wrap-break-words text-left text-sm font-semibold leading-6 text-gray-800 sm:text-base"
				>
					{question}
				</button>

				{/* Actions */}
				<div className="flex shrink-0 items-center gap-1 sm:gap-2">
					<button
						type="button"
						onClick={onTogglePin}
						aria-label={isPinned ? "Unpin question" : "Pin question"}
						title={isPinned ? "Unpin question" : "Pin question"}
						className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
							isPinned
								? "border-indigo-200 bg-indigo-100 text-indigo-700"
								: "border-gray-200 bg-gray-50 text-gray-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
						}`}
					>
						{isPinned ? <LuPinOff size={17} /> : <LuPin size={17} />}
					</button>

					<button
						type="button"
						onClick={handleLearnMore}
						aria-label="Learn more about this question"
						title="Learn More"
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-100 bg-cyan-50 text-cyan-800 transition-colors hover:border-cyan-200 hover:bg-cyan-100 sm:w-auto sm:px-3"
					>
						<LuSparkles size={17} />
						<span className="ml-1.5 hidden text-xs font-medium sm:inline">Learn More</span>
					</button>

					<button
						type="button"
						onClick={toggleExpand}
						aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
						aria-expanded={isExpanded}
						className="flex h-9 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
					>
						<LuChevronDown
							size={20}
							className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
						/>
					</button>
				</div>
			</div>

			{/* Answer */}
			<div
				className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
				style={{ maxHeight: `${height}px` }}
				aria-hidden={!isExpanded}
			>
				<div ref={contentRef} className="mt-4 min-w-0 rounded-lg bg-gray-50 px-3 py-4 text-gray-700 sm:px-5">
					<AIResponsePreview content={answer} />
				</div>
			</div>
		</article>
	)
}

export default QuestionCard
