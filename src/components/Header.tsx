import { Link } from '@tanstack/react-router'
import useTheme from '../hooks/useTheme'
import ThemeIconDark from '../components/icons/theme/ThemeIconDark'
import ThemeIconLight from '../components/icons/theme/ThemeIconLight'

export default function Header() {
	const { theme, setTheme } = useTheme()
	return (
		<header className={'py-8 flex gap-8 items-center'}>

			<div className={'flex gap-3 items-center'}>
				<img src={'assets/logo.svg'} className={'h-6 w-6'} alt="Hacker News" />
				<span className={'text-2xl font-semibold'}>Hacker News</span>
			</div>
			<nav className={'flex gap-2 text-xs'}>
				<Link to={'/'} className={'[&.active]:text-orange-500 [&.active]:font-bold'}>latest</Link>
				|
				<Link to={'/starred'} className={'[&.active]:text-orange-500 [&.active]:font-bold'}>starred</Link>
			</nav>
			<div className={'flex flex-grow items-center justify-end'}>
				<button onClick={() => {

					setTheme(theme === 'dark' ? 'light' : 'dark')
				}} className={'text-zinc-950 dark:text-zinc-50'}>
					{theme === 'dark' ? <ThemeIconLight /> : <ThemeIconDark />}
				</button>
			</div>
		</header>
	)
}