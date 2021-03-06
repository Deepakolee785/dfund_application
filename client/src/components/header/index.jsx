import React from 'react'
import { HeaderContainer } from './style'
import { motion } from 'framer-motion'
const animateVariant = {
	initial: {
		y: -150,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', damping: 20, stiffness: 300 },
	},
}
const Header = ({ heading, subHeading, children }) => {
	return (
		<HeaderContainer>
			<motion.h1
				variants={animateVariant}
				initial='initial'
				animate='animate'
			>
				{heading}{' '}
			</motion.h1>
			<motion.p
				variants={animateVariant}
				initial='initial'
				animate='animate'
			>
				{subHeading}
			</motion.p>
			<motion.div
				variants={animateVariant}
				initial='initial'
				animate='animate'
			>
				{children}
			</motion.div>
		</HeaderContainer>
	)
}

export default Header
