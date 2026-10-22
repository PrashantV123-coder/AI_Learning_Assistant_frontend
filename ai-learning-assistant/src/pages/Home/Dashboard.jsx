import React, { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { CARD_BG } from "../../utils/data"
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import SummaryCard from "../../components/Cards/SummaryCard"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import moment from "moment"
import CreateSessionForm from "./CreateSessionForm"
import Modal from "../../components/Modal"
import DeleteAlertContent from "../../components/DeleteAlertContent"

const Dashboard = () => {
	const navigate = useNavigate()

	const [openCreateModal, setOpenCreateModal] = useState(false)
	const [sessions, setSessions] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const [openDeleteAlert, setOpenDeleteAlert] = useState({
		open: false,
		data: null,
	})

	const fetchAllSessions = async () => {
		setIsLoading(true)

		try {
			const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
			const sessionData = response.data

			setSessions(Array.isArray(sessionData) ? sessionData : [])
		} catch (error) {
			console.error("Error fetching session data:", error)
			toast.error("Unable to load interview sessions.")
		} finally {
			setIsLoading(false)
		}
	}

	const deleteSession = async (sessionData) => {
		if (!sessionData?._id) {
			toast.error("Unable to identify this session.")
			return
		}

		try {
			await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id))

			toast.success("Session deleted successfully.")

			setOpenDeleteAlert({
				open: false,
				data: null,
			})

			await fetchAllSessions()
		} catch (error) {
			console.error("Error deleting session data:", error)
			toast.error("Unable to delete this session. Please try again.")
		}
	}

	useEffect(() => {
		fetchAllSessions()
	}, [])

	return (
		<DashboardLayout>
			<main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 sm:pt-6 lg:px-8">
				{/* Page heading */}
				<section className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
					<div className="min-w-0">
						<h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
							Interview Dashboard
						</h1>

						<p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
							Manage your interview preparation sessions and continue practicing.
						</p>
					</div>

					<button
						type="button"
						onClick={() => setOpenCreateModal(true)}
						className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#FF9324] to-[#e99a4b] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:shadow-orange-200 sm:w-auto"
					>
						<LuPlus className="text-xl" />
						Create Session
					</button>
				</section>

				{/* Session list */}
				<section aria-label="Interview sessions">
					{isLoading ? (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
							{[1, 2, 3].map((item) => (
								<div
									key={item}
									className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
								>
									<div className="mb-4 h-5 w-2/3 rounded bg-gray-200" />
									<div className="mb-3 h-4 w-1/2 rounded bg-gray-100" />
									<div className="mb-6 h-4 w-full rounded bg-gray-100" />
									<div className="h-10 w-full rounded-lg bg-gray-100" />
								</div>
							))}
						</div>
					) : sessions.length > 0 ? (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
							{sessions.map((data, index) => (
								<SummaryCard
									key={data?._id || index}
									colors={CARD_BG[index % CARD_BG.length]}
									role={data?.role || ""}
									topicsToFocus={data?.topicsToFocus || ""}
									experience={data?.experience || "-"}
									questions={data?.questions?.length ?? "-"}
									description={data?.description || "-"}
									lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
									onSelect={() => navigate(`/interview-prep/${data?._id}`)}
									onDelete={() =>
										setOpenDeleteAlert({
											open: true,
											data,
										})
									}
								/>
							))}
						</div>
					) : (
						<div className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-dashed border-amber-200 bg-white/70 px-5 py-10 text-center sm:px-8">
							<div className="mb-4 text-5xl sm:text-6xl" aria-hidden="true">
								≡ƒôé
							</div>

							<h2 className="text-xl font-bold text-gray-800 sm:text-2xl">No Interview Sessions Yet</h2>

							<p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
								Create your first interview preparation session to generate questions and start
								practicing.
							</p>

							<button
								type="button"
								onClick={() => setOpenCreateModal(true)}
								className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
							>
								<LuPlus className="text-lg" />
								Create First Session
							</button>
						</div>
					)}
				</section>
			</main>

			{/* Create session modal */}
			<Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
				<div className="w-full max-w-full">
					<CreateSessionForm />
				</div>
			</Modal>

			{/* Delete confirmation modal */}
			<Modal
				isOpen={openDeleteAlert.open}
				onClose={() =>
					setOpenDeleteAlert({
						open: false,
						data: null,
					})
				}
				title="Delete Alert"
			>
				<div className="w-full max-w-md p-2 sm:p-4">
					<DeleteAlertContent
						content="Are you sure you want to delete this session?"
						onDelete={() => deleteSession(openDeleteAlert.data)}
					/>
				</div>
			</Modal>
		</DashboardLayout>
	)
}

export default Dashboard
