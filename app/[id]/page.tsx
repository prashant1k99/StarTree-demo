import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import BlogsService, { IBlog } from '@/data/blogs'
import UsersService, { IUser } from '@/data/users'

const BlogContent = ({ blog }: { blog: IBlog }) => {
	return <div dangerouslySetInnerHTML={{ __html: blog.contentHTML }} />
}

function BlogPage({ params }: { params: { id: string } }) {
	try {
		const blog: IBlog = BlogsService.getBlog(parseInt(params.id))
		const user: IUser = UsersService.getUser(blog.userId)
		return (
			<article className="max-w-5xl px-6 py-10 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
				<div className="w-full mx-auto space-y-4 text-center">
					<p className="text-xs font-semibold tracking-wider uppercase">
						#{blog.category}
					</p>
					<h1 className="text-4xl font-bold leading-tight md:text-5xl">
						{blog.title}
					</h1>
					<p className="text-sm dark:text-gray-300">
						by <span>{user.name}</span>
						on{' '}
						<time datetime={blog.createdAt}>
							{new Date(blog.createdAt).toLocaleDateString()}
						</time>
					</p>
				</div>
				<div className="dark:text-gray-100">
					<BlogContent blog={blog} />
				</div>
				<div className="pt-12 border-t dark:border-gray-700">
					<div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
						<Image
							src={user.profilePic}
							alt={user.name}
							width={75}
							height={75}
							className="self-center flex-shrink-0 w-20 h-20 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"></Image>
						<div className="flex flex-col">
							<h4 className="text-lg font-semibold">{user.name}</h4>
							<p className="dark:text-gray-400">{user.email}</p>
						</div>
					</div>
				</div>
			</article>
		)
	} catch (error) {
		return notFound()
	}
}

export default BlogPage