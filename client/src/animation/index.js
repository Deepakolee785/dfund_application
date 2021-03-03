export const pageVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: { delay: 0.05 },
	},
	exit: {
		opacity: 0,
		transition: { ease: 'easeInOut' },
	},
}

export const slideVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: { delay: 0.05 },
	},
	exit: {
		// opacity: 0,
		x: '-100vw',
		transition: { ease: 'easeInOut' },
	},
}
