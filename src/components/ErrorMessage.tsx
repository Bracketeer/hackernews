export function ErrorMessage({ message, buttonText, buttonAction }: { message: string, buttonText?: string, buttonAction?: () => void }) {
	return (
		<div className={'flex justify-between items-center flex-wrap bg-zinc-400/10 dark:bg-zinc-500/20 p-4 rounded-lg font-mono'}>
			<span>{message}</span>
			{buttonText && buttonAction ? <button className={'py-2 px-3 rounded-md bg-orange-500 block text-white hover:bg-orange-400 transition-colors'} onClick={buttonAction}>{buttonText}</button> : null}
		</div>
	)
}