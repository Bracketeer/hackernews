import { screen, fireEvent, waitFor } from '@testing-library/react'
import Article from '../components/Article'
import { saveArticle } from '../api/articles'
import { renderWithClient } from './utils'
import { QueryClient } from '@tanstack/react-query'
import { Article as HackerNewsArticle } from '../../types'

// jest.mock('../api/articles')
// jest.mock('@tanstack/react-query')

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	}
})

const article: HackerNewsArticle = {
	id: 1,
	title: 'Test Article',
	url: 'https://example.com',
	time: 1620000000,
	score: 100,
	by: 'testuser',
	descendants: 50,
	saved: false,
	type: 'story',
	text: '',
	dead: false,
	parent: 0,
	poll: 0,
	kids: [],
	parts: [],
	deleted: false
}

describe('Article Component', () => {
	beforeEach(() => {
		queryClient.clear()
	})

	it('renders article details correctly', async () => {
		renderWithClient(<Article article={article} />)
		await waitFor(() => {
			expect(screen.getByText('Test Article')).toBeInTheDocument()
			expect(screen.getByText('(example.com)')).toBeInTheDocument()
			expect(screen.getByText('100 points by testuser')).toBeInTheDocument()
			expect(screen.getByText('50 comments')).toBeInTheDocument()
			expect(screen.getByText(' save')).toBeInTheDocument()
		})
	})

	it('calls saveArticle mutation on save button click', async () => {
		(saveArticle as jest.Mock).mockResolvedValue([article.id])

		renderWithClient(<Article article={article} />)

		fireEvent.click(screen.getByText(' save'))

		await waitFor(() => {
			expect(saveArticle).toHaveBeenCalledWith(article.id)
		})
	})

	it('updates the button text to "saved" after saving', async () => {
		(saveArticle as jest.Mock).mockResolvedValue([article.id])

		renderWithClient(<Article article={article} />)

		fireEvent.click(screen.getByText(' save'))

		await waitFor(() => {
			expect(screen.getByText(' saved')).toBeInTheDocument()
		})
	})

	it('removes the article from saved list if unsaved', async () => {
		const savedArticle = { ...article, saved: true };
		(saveArticle as jest.Mock).mockResolvedValue([])

		renderWithClient(<Article article={savedArticle} />)

		fireEvent.click(screen.getByText(' saved'))

		await waitFor(() => {
			expect(screen.getByText(' save')).toBeInTheDocument()
		})
	})
})