import React, { useContext, useEffect } from 'react'
import { Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useQuery } from 'react-query'

import FactoryContext from './context/factory/factoryContext'
import AuthContext from './context/auth/authContext'
import Routes from './routes/'
import history from './utils/history'
import { loadAuthUser } from './api/loadUser'

import setAuthToken from './utils/setAuthToken'
import Navbar from './components/Navbar'
import { Spin } from 'antd'

const App = () => {
	const { initilizeWeb3, contract } = useContext(FactoryContext)
	const { loadUser } = useContext(AuthContext)
	useEffect(() => {
		initilizeWeb3()
		// eslint-disable-next-line
	}, [])

	const authUserInfo = useQuery(['auth_user'], () => loadAuthUser(), {
		enabled: !!contract,
		onSuccess: data => {
			loadUser(data)
		},
	})
	console.log(authUserInfo)
	useEffect(() => {
		authUserInfo.refetch()
		// eslint-disable-next-line
	}, [])
	useEffect(() => {
		setAuthToken(localStorage.getItem('token'))
		authUserInfo.refetch()
	}, [])

	// console.log(authUserInfo)

	// if (authUserInfo.isLoading)
	// 	return (
	// 		<Spin
	// 			size='large'
	// 			style={{
	// 				width: '100%',
	// 				height: '100vh',
	// 				justifyContent: 'center',
	// 				alignItems: 'center',
	// 				display: 'flex',
	// 			}}
	// 		/>
	// 	)

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
