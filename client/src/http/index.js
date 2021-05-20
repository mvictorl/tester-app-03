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


// // Test Response Interceptor
// $host.interceptors.response.use(testGoodResponseInterceptor, testBadResponseInterceptor)
//
// function testGoodResponseInterceptor(config) {
//   console.log('Response GOOD config:', config)
//   return config
// }
// function testBadResponseInterceptor(error) {
//   console.log('Response BAD error:', error)
//   return Promise.reject(error)
// }
