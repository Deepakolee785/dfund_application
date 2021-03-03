export const pageVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			type: 'spring',
			damping: 20,
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		x: 0,
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
export const animateSlideVariant = {
	initial: {
		y: '-100vh',
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', damping: 20, stiffness: 300 },
	},
}
