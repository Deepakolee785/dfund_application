import React from 'react'
import FactoryState from './factory/FactoryState'
import AuthState from './auth/AuthState'

const StoreProvider = ({ children }) => {
	return (
		<FactoryState>
			<AuthState>{children}</AuthState>
		</FactoryState>
	)
}

export default StoreProvider
