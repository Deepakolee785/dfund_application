import React from 'react'
import AdminAuthSate from '../../context/admin_auth/AdminAuthState'
import AdminLogin from './login/index.js'
const AdminPage = () => {
	return (
		<AdminAuthSate>
			<AdminLogin />
		</AdminAuthSate>
	)
}

export default AdminPage
