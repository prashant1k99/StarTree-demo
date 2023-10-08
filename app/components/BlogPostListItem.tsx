import Link from 'next/link'

import { IBlog } from '@/data/blogs'

export default function ClientPosts(post: IBlog) {
	return (
		<article
			key={post.id}
			className="flex max-w-xl flex-col items-start justify-between">
			<div className="flex items-center gap-x-4 text-xs">
				<time dateTime={post.createdAt} className="text-gray-500">
					{new Date(post.createdAt).toLocaleDateString()}
				</time>
				<div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
					{post.category}
				</div>
			</div>
			<div className="group relative">
				<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
					<Link
						href={{
							pathname: `/blogs/${post.id}`,
						}}>
						<span className="absolute inset-0" />
						{post.title}
					</Link>
				</h3>
				<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
					{post.description}
				</p>
			</div>
		</article>
	)
}
