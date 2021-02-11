import React from 'react'
import FactoryState from './factory/FactoryState'
import AuthState from './auth/AuthState'
import AdminAuthState from './admin_auth/AdminAuthState'

const StoreProvider = ({ children }) => {
	return (
		<FactoryState>
			<AuthState>
				<AdminAuthState>{children}</AdminAuthState>
			</AuthState>
		</FactoryState>
	)
}

export default StoreProvider
