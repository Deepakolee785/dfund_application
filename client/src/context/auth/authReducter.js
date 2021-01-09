export default (state, action) => {
	switch (action.type) {
		case 'USER_LOADED':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			}

		case 'LOGOUT':
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			}

		default:
			return state
	}
}
