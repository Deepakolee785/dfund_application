import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthTokenAdmin'
import AdminAuthContext from './adminAuthContext'
import adminAuthReducer from './adminAuthReducter'

import { DEV_URL } from '../../config'

const AdminAuthState = props => {
	const initialState = {
		token: sessionStorage.getItem('admin_token'),
		isAuthenticated: null,
		loading: false,
		success: null,
		user: null,
		error: null,
	}

	const [state, dispatch] = useReducer(adminAuthReducer, initialState)

	const setLoading = () => dispatch({ type: 'SET_LOADING' })
	// const resetLoading = () => dispatch({ type: 'RESET_LOADING' })
	// Load User
	const loadUser = async () => {
		// console.log(sessionStorage.getItem('admin_token'))
		if (sessionStorage.getItem('admin_token')) {
			setAuthToken(sessionStorage.getItem('admin_token'))
		}
		setLoading()

		try {
			const res = await axios.get(`${DEV_URL}/api/admin/authAdmin`)
			console.log(res)
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
				`${DEV_URL}/api/admin/register`,
				FormData,
				config
			)

			console.log(res)
			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data.message,
			})

			// loadUser()
		} catch (err) {
			console.log(err.response)

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
				`${DEV_URL}/api/admin/login`,
				FormData,
				config
			)
			// console.log(res)

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
		<AdminAuthContext.Provider
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
		</AdminAuthContext.Provider>
	)
}

export default AdminAuthState
