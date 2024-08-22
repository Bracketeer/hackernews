const LoadingSkeleton = ({ rows }: { rows: number }) => {
	return (
		<div className={'flex flex-col w-full h-full transition-transform relative gradient-mask-b-[transparent,rgba(0,0,0,1.0)_0,rgba(0,0,0,.05)_80%]'}>
			{Array(rows).fill(0).map((_, index) => (
				<div key={index} className={'flex flex-col mb-6 w-full gap-2'}>
					<div className={'flex gap-2'}>
						<div className={'h-4 bg-zinc-500/50 animate-pulse w-4 rounded-sm'}></div>
						<div className={'h-4 bg-zinc-50/50 animate-pulse w-full rounded-sm'}></div>
					</div>
					<div className={'h-4 bg-zinc-500/50 animate-pulse w-1/2 rounded-sm ml-6'}></div>
				</div>
			))}
		</div>
	)
}

export default LoadingSkeleton