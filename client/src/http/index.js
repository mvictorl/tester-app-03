import axios from 'axios'

export const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

export const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})
$authHost.interceptors.request.use(authInterception)

function authInterception(config) {
	config.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
	return config
}
