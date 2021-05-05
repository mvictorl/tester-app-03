import React, { useContext } from 'react'
import { Context } from '..'
import { Redirect, Route, Switch } from 'react-router-dom'
import { adminRoute, publicRoute } from '../routes'
import { HOME_ROUTE } from '../utils/consts'
import Admin from '../pages/Admin'

const AppRouter = ({ isAuth }) => {
	// const { user } = useContext(Context)
	console.log('AppRouter isAuth', isAuth)
	return (
		<Switch>
			{isAuth &&
				adminRoute.map(({ path, component }) => (
					<Route path={path} exact component={component} key={path} />
				))}
			{publicRoute.map(({ path, component }) => (
				<Route path={path} exact component={component} key={path} />
			))}
			<Redirect to={HOME_ROUTE} />
		</Switch>
	)
}

export default AppRouter
