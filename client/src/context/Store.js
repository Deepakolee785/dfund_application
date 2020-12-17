import React from 'react'
import FactoryState from './factory/FactoryState'

const StoreProvider = ({ children }) => {
	return <FactoryState>{children}</FactoryState>
}

export default StoreProvider
