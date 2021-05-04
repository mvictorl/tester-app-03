import { $host, $authHost } from '.'
import jwt_decode from 'jwt-decode'

export async function check() {
	const { data } = await $authHost.get('api/auth/check')
	localStorage.setItem('jwt', data.token)
	return jwt_decode(data.token)
}
