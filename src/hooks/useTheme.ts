import { useEffect, useState } from 'react'

export default function useTheme() {
	const [theme, _setTheme] = useState<'dark' | 'light'>('light')
	const setTheme = (theme: 'dark' | 'light') => {
		switch (theme) {
			case 'dark':
				_setTheme('dark')
				document.documentElement.classList.add('dark')
				break
			default:
				_setTheme('light')
				document.documentElement.classList.remove('dark')
				break
		}
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => setTheme(e.matches ? 'dark' : 'light')
		// Initial theme check
		handleThemeChange(mediaQuery)
		// Listen for changes
		mediaQuery.addEventListener('change', handleThemeChange)
		// Clean up the listener on unmount
		return () => { mediaQuery.removeEventListener('change', handleThemeChange) }
	}, [])

	return {
		theme,
		setTheme
	}
}