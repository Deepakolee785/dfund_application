const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_WEB3':
			return {
				...state,
				web3: action.payload,
			}
		case 'GET_ACCOUNTS':
			return {
				...state,
				accounts: action.payload,
			}
		case 'GET_FACTORY_INSTANCE':
			return {
				...state,
				contract: action.payload,
			}
		case 'GET_WEB3_ERROR':
			return {
				...state,
				error: action.payload,
			}

		default:
			return state
	}
}
export default reducer
