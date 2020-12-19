import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import FactoryContext from './context/factory/factoryContext'
import Routes from './routes/'

const App = () => {
	const { accounts, contract, initilizeWeb3 } = useContext(FactoryContext)
	useEffect(() => {
		initilizeWeb3()
		// eslint-disable-next-line
	}, [])

	return (
		<Router>
			<div>
				<Routes />
				{/* Contract details */}
				<h1>Dfund Application</h1>
				<p>
					<strong>Account: </strong>
					{accounts[0]}
				</p>
				<p>
					<strong>Address: </strong>
					{contract._address}
				</p>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</Router>
	)
}

export default App
