import axios from 'axios'
import { DEV_URL } from '../config'

export const loadAuthUser = () => {
	return axios.get(`${DEV_URL}/api/user/authUser`).then(res => res.data)
}
