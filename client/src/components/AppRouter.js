import React, { useContext } from 'react'
import { Context } from '..'
import { Redirect, Route, Switch } from 'react-router-dom'
import { adminRoute, publicRoute } from '../routes'
import { HOME_ROUTE } from '../utils/consts'

const AppRouter = () => {
	const { user } = useContext(Context)
	return (
		<Switch>
			{user.isAuth &&
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
