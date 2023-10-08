import React from 'react'
import Image from 'next/image'
import { IUser } from '@/data/users'

function Author(user: IUser) {
	return (
		<div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
			<Image
				src={user.profilePic}
				alt={user.name}
				width={75}
				height={75}
				className="self-center flex-shrink-0 w-12 h-13 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"></Image>
			<div className="self-center flex flex-col">
				<h4 className="text-lg font-semibold">{user.name}</h4>
				<p className="dark:text-gray-400">{user.email}</p>
			</div>
		</div>
	)
}

export default Author
