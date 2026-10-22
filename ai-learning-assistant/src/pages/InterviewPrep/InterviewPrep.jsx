import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { AnimatePresence, motion } from "framer-motion"
import { LuCircleAlert, LuListCollapse } from "react-icons/lu"
import { toast } from "react-hot-toast"

import SpinnerLoader from "../../components/Loader/SpinnerLoader"
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import RoleInfoHeader from "./components/RoleInfoHeader"
import QuestionCard from "../../components/Cards/QuestionCard"
import AIResponsePreview from "./components/AIResponsePreview"
import Drawer from "../../components/Drawer"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import SkeletonLoader from "../../components/Loader/SkeletonLoader"

const InterviewPrep = () => {
	const { sessionId } = useParams()

	const [sessionData, setSessionData] = useState(null)
	const [errorMsg, setErrorMsg] = useState("")
	const [sessionError, setSessionError] = useState("")

	const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false)
	const [explanation, setExplanation] = useState(null)

	const [isLoading, setIsLoading] = useState(false)
	const [isSessionLoading, setIsSessionLoading] = useState(true)
	const [isUpdateLoader, setIsUpdateLoader] = useState(false)

	const fetchSessionDetailsById = async () => {
		try {
			setSessionError("")

			const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))

			if (response.data?.session) {
				setSessionData(response.data.session)
			} else {
				setSessionError("Interview session could not be found.")
			}
		} catch (error) {
			console.error("Error fetching session details:", error)
			setSessionError("Unable to load this interview session.")
		} finally {
			setIsSessionLoading(false)
		}
	}

	const generateConceptExplanation = async (question) => {
		try {
			setErrorMsg("")
			setExplanation(null)
			setIsLoading(true)
			setOpenLeanMoreDrawer(true)

			const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question })

			if (response.data) {
				setExplanation(response.data)
			} else {
				setErrorMsg("No explanation was returned. Please try again.")
			}
		} catch (error) {
			console.error("Error generating explanation:", error)
			setExplanation(null)
			setErrorMsg("Failed to generate an explanation. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	const toggleQuestionPinStatus = async (questionId) => {
		try {
			const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))

			if (response.data?.question) {
				await fetchSessionDetailsById()
			}
		} catch (error) {
			console.error("Error updating question pin:", error)
			toast.error("Unable to update the question. Please try again.")
		}
	}

	const uploadMoreQuestions = async () => {
		if (!sessionData || isUpdateLoader) return

		try {
			setIsUpdateLoader(true)
			setErrorMsg("")

			const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
				role: sessionData.role,
				experience: Number(sessionData.experience),
				topicsToFocus: sessionData.topicsToFocus,
				numberOfQuestions: 10,
			})

			const generatedQuestions = aiResponse.data

			if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
				setErrorMsg("No new questions were generated. Please try again.")
				return
			}

			const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
				sessionId,
				questions: generatedQuestions,
			})

			if (response.data) {
				toast.success("More questions added successfully!")
				await fetchSessionDetailsById()
			}
		} catch (error) {
			console.error("Error adding questions:", error)

			const message = error.response?.data?.message
			setErrorMsg(
				Array.isArray(message) ? message.join(", ") : message || "Something went wrong. Please try again.",
			)
		} finally {
			setIsUpdateLoader(false)
		}
	}

	useEffect(() => {
		if (sessionId) {
			fetchSessionDetailsById()
		} else {
			setSessionError("No interview session was specified.")
			setIsSessionLoading(false)
		}
	}, [sessionId])

	return (
		<DashboardLayout>
			<main className="mx-auto w-full max-w-7xl min-w-0 pb-8">
				{sessionData && (
					<RoleInfoHeader
						role={sessionData.role || ""}
						topicsToFocus={sessionData.topicsToFocus || ""}
						experience={sessionData.experience || ""}
						questions={sessionData.questions?.length || "-"}
						description={sessionData.description || ""}
						lastUpdated={sessionData.updatedAt ? moment(sessionData.updatedAt).format("DD MMM YYYY") : ""}
					/>
				)}

				<div className="w-full min-w-0 px-4 pb-6 pt-5 sm:px-6 lg:px-8">
					<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Interview Q &amp; A</h2>
							<p className="mt-1 text-sm text-gray-600">
								Review your questions, pin important answers, or learn more about a concept.
							</p>
						</div>

						{sessionData?.questions?.length > 0 && (
							<span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 sm:text-sm">
								{sessionData.questions.length} Questions
							</span>
						)}
					</div>

					{isSessionLoading ? (
						<div className="space-y-4">
							<div className="h-28 animate-pulse rounded-xl bg-gray-100" />
							<div className="h-28 animate-pulse rounded-xl bg-gray-100" />
							<div className="h-28 animate-pulse rounded-xl bg-gray-100" />
						</div>
					) : sessionError ? (
						<div
							role="alert"
							className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 sm:p-6"
						>
							{sessionError}
						</div>
					) : (
						<div
							className={`grid min-w-0 grid-cols-1 items-start gap-5 lg:gap-6 ${
								openLeanMoreDrawer ? "lg:grid-cols-2" : "lg:grid-cols-1"
							}`}
						>
							<section className="min-w-0">
								{sessionData?.questions?.length ? (
									<AnimatePresence>
										{sessionData.questions.map((data, index) => (
											<motion.div
												key={data._id || index}
												initial={{ opacity: 0, y: 12 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, scale: 0.98 }}
												transition={{
													duration: 0.25,
													delay: Math.min(index * 0.03, 0.2),
												}}
												layout
												layoutId={`question-${data._id || index}`}
												className="mb-4 min-w-0"
											>
												<QuestionCard
													question={data.question}
													answer={data.answer}
													onLearnMore={() => generateConceptExplanation(data.question)}
													isPinned={data.isPinned}
													onTogglePin={() => toggleQuestionPinStatus(data._id)}
												/>
											</motion.div>
										))}
									</AnimatePresence>
								) : (
									<div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
										No questions are available for this session yet.
									</div>
								)}

								{sessionData?.questions?.length > 0 && (
									<div className="mt-6 flex justify-center">
										<button
											type="button"
											className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
											disabled={isLoading || isUpdateLoader}
											onClick={uploadMoreQuestions}
										>
											{isUpdateLoader ? (
												<SpinnerLoader />
											) : (
												<LuListCollapse className="text-lg" />
											)}
											{isUpdateLoader ? "Generating Questions..." : "Load More"}
										</button>
									</div>
								)}

								{errorMsg && !openLeanMoreDrawer && (
									<p
										role="alert"
										className="mt-4 wrap-break-words rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
									>
										{errorMsg}
									</p>
								)}
							</section>

							{openLeanMoreDrawer && (
								<aside className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:sticky lg:top-24">
									<div className="mb-4 flex items-start justify-between gap-3">
										<h3 className="text-base font-semibold text-gray-900 sm:text-lg">
											{explanation?.title || "Concept Explanation"}
										</h3>

										<button
											type="button"
											onClick={() => setOpenLeanMoreDrawer(false)}
											className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
										>
											Close
										</button>
									</div>

									{errorMsg && (
										<p
											role="alert"
											className="mb-4 flex items-start gap-2 wrap-break-words text-sm leading-6 text-amber-700"
										>
											<LuCircleAlert className="mt-1 shrink-0" />
											{errorMsg}
										</p>
									)}

									{isLoading && <SkeletonLoader />}

									{!isLoading && explanation && (
										<div className="min-w-0 overflow-x-auto">
											<AIResponsePreview content={explanation.explanation} />
										</div>
									)}
								</aside>
							)}
						</div>
					)}
				</div>

				<Drawer
					isOpen={openLeanMoreDrawer}
					onClose={() => setOpenLeanMoreDrawer(false)}
					title={!isLoading && explanation?.title}
				>
					{errorMsg && (
						<p className="flex items-start gap-2 wrap-break-words text-sm font-medium leading-6 text-amber-600">
							<LuCircleAlert className="mt-1 shrink-0" />
							{errorMsg}
						</p>
					)}

					{isLoading && <SkeletonLoader />}

					{!isLoading && explanation && (
						<div className="min-w-0 overflow-x-auto">
							<AIResponsePreview content={explanation.explanation} />
						</div>
					)}
				</Drawer>
			</main>
		</DashboardLayout>
	)
}

export default InterviewPrep
