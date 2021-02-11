import axios from 'axios'

const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['a-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['a-auth-token']
	}
}

export default setAuthToken
