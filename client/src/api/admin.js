import axios from 'axios'
import { DEV_URL } from '../config'

export const registerAdmin = ({ name, email, password }) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	return axios
		.post(`${DEV_URL}/api/admin/register`, { name, email, password }, config)
		.then(res => res)
}
