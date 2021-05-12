import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'

function App() {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default observer(App)
