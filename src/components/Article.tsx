import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveArticle } from '../api/articles'
import { formatDistance } from 'date-fns'
import { useMemo } from 'react'
import { Article as HackerNewsArticle } from '../../types'

export default function Article({ article }: { article: HackerNewsArticle }) {

	const queryClient = useQueryClient()
	const { mutateAsync } = useMutation({
		mutationFn: saveArticle,
		onSuccess: (data, variable) => {
			queryClient.invalidateQueries({ queryKey: ['savedArticles'] })

			// update articles to reflect the saved status
			queryClient.setQueryData(['articles'], (articles: { pageParams: number, pages: { data: HackerNewsArticle[], nextId: number, previousId: number }[] }) => {
				if (!articles) return articles
				return {
					...articles,
					pages: articles.pages.map(page => ({
						...page,
						data: page.data.map((article) => {
							if (article.id === variable) return { ...article, saved: data.includes(variable) }
							return article
						})

					}))
				}
			})

			// update the saved articles
			if (!data.includes(variable)) {
				// if the article is no longer saved, remove it from the list
				queryClient.setQueryData(['savedArticles'], (articles: { pageParams: number[], pages: { data: HackerNewsArticle[], nextId: number, previousId: number }[] }) => {
					if (!articles) return articles
					return {
						...articles,
						pages: articles.pages.map(page => ({
							...page,
							data: page.data.filter(article => article.id !== variable)
						}))
					}
				})
			} else {
				// if the article isn't in the list, then we need to update the client to display it
				queryClient.setQueryData(['savedArticles'], (articles: { pageParams: number[], pages: { data: HackerNewsArticle[], nextId: number, previousId: number }[] }) => {
					if (!articles) return articles
					articles.pages[0].data.unshift({ ...article, saved: true })
					return {
						...articles,
						pages: articles.pages
					}
				})
			}
		}
	})

	const url = useMemo(() => article?.url ? `(${new URL(article?.url).hostname})` : null, [article?.url])
	const date = useMemo(() => article?.time ? formatDistance(new Date(article.time * 1000), new Date(), { addSuffix: true }) : null, [article?.time])
	return (

		<article className={'mb-6'}>
			<div>
				<a href={article?.url} target={'_blank'} referrerPolicy={'no-referrer'} className={'block visited:text-zinc-500 font-mono'}>{article?.title} <span className={'text-xs align-middle text-zinc-500'}>{url}</span></a>

			</div>
			<div className={'text-xs text-zinc-500 mt-1'}>
				{article?.score} point{article?.score !== 1 ? 's' : ''} by {article?.by} {date} | {article?.descendants} comment{article?.descendants !== 1 ? 's' : ''} | <button onClick={() => mutateAsync(article.id)}>{article?.saved ? <><span className={'text-orange-500'}>★</span> saved</> : <>☆ save</>}</button>
			</div>
		</article>
	)
}

