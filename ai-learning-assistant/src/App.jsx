import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Home/Dashboard"
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep"
import UserProvider from "./context/UserContext"

const App = () => {
	return (
		<UserProvider>
			<Router>
				<div className="min-h-screen w-full min-w-0 overflow-x-clip">
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
					</Routes>
				</div>

				<Toaster
					position="top-right"
					gutter={8}
					toastOptions={{
						className: "",
						style: {
							maxWidth: "calc(100vw - 24px)",
							fontSize: "13px",
							overflowWrap: "anywhere",
						},
					}}
				/>
			</Router>
		</UserProvider>
	)
}

export default App
