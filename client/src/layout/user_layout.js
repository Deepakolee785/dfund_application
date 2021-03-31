import { motion } from 'framer-motion'
import React from 'react'
import {
	pageVariant,
	// slideVariant
} from '../animation'
import Footer from '../components/footer'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<motion.div
				variants={pageVariant}
				initial='initial'
				animate='animate'
				exit='exit'
				style={{ minHeight: '80vh' }}
			>
				{children}
			</motion.div>
			<Footer />
		</>
	)
}

export default Layout
