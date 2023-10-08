'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
const Posts = dynamic(() => import('@/components/BlogPostListItem'), {
	ssr: false,
})
const Pagination = dynamic(() => import('@/components/Pagination'), {
	ssr: false,
})
import { IBlog } from '@/data/blogs'

export default function Home() {
	const [posts, setPosts] = useState([] as IBlog[])
	const [isLoading, setLoading] = useState(true)
	const [limit, setLimit] = useState(10)
	const [skip, setSkip] = useState(0)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		fetch(`/blogs/api?limit=${limit}&skip=${skip}`, {
			cache: 'no-cache',
		})
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.data)
				setTotal(data.total)
				setLoading(false)
			})
	}, [skip, limit])

	if (isLoading) return <p>Loading...</p>
	if (!posts) return <p>No posts found</p>

	const previousPage = () => {
		setSkip(skip - limit)
	}
	const nextPage = () => {
		setSkip(skip + limit)
	}

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						From the blog
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						Learn how to grow your business with our expert advice.
					</p>
					<div className="my-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
						{posts.map((post) => (
							<Posts {...post} key={post.id} />
						))}
					</div>
					<div className="mt-10">
						<Pagination
							total={total}
							skip={skip}
							limit={limit}
							previousPage={() => previousPage()}
							nextPage={() => nextPage()}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
