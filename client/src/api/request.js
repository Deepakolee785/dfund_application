import axios from 'axios'
import { DEV_URL } from '../config'

export const saveRequest = data => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	return axios
		.post(`${DEV_URL}/api/request/save-request`, data, config)
		.then(res => res)
		.catch(err => err)
}
export const getRequests = data => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	return axios
		.post(
			`${DEV_URL}/api/request/get-campaign-request`,
			{ campaign: data },
			config
		)
		.then(res => res)
		.catch(err => err)
}
