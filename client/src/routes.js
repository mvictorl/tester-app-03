import {
  ADMIN_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE
} from './utils/consts'

import Admin from './pages/Admin'
import Auth from './pages/Auth'

export const adminRoute = [
  {
    path: ADMIN_ROUTE,
    component: Admin
  }
]

export const publicRoute = [
  {
    path: REGISTRATION_ROUTE,
    component: Auth
  },
  {
    path: LOGIN_ROUTE,
    component: Auth
  }
]
