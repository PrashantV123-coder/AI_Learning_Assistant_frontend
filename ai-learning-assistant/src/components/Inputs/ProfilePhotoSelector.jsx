import React, { useEffect, useRef, useState } from "react"
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
	const inputRef = useRef(null)
	const [previewUrl, setPreviewUrl] = useState(null)

	useEffect(() => {
		return () => {
			if (previewUrl?.startsWith("blob:")) {
				URL.revokeObjectURL(previewUrl)
			}
		}
	}, [previewUrl])

	const handleImageChange = (event) => {
		const file = event.target.files?.[0]

		if (!file) return

		if (!file.type.startsWith("image/")) {
			event.target.value = ""
			return
		}

		const newPreviewUrl = URL.createObjectURL(file)

		setImage(file)
		setPreviewUrl(newPreviewUrl)

		if (setPreview) {
			setPreview(newPreviewUrl)
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
		setPreviewUrl(null)

		if (setPreview) {
			setPreview(null)
		}

		if (inputRef.current) {
			inputRef.current.value = ""
		}
	}

	const onChooseFile = () => {
		inputRef.current?.click()
	}

	const imageSource = preview || previewUrl

	return (
		<div className="mb-6 flex w-full justify-center px-2">
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="hidden"
				aria-label="Choose profile photo"
			/>

			{!image ? (
				<div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 sm:h-24 sm:w-24">
					<LuUser className="h-10 w-10 text-orange-500 sm:h-12 sm:w-12" />

					<button
						type="button"
						onClick={onChooseFile}
						aria-label="Upload profile photo"
						className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
					>
						<LuUpload size={17} />
					</button>
				</div>
			) : (
				<div className="relative h-20 w-20 sm:h-24 sm:w-24">
					{imageSource ? (
						<img
							src={imageSource}
							alt="Profile preview"
							className="h-full w-full rounded-full border-2 border-white object-cover shadow-md"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center rounded-full bg-orange-50">
							<LuUser className="h-10 w-10 text-orange-500" />
						</div>
					)}

					<button
						type="button"
						onClick={handleRemoveImage}
						aria-label="Remove profile photo"
						className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
					>
						<LuTrash size={16} />
					</button>
				</div>
			)}
		</div>
	)
}

export default ProfilePhotoSelector
