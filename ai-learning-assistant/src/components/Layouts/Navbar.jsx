import React from "react"
import ProfileInfoCard from "../Cards/ProfileInfoCard"
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<header className="sticky top-0 z-30 w-full border-b border-gray-200/70 bg-white/95 backdrop-blur-md">
			<div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
				<Link to="/dashboard" className="min-w-0 flex-1" aria-label="Interview Prep AI Dashboard">
					<h2 className="truncate text-base font-semibold leading-6 text-black sm:text-lg md:text-xl">
						Interview Prep AI
					</h2>
				</Link>

				<div className="flex shrink-0 items-center justify-end">
					<ProfileInfoCard />
				</div>
			</div>
		</header>
	)
}

export default Navbar
