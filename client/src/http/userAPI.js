import { $host, $authHost } from '.'
import jwt_decode from 'jwt-decode'

export async function registration(username, email, password, confirm) {
	try {
		const { data } = await $host.post('api/auth/register', {
			username,
			email,
			password,
			confirm
		})
		localStorage.setItem('jwt', data.token)
		return {
			isSuccess: true,
			payload: jwt_decode(data.token)
		}
	} catch (e) {
		return {
			isSuccess: false,
			payload: e.response.data
		}
	}
}

export async function login(email, password) {
	try {
		const { data } = await $host.post('api/auth/login', {
			email,
			password
		})
		localStorage.setItem('jwt', data.token)
		return {
			isSuccess: true,
			payload: jwt_decode(data.token)
		}
	} catch (e) {
		console.log('ERROR:', e.response.data)
		return {
			isSuccess: false,
			payload: e.response.data
		}
	}
}

export async function check() {
	const { data } = await $authHost.get('api/auth/check')
	localStorage.setItem('jwt', data.token)
	return jwt_decode(data.token)
}
