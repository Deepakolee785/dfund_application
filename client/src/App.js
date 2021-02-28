import React, { useContext, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'styled-components'

import FactoryContext from './context/factory/factoryContext'
import AuthContext from './context/auth/authContext'
import Routes from './routes/'
import history from './utils/history'

import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

// theme
const Mode = 'standard'
const App = () => {
	const { initilizeWeb3 } = useContext(FactoryContext)
	const { loadUser } = useContext(AuthContext)
	useEffect(() => {
		initilizeWeb3()
		loadUser()
		// eslint-disable-next-line
	}, [])

	return (
		<ThemeProvider theme={{ mode: Mode }}>
			<Router history={history}>
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
		</ThemeProvider>
	)
}

export default App
