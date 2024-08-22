import { createFileRoute } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles'
import { useInView } from 'react-intersection-observer'
import { useMemo } from 'react'
import Feed from '../components/Feed'
import { Article } from '../../types'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { ErrorMessage } from '../components/ErrorMessage'



export const Route = createFileRoute('/')({
	component: Index,
})


function Index() {

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError, error, refetch } = useInfiniteQuery({
		queryKey: ['articles'],
		queryFn: ({ pageParam }) => getArticles({ cursor: pageParam, pageSize: 20 }),
		initialPageParam: 0,
		getPreviousPageParam: (firstPage) => firstPage.previousId,
		getNextPageParam: (lastPage) => lastPage.nextId,
	})

	// reduce the pages into a single array of articles so the numbering in the feed is correct
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
		<div className={'p-2 relative'}>
			<div className={'relative'}>
				{error ? <ErrorMessage message={'Oops, there was an issue loading posts!'} buttonText={'retry'} buttonAction={refetch} /> : null}
				{!articles ? <LoadingSkeleton rows={20} /> : <Feed articles={articles} />}
				<div ref={ref} className={'cursor-none absolute bottom-[25vh] h-px w-px'} />
			</div>
			{isFetchingNextPage ? <LoadingSkeleton rows={5} /> : null}
			{isFetchNextPageError || (hasNextPage && !isFetchingNextPage) ? <ErrorMessage message={'Oops, there was an issue loading posts!'} buttonText={'retry'} buttonAction={fetchNextPage} /> : null}

		</div>
	)
}