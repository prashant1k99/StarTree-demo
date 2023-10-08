import React from 'react'
import { notFound } from 'next/navigation'
import BlogsService, { IBlog } from '@/data/blogs'
import UsersService, { IUser } from '@/data/users'
import formatTime from '@/app/utils/formatTime'
import Link from 'next/link'
import Author from '../components/Author'

const BlogContent = ({ blog }: { blog: IBlog }) => {
	return <div dangerouslySetInnerHTML={{ __html: blog.contentHTML }} />
}

function BlogPage({ params }: { params: { id: string } }) {
	try {
		const blog: IBlog = BlogsService.getBlog(parseInt(params.id))
		const user: IUser = UsersService.getUser(blog.userId)
		return (
			<div className="max-w-5xl px-6 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
				<div>
					<Link
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-50"
						href="/">
						&larr; Back
					</Link>
				</div>
				<article>
					<div className="w-full mx-auto space-y-4 text-center">
						<p className="text-xs font-semibold tracking-wider uppercase">
							#{blog.category}
						</p>
						<h1 className="text-4xl font-bold leading-tight md:text-5xl">
							{blog.title}
						</h1>
						<p className="text-sm dark:text-gray-300">
							by <span>{user.name}</span> on{', '}
							<time dateTime={blog.createdAt}>
								{formatTime(new Date(blog.createdAt))}
							</time>
						</p>
					</div>
					<div className="dark:text-gray-100 py-12">
						<BlogContent blog={blog} />
					</div>
					<div className="pt-12 border-t dark:border-gray-700">
						<Author {...user} />
					</div>
				</article>
			</div>
		)
	} catch (error) {
		return notFound()
	}
}

export default BlogPage
