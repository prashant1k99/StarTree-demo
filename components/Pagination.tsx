interface PaginationProps {
	total?: number
	limit?: number
	skip?: number
	previousPage?: () => void
	nextPage?: () => void
}

export default function Example({
	total = 1000,
	limit = 20,
	skip = 0,
	previousPage = () => {},
	nextPage = () => {},
}: PaginationProps) {
	const hasPreviousPage = skip > 0
	const hasNextPage = skip + limit < total
	return (
		<nav
			className="flex items-center justify-between border-t border-gray-200 bg-white py-3 dark:bg-gray-800 dark:text-gray-50"
			aria-label="Pagination">
			<div className="hidden sm:block">
				<p className="text-sm text-gray-700 dark:text-gray-200">
					Showing <span className="font-medium">{skip + 1}</span> to of{' '}
					<span className="font-medium">{skip + limit}</span> of{' '}
					<span className="font-medium">{total}</span> results
				</p>
			</div>
			<div className="flex flex-1 justify-between sm:justify-end">
				<button
					disabled={!hasPreviousPage}
					className="items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50"
					onClick={previousPage}>
					Previous
				</button>
				<button
					disabled={!hasNextPage}
					className="ml-3 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50"
					onClick={nextPage}>
					Next
				</button>
			</div>
		</nav>
	)
}
