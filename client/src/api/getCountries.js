import axios from 'axios'
import { FETCH_COUNTRIES } from '../config'

export const getCountries = () => {
	return axios
		.get(FETCH_COUNTRIES)
		.then(res => res.data)
		.catch(err => console.error(err))
}
