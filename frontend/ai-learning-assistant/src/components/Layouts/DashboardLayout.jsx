import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import Navbar from "./Navbar"

const DashboardLayout = ({ children }) => {
	const { user } = useContext(UserContext)

	if (!user) return null

	return (
		<div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-gray-50">
			<Navbar />

			{user && <main className="w-full min-w-0 flex-1">{children}</main>}
		</div>
	)
}

export default DashboardLayout
