import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({ value, onChange, label, placeholder, type = "text", name, disabled = false, autoComplete }) => {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = type === "password"
	const inputType = isPassword && showPassword ? "text" : type

	const handleChange = (event) => {
		onChange?.(event)
	}

	return (
		<div className="w-full min-w-0 space-y-1.5">
			{label && (
				<label
					htmlFor={name || undefined}
					className="block wrap-break-words text-xs font-medium text-slate-800 sm:text-[13px]"
				>
					{label}
				</label>
			)}

			<div className="input-box flex min-h-11 w-full min-w-0 items-center gap-2 rounded-lg px-3 sm:min-h-12 sm:px-4">
				<input
					id={name || undefined}
					name={name}
					type={inputType}
					placeholder={placeholder}
					autoComplete={autoComplete}
					disabled={disabled}
					value={value ?? ""}
					onChange={handleChange}
					className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
				/>

				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword((previous) => !previous)}
						aria-label={showPassword ? "Hide password" : "Show password"}
						aria-pressed={showPassword}
						className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						{showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
					</button>
				)}
			</div>
		</div>
	)
}

export default Input
