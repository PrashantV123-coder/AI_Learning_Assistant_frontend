import React, { useContext, useState } from "react"

import HERO_IMG from "../assets/HeroImage.png"
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from "react-router-dom"
import { LuSparkles } from "react-icons/lu"
import Modal from "../components/Modal"
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import { UserContext } from "../context/UserContext"
import ProfileInfoCard from "../components/Cards/ProfileInfoCard"

const LandingPage = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()

	const [openAuthModel, setOpenAuthModel] = useState(false)
	const [currentPage, setCurrentPage] = useState("login")

	const handleCTA = () => {
		if (!user) {
			setOpenAuthModel(true)
		} else {
			navigate("/dashboard")
		}
	}

	return (
		<>
			<div className="relative min-h-screen w-full overflow-hidden bg-[#FFFCEF]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-amber-200/20 blur-[65px] sm:h-96 sm:w-96 lg:h-125 lg:w-125"
				/>

				<div className="container relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-5 sm:px-6 sm:pb-24 sm:pt-6 lg:px-8 lg:pb-32">
					{/* header  */}
					<header className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:mb-14 lg:mb-16">
						<div className="text-lg font-bold text-black sm:text-xl">Interview Prep AI</div>
						{user ? (
							<ProfileInfoCard />
						) : (
							<button
								className="rounded-full border border-white bg-linear-to-r from-[#FF9324] to-[#e99a4b] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black hover:text-white sm:px-7 sm:py-2.5"
								onClick={() => setOpenAuthModel(true)}
							>
								Login / Sign Up
							</button>
						)}
					</header>

					{/* hero content  */}
					<div className="flex flex-col md:flex-row items-center">
						<div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
							<div className="flex items-center justify-left mb-2">
								<div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
									<LuSparkles /> AI Powered
								</div>
							</div>

							<h1 className="text-5xl text-black font-medium mb-6 leading-tight">
								Ace Interview with <br />
								<span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[lenght:200%_200%] animate-text-shine font-semibold">
									AI-Powered
								</span>{" "}
								Learning
							</h1>
						</div>

						<div className="w-full md:w-1/2">
							<p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
								Get role-specific questions, expand answers when you need them, dive deeper into
								concepts, and organise everything your way. From preparation to mastery - your ultimate
								interview toolkit is here.
							</p>

							<button
								className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
								onClick={handleCTA}
							>
								Get Started
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full min-h-full relative z-10">
				<div>
					<section className="flex items-center justify-center -mt-36">
						<img src={HERO_IMG} alt="Hero Img" className="w-[80vw] rounded-lg" />
					</section>
				</div>

				<div className="w-full min-h-full bg-[#FFFCEF] mt-10">
					<div className="container mx-auto px-4 pt-10 pb-20">
						<section className="mt-5">
							<h2 className="text-2xl font-medium text-center mb-12">Features that make you shine</h2>

							<div className="flex flex-col items-center gap-8">
								{/* first 3 cards */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
									{APP_FEATURES.slice(0, 3).map((feature) => (
										<div
											key={feature.id}
											className="bg-[#FFFEF8] p-6 rounded-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100"
										>
											<h3 className="text-base font-semibold mb-3">{feature.title}</h3>
											<p className="text-gray-600">{feature.description}</p>
										</div>
									))}
								</div>

								{/* remaining 2 cards */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{APP_FEATURES.slice(3).map((feature) => (
										<div
											key={feature.id}
											className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transitions border border-amber-100"
										>
											<h3 className="text-base font-semibold mb-3">
												{feature.title}
												<p className="text-gray-600">{feature.description}</p>
											</h3>
										</div>
									))}
								</div>
							</div>
						</section>
					</div>
				</div>
				<div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
					Made with ❤... Happy Coding
				</div>
			</div>

			<Modal
				isOpen={openAuthModel}
				onClose={() => {
					setOpenAuthModel(false)
					setCurrentPage("login")
				}}
				hideHeader
			>
				<div>
					{currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
					{currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
				</div>
			</Modal>
		</>
	)
}

export default LandingPage
