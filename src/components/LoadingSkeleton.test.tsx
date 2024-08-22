import { render } from '@testing-library/react'
import LoadingSkeleton from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
	it('renders without crashing', () => {
		const { container } = render(<LoadingSkeleton rows={3} />)
		expect(container).toBeInTheDocument()
	})

	it('renders the correct number of rows', () => {
		const rows = 5
		const { container } = render(<LoadingSkeleton rows={rows} />)
		const rowElements = container.querySelectorAll('.flex.flex-col.mb-6.w-full.gap-2')
		expect(rowElements.length).toBe(rows)
	})
})