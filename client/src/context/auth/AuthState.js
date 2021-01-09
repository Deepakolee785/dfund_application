import React, { useReducer } from 'react'
import setAuthToken from '../../utils/setAuthToken'
import AuthContext from './authContext'
import authReducer from './authReducter'

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
	}

	const [state, dispatch] = useReducer(authReducer, initialState)

	// Load User
	const loadUser = data => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
			console.log(localStorage.token)
		}

		dispatch({
			type: 'USER_LOADED',
			payload: data,
		})
	}

	const logout = () => {
		dispatch({ type: 'LOGOUT' })
	}
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				loadUser,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
