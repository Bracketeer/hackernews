import { Link } from '@tanstack/react-router'
export default function Footer() {
	return (
		<footer className={'flex flex-col justify-center items-center gap-3 mb-6'}>
			<hr className={'w-full border-t-2 border-t-orange-500 h-2 mb-3'} />
			<span className={'text-sm font-semibold'}>Hacker News</span>
			<div className={'flex gap-2 text-xs'}>
				<Link to="/">latest</Link>
				|
				<Link to="/starred">starred</Link>
			</div>
		</footer>
	)
}