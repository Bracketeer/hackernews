import { render, screen, waitFor } from '@testing-library/react'
import Feed from '../components/Feed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Article as HackerNewsArticle } from '../../types'

jest.mock('@tanstack/react-query')

const queryClient = new QueryClient({

	defaultOptions: {

		queries: {
			retry: false,
		},
		mutations: {
			retry: false
		}
	},
})

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
const mockArticles: HackerNewsArticle[] = [
	{
		id: 1,
		title: 'Article 1',
		url: 'https://example.com/1',
		by: 'Author 1',
		time: 1616161616,
		deleted: false,
		type: 'story',
		text: 'Hello World 1',
		dead: false,
		parent: 0,
		poll: 0,
		kids: [],
		score: 0,
		parts: [],
		descendants: 0,
		saved: false
	},
	{
		id: 2,
		title: 'Article 2',
		url: 'https://example.com/2',
		by: 'Author 2',
		time: 1616161617,
		deleted: false,
		type: 'story',
		text: 'Hello World 1',
		dead: false,
		parent: 0,
		poll: 0,
		kids: [],
		score: 0,
		parts: [],
		descendants: 0,
		saved: false,
	},
]

describe('Feed Component', () => {
	test('renders without crashing', () => {
		render(<Feed articles={[]} />, {
			// wrapper: Provider
		})
		expect(screen.getByRole('list')).toBeInTheDocument()
	})

	test('renders a list of articles', async () => {
		render(<Feed articles={mockArticles} />, {
			wrapper: Provider
		}
		)
		screen.debug()
		await waitFor(() => {
			const items = screen.findAllByRole('listitem')
			expect(items).toHaveLength(mockArticles.length)
		})
	})
})