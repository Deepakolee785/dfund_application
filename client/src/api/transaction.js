import axios from 'axios'
import { DEV_URL } from '../config'

export const saveTransaction = data => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	return axios
		.post(`${DEV_URL}/api/transaction/save-transaction`, data, config)
		.then(res => res)
		.catch(err => err)
}
