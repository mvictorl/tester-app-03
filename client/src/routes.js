import {
	ADMIN_ROUTE,
	REGISTRATION_ROUTE,
	LOGIN_ROUTE,
	HOME_ROUTE
} from './utils/consts'

import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Home from './pages/Home'

export const adminRoute = [
	{
		path: ADMIN_ROUTE,
		component: Admin
	}
]

export const publicRoute = [
	{
		path: HOME_ROUTE,
		component: Home
	},
	{
		path: REGISTRATION_ROUTE,
		component: Auth
	},
	{
		path: LOGIN_ROUTE,
		component: Auth
	}
]
