import { motion } from 'framer-motion'
import React from 'react'
import { pageVariant } from '../../animation/index.js'
import AdminLogin from './login/index.js'
const AdminPage = () => {
	return (
		<motion.div
			variants={pageVariant}
			initial='initial'
			animate='animate'
			exit='exit'
		>
			<AdminLogin />
		</motion.div>
	)
}

export default AdminPage
