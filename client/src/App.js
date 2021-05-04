import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { check } from './http/userAPI'

function App() {
	const { user } = useContext(Context)

	useEffect(() => {
		check().then(data => {
			console.log(data)
			user.setUser(true)
			user.setIsAuth(true)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	console.log('App isAuth', user.isAuth)

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default observer(App)
