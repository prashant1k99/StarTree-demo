'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
const Posts = dynamic(() => import('@/components/BlogPostListItem'), {
	ssr: false,
})
const Pagination = dynamic(() => import('@/components/Pagination'), {
	ssr: false,
})
import { IBlog } from '@/data/blogs'
import Loading from './components/Loading'
import NoPostsFound from './components/NoPostsFound'

export default function Home() {
	const [posts, setPosts] = useState([] as IBlog[])
	const [isLoading, setLoading] = useState(true)
	const [limit, setLimit] = useState(10)
	const [skip, setSkip] = useState(0)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		fetch(`/api?limit=${limit}&skip=${skip}`, {
			cache: 'force-cache',
		})
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.data)
				setTotal(data.total)
				setLoading(false)
			})
	}, [skip, limit])

	if (isLoading) return <Loading />
	if (!posts) return <NoPostsFound />

	const previousPage = () => {
		setSkip(skip - limit)
	}
	const nextPage = () => {
		setSkip(skip + limit)
	}

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<div className="mx-auto max-w-2xl">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
					From the blog
				</h1>
				<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
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
	)
}
