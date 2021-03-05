import axios from 'axios'
import { DEV_URL } from '../config'
const getDashboardDetails = () => {
	return axios
		.get(`${DEV_URL}/api/admin/dashboard`)
		.then(res => res.data)
		.catch(err => console.error(err))
}

export default getDashboardDetails
