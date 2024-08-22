import Article from './Article'
import { Article as HackerNewsArticle } from '../../types'

export default function Feed({ articles }: { articles: HackerNewsArticle[] }) {

	return (
		<ol className={'list-outside list-decimal'}>
			{articles?.map((article: HackerNewsArticle, index: number) => (
				<li key={`${article.id}_${index}`} className={'flex gap-3'}>
					<span className={'text-zinc-500'}>{index + 1}.</span> <Article article={article} />
				</li>
			))}
		</ol>
	)
}

