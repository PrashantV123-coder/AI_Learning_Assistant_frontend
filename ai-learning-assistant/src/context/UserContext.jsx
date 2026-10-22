import React, { createContext, useState, useEffect, useCallback } from "react"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const clearUser = useCallback(() => {
		setUser(null)
		localStorage.removeItem("token")
	}, [])

	const updateUser = useCallback((userData) => {
		setUser(userData)
		setLoading(false)
	}, [])

	useEffect(() => {
		let isMounted = true
		const accessToken = localStorage.getItem("token")

		if (!accessToken) {
			setLoading(false)
			return () => {
				isMounted = false
			}
		}

		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)

				if (isMounted) {
					setUser(response.data)
				}
			} catch (error) {
				if (isMounted) {
					console.error("Unable to authenticate user:", error)
					clearUser()
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchUser()

		return () => {
			isMounted = false
		}
	}, [clearUser])

	return <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>{children}</UserContext.Provider>
}

export default UserProvider
