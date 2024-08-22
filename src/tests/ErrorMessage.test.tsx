import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage Component', () => {
	test('renders the error message', () => {
		const message = 'This is an error message'
		render(<ErrorMessage message={message} />)
		expect(screen.getByText(message)).toBeInTheDocument()
	})

	test('renders the button when buttonText and buttonAction are provided', () => {
		const message = 'This is an error message'
		const buttonText = 'Retry'
		const buttonAction = jest.fn()
		render(<ErrorMessage message={message} buttonText={buttonText} buttonAction={buttonAction} />)
		const button = screen.getByText(buttonText)
		expect(button).toBeInTheDocument()
		fireEvent.click(button)
		expect(buttonAction).toHaveBeenCalledTimes(1)
	})

	test('does not render the button when buttonText and buttonAction are not provided', () => {
		const message = 'This is an error message'
		render(<ErrorMessage message={message} />)
		const button = screen.queryByRole('button')
		expect(button).not.toBeInTheDocument()
	})

	test('renders correctly with dark mode styles', () => {
		const message = 'This is an error message'
		render(<ErrorMessage message={message} />)
		const container = screen.getByText(message).parentElement
		expect(container).toHaveClass('bg-zinc-400/10')
		expect(container).toHaveClass('dark:bg-zinc-500/20')
	})
})