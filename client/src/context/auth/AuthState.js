import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import AuthContext from './authContext'
import authReducer from './authReducter'

import { DEV_URL } from '../../config'

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: false,
		success: null,
		user: null,
		error: null,
	}

	const [state, dispatch] = useReducer(authReducer, initialState)

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	// const resetLoading = () => dispatch({ type: 'RESET_LOADING' })
	// Load User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}
		setLoading()

		try {
			const res = await axios.get(`${DEV_URL}/api/user/authUser`)

			dispatch({
				type: 'USER_LOADED',
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: 'AUTH_ERROR',
			})
		}
	}

	// Register User
	const register = async FormData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		setLoading()
		try {
			const res = await axios.post(
				`${DEV_URL}/api/user/register`,
				FormData,
				config
			)

			// console.log(res)
			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data.message,
			})

			// loadUser()
		} catch (err) {
			// console.log(err.response)

			dispatch({
				type: 'REGISTER_FAIL',
				payload: err.response.data.message,
			})
		}
	}

	// Login User
	const login = async FormData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		setLoading()
		try {
			const res = await axios.post(
				`${DEV_URL}/api/user/login`,
				FormData,
				config
			)

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: res.data,
			})

			loadUser()
		} catch (err) {
			dispatch({
				type: 'LOGIN_FAIL',
				payload: err.response.data.message || '',
			})
		}
	}

	// Logout
	const logout = () => dispatch({ type: 'LOGOUT' })

	// Clear Errors
	const clearError = () => dispatch({ type: 'CLEAR_ERROR' })
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				success: state.success,
				error: state.error,
				user: state.user,
				loadUser,
				register,
				login,
				logout,
				clearError,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
