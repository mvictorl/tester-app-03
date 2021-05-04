import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserStore from './store/UserStore'

export const Context = createContext(null)

const contextProviderValues = {
	user: new UserStore()
}

ReactDOM.render(
	<Context.Provider value={contextProviderValues}>
		<App />
	</Context.Provider>,
	document.getElementById('root')
)
