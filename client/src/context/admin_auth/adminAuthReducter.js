export default (state, action) => {
	switch (action.type) {
		case 'USER_LOADED':
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case 'REGISTER_SUCCESS':
			return {
				...state,
				loading: false,
				success: action.payload,
			}
		case 'LOGIN_SUCCESS':
			sessionStorage.setItem('admin_token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}

		case 'REGISTER_FAIL':
		case 'AUTH_ERROR':
		case 'LOGIN_FAIL':
		case 'LOGOUT':
			sessionStorage.removeItem('admin_token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			}
		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}

		default:
			return state
	}
}
