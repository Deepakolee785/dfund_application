import React, { useContext, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import FactoryContext from './context/factory/factoryContext'
import AuthContext from './context/auth/authContext'
import Routes from './routes/'
import history from './utils/history'

import Navbar from './components/Navbar'

import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}
const App = () => {
	const { initilizeWeb3 } = useContext(FactoryContext)
	const { loadUser } = useContext(AuthContext)
	useEffect(() => {
		initilizeWeb3()
		loadUser()
		// eslint-disable-next-line
	}, [])

	return (
		<Router history={history}>
			<Navbar />
			<div>
				<Routes />
				{/* Contract details */}
				{/* <h1>Dfund Application</h1>
				<p>
					<strong>Account: </strong>
					{accounts[0]}
				</p>
				<p>
					<strong>Address: </strong>
					{contract._address}
				</p> */}
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</Router>
	)
}

export default App
