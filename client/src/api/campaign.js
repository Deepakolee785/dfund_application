import axios from 'axios'
import { DEV_URL } from '../config'

export const saveCampaign = data => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	return axios
		.post(`${DEV_URL}/api/campaign/save-campaign`, data, config)
		.then(res => res)
		.catch(err => err)
}
