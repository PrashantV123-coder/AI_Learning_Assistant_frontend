import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LuLogOut, LuUserRound } from "react-icons/lu"
import { UserContext } from "../../context/UserContext"

const ProfileInfoCard = () => {
	const { user, clearUser } = useContext(UserContext)
	const navigate = useNavigate()
	const [imageError, setImageError] = useState(false)

	const handleLogout = () => {
		localStorage.clear()
		clearUser()
		navigate("/")
	}

	if (!user) return null

	return (
		<div className="flex min-w-0 max-w-full items-center gap-2 sm:gap-3">
			{/* Profile image */}
			<div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-11 sm:w-11">
				{user.profileImageUrl && !imageError ? (
					<img
						src={user.profileImageUrl}
						alt={`${user.name || "User"}'s profile`}
						className="h-full w-full rounded-full object-cover"
						onError={() => setImageError(true)}
					/>
				) : (
					<LuUserRound size={21} className="text-gray-500" />
				)}
			</div>

			{/* User details */}
			<div className="min-w-0">
				<p
					className="max-w-32 truncate text-sm font-semibold leading-5 text-gray-900 sm:max-w-44 sm:text-[15px]"
					title={user.name || ""}
				>
					{user.name || "User"}
				</p>

				<button
					type="button"
					onClick={handleLogout}
					className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 transition-colors hover:text-amber-700 hover:underline sm:text-sm"
				>
					<LuLogOut size={13} />
					Logout
				</button>
			</div>
		</div>
	)
}

export default ProfileInfoCard
