import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import Input from "../../components/Inputs/Input"
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { validateEmail } from "../../utils/helper"

const SignUp = ({ setCurrentPage }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})

	const [image, setImage] = useState(null)
	const [preview, setPreview] = useState(null)
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const { updateUser } = useContext(UserContext)

	const handleChange = (key, value) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	const handleSignup = async (e) => {
		e.preventDefault()
		setError("")

		const name = formData.name.trim()
		const email = formData.email.trim()

		if (!name || !email || !formData.password) {
			setError("All fields are required.")
			return
		}

		if (!validateEmail(email)) {
			setError("Please enter a valid email address.")
			return
		}

		if (!image) {
			setError("Please select a profile image.")
			return
		}

		setIsLoading(true)

		try {
			const formDataReq = new FormData()
			formDataReq.append("name", name)
			formDataReq.append("email", email)
			formDataReq.append("password", formData.password)
			formDataReq.append("image", image)

			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formDataReq)

			if (response.data.token) {
				localStorage.setItem("token", response.data.token)
			}

			updateUser(response.data)
			navigate("/dashboard")
		} catch (err) {
			console.error("SIGNUP ERROR:", err.response?.data)

			const message = err.response?.data?.message
			setError(Array.isArray(message) ? message.join(", ") : message || "Signup failed. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="mx-auto flex w-full max-w-md flex-col p-4 sm:p-6 md:p-7">
			<div className="mb-5">
				<h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">Create Account</h3>

				<p className="mt-2 text-sm leading-6 text-slate-600">Enter your details to get started.</p>
			</div>

			<div className="flex w-full justify-center">
				<ProfilePhotoSelector image={image} setImage={setImage} preview={preview} setPreview={setPreview} />
			</div>

			<form onSubmit={handleSignup} className="mt-5 w-full space-y-4">
				<div className="w-full min-w-0">
					<Input
						label="Full Name"
						type="text"
						value={formData.name}
						onChange={({ target }) => handleChange("name", target.value)}
						placeholder="Enter your full name"
					/>
				</div>

				<div className="w-full min-w-0">
					<Input
						label="Email Address"
						type="email"
						value={formData.email}
						onChange={({ target }) => handleChange("email", target.value)}
						placeholder="john@example.com"
					/>
				</div>

				<div className="w-full min-w-0">
					<Input
						label="Password"
						type="password"
						value={formData.password}
						onChange={({ target }) => handleChange("password", target.value)}
						placeholder="Create a password"
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
					{isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
				</button>

				<p className="pt-1 text-center text-sm leading-6 text-slate-700">
					Already have an account?{" "}
					<button
						type="button"
						onClick={() => setCurrentPage("login")}
						className="ml-1 font-semibold text-primary underline underline-offset-2"
					>
						Login
					</button>
				</p>
			</form>
		</div>
	)
}

export default SignUp
