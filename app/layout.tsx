import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'StarTree Demo Next App',
	description: 'Made by Prashant Singh',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="bg-white py-24 sm:py-32 mx-auto dark:bg-gray-800 dark:text-gray-50">
					{children}
				</div>
			</body>
		</html>
	)
}
