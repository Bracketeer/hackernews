import { useInfiniteQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { getSavedArticles } from '../api/articles'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Feed from '../components/Feed'
import { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { Article } from '../../types'
import { ErrorMessage } from '../components/ErrorMessage'

export const Route = createLazyFileRoute('/starred')({
	component: Starred,
})

function Starred() {
	const { data, fetchNextPage, isFetchingNextPage, hasNextPage, error, isFetchNextPageError, refetch } = useInfiniteQuery({
		queryKey: ['savedArticles'],
		queryFn: ({ pageParam }) => getSavedArticles({ cursor: pageParam, pageSize: 20 }),
		initialPageParam: 0,
		getPreviousPageParam: (firstPage) => firstPage.previousId,
		getNextPageParam: (lastPage) => lastPage.nextId,
	})
	const articles = useMemo(() => {
		if (!data) return null
		return data.pages.reduce((accumulator: Article[], currentValue) => {
			return [...accumulator, ...currentValue.data]
		}, [])
	}, [data])


	// Determine when to fetch the next page for infinite scrolling
	const { ref } = useInView({
		onChange(_, entry: IntersectionObserverEntry) {
			if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) fetchNextPage()
		},
	})

	return (
		<div className={'p-2'}>
			<div className={'relative'}>
				{error ? <ErrorMessage message={'Oops, there was an issue loading posts!'} buttonText={'retry'} buttonAction={refetch} /> : null}
				{!articles ? <LoadingSkeleton rows={20} /> : <Feed articles={articles} />}
				<div ref={ref} className={'cursor-none absolute bottom-[25vh] h-px w-px'} />
			</div>
			{isFetchingNextPage ? <LoadingSkeleton rows={5} /> : null}
			{isFetchNextPageError || (hasNextPage && !isFetchingNextPage) ? <ErrorMessage message={'Oops, there was an issue loading posts!'} buttonText={'retry'} buttonAction={fetchNextPage} /> : null}
		</div>)
}