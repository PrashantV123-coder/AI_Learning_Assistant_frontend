import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Inputs/Input"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const Login = ({ setCurrentPage }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const { updateUser } = useContext(UserContext)

	const handleLogin = async (e) => {
		e.preventDefault()

		if (!validateEmail(email)) {
			setError("Please enter a valid email address.")
			return
		}

		if (!password) {
			setError("Please enter your password.")
			return
		}

		setError("")
		setIsLoading(true)

		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
				email,
				password,
			})

			const { token } = response.data

			if (token) {
				localStorage.setItem("token", token)
				updateUser(response.data)
				navigate("/dashboard")
			} else {
				setError("Login failed. Please try again.")
			}
		} catch (err) {
			if (err.response?.data?.message) {
				const message = err.response.data.message
				setError(Array.isArray(message) ? message.join(", ") : message)
			} else {
				setError("Something went wrong. Please try again.")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="mx-auto flex w-full max-w-md flex-col justify-center p-4 sm:p-6 md:p-7">
			<div className="mb-6 sm:mb-8">
				<h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">Welcome Back</h3>

				<p className="mt-2 text-sm leading-6 text-slate-600">Please enter your details to log in.</p>
			</div>

			<form onSubmit={handleLogin} className="w-full space-y-4">
				<div className="w-full min-w-0">
					<Input
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						label="Email Address"
						placeholder="john@example.com"
						type="email"
					/>
				</div>

				<div className="w-full min-w-0">
					<Input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						label="Password"
						placeholder="Enter your password"
						type="password"
					/>
				</div>

				{error && (
					<p
						role="alert"
						aria-live="polite"
						className="wrap-break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-600"
					>
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isLoading ? "LOGGING IN..." : "LOGIN"}
				</button>

				<p className="pt-1 text-center text-sm leading-6 text-slate-700 sm:text-left">
					Don&apos;t have an account?{" "}
					<button
						type="button"
						className="ml-1 font-semibold text-primary underline underline-offset-2"
						onClick={() => setCurrentPage("signup")}
					>
						Sign Up
					</button>
				</p>
			</form>
		</div>
	)
}

export default Login
