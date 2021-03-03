import React, { useContext } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, loading } = authContext
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export const PublicRoute = ({ component: Component, ...rest }) => {
	const history = useHistory()

	const authContext = useContext(AuthContext)
	const { isAuthenticated, loading } = authContext
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated && !loading ? (
					<Redirect to='/' />
				) : (
					// <>{history.goBack()}</>
					<Component {...props} />
				)
			}
		/>
	)
}
