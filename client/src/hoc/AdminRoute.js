import React, { useContext } from 'react'
import {
	Route,
	Redirect,
	// useHistory
} from 'react-router-dom'
import AdminAuthContext from '../context/admin_auth/adminAuthContext'

export const AdminRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AdminAuthContext)
	const { isAuthenticated, loading } = authContext
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to='/control' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

// export const PublicRoute = ({ component: Component, ...rest }) => {
// 	const history = useHistory()

// 	const authContext = useContext(AuthContext)
// 	const { isAuthenticated, loading } = authContext
// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				isAuthenticated && !loading ? (
// 					// <Redirect to='/' />
// 					<>{history.goBack()}</>
// 				) : (
// 					<Component {...props} />
// 				)
// 			}
// 		/>
// 	)
// }
