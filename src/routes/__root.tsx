import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export const Route = createRootRoute({
	component: () => (
		<>
			<hr className={'w-full border-t-2 border-t-orange-500 h-2'} />
			<div className={'container mx-auto'}>
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
				<TanStackRouterDevtools />
			</div>
		</>
	),
})