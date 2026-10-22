import React, { useState } from "react"
import { LuCopy, LuCheck, LuCode } from "react-icons/lu"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

const AIResponsePreview = ({ content }) => {
	if (!content) return null

	return (
		<article className="mx-auto w-full min-w-0 max-w-4xl overflow-hidden">
			<div className="prose prose-sm max-w-none wrap-break-words text-gray-800 sm:prose-base">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						code({ className, children, ...props }) {
							const match = /language-([\w-]+)/.exec(className || "")
							const language = match ? match[1] : ""
							const code = String(children).replace(/\n$/, "")

							const isInline = !className && !code.includes("\n")

							return isInline ? (
								<code
									className="wrap-break-words rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800 sm:text-sm"
									{...props}
								>
									{children}
								</code>
							) : (
								<CodeBlock code={code} language={language} />
							)
						},

						p({ children }) {
							return (
								<p className="mb-4 wrap-break-words text-sm leading-7 text-gray-700 sm:text-base">
									{children}
								</p>
							)
						},

						strong({ children }) {
							return <strong className="font-semibold text-gray-900">{children}</strong>
						},

						em({ children }) {
							return <em>{children}</em>
						},

						ul({ children }) {
							return <ul className="my-4 list-disc space-y-2 pl-5 sm:pl-6">{children}</ul>
						},

						ol({ children }) {
							return <ol className="my-4 list-decimal space-y-2 pl-5 sm:pl-6">{children}</ol>
						},

						li({ children }) {
							return (
								<li className="wrap-break-words pl-1 text-sm leading-6 sm:text-base sm:leading-7">
									{children}
								</li>
							)
						},

						blockquote({ children }) {
							return (
								<blockquote className="my-4 border-l-4 border-orange-300 pl-4 italic text-gray-600">
									{children}
								</blockquote>
							)
						},

						h1({ children }) {
							return (
								<h1 className="mb-4 mt-6 wrap-break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
									{children}
								</h1>
							)
						},

						h2({ children }) {
							return (
								<h2 className="mb-3 mt-6 wrap-break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
									{children}
								</h2>
							)
						},

						h3({ children }) {
							return (
								<h3 className="mb-2 mt-5 wrap-break-words text-lg font-bold leading-snug text-gray-900 sm:text-xl">
									{children}
								</h3>
							)
						},

						h4({ children }) {
							return (
								<h4 className="mb-2 mt-4 wrap-break-words text-base font-bold text-gray-900 sm:text-lg">
									{children}
								</h4>
							)
						},

						a({ children, href }) {
							return (
								<a
									href={href}
									target="_blank"
									rel="noreferrer"
									className="break-all text-blue-600 underline underline-offset-2 hover:text-blue-800"
								>
									{children}
								</a>
							)
						},

						table({ children }) {
							return (
								<div className="my-5 w-full max-w-full overflow-x-auto rounded-lg border border-gray-200">
									<table className="w-full min-w-105 border-collapse text-left text-xs sm:text-sm">
										{children}
									</table>
								</div>
							)
						},

						thead({ children }) {
							return <thead className="bg-gray-100">{children}</thead>
						},

						th({ children }) {
							return (
								<th className="border-b border-gray-200 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 sm:px-4">
									{children}
								</th>
							)
						},

						td({ children }) {
							return (
								<td className="border-b border-gray-100 px-3 py-3 align-top text-xs leading-5 sm:px-4 sm:text-sm">
									{children}
								</td>
							)
						},

						hr() {
							return <hr className="my-6 border-gray-200" />
						},

						img({ src, alt }) {
							return (
								<img
									src={src}
									alt={alt || ""}
									loading="lazy"
									className="my-4 h-auto max-w-full rounded-lg"
								/>
							)
						},
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</article>
	)
}

function CodeBlock({ code, language }) {
	const [copied, setCopied] = useState(false)
	const [copyError, setCopyError] = useState(false)

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setCopyError(false)

			window.setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error("Unable to copy code:", error)
			setCopyError(true)

			window.setTimeout(() => setCopyError(false), 2500)
		}
	}

	return (
		<div className="my-5 w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-gray-100 px-3 py-2 sm:px-4">
				<div className="flex min-w-0 items-center gap-2">
					<LuCode className="shrink-0 text-gray-500" size={16} />

					<span className="truncate text-xs font-semibold uppercase tracking-wide text-gray-600">
						{language || "Code"}
					</span>
				</div>

				<button
					type="button"
					onClick={copyCode}
					className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
					aria-label={copied ? "Code copied" : "Copy code"}
				>
					{copied ? <LuCheck size={15} className="text-green-600" /> : <LuCopy size={15} />}

					<span>{copyError ? "Copy failed" : copied ? "Copied!" : "Copy"}</span>
				</button>
			</div>

			<div className="w-full max-w-full overflow-x-auto">
				<SyntaxHighlighter
					language={language || "text"}
					style={oneLight}
					wrapLongLines={false}
					customStyle={{
						fontSize: "clamp(11px, 2.5vw, 13px)",
						lineHeight: 1.7,
						margin: 0,
						padding: "1rem",
						minWidth: "max-content",
						background: "transparent",
					}}
					codeTagProps={{
						style: {
							fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
						},
					}}
				>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}

export default AIResponsePreview
