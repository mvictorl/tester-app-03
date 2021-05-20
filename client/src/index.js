import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import UserStore from './store/UserStore'
import AppStore from './store/AppStore'

export const Context = createContext(null)

const contextProviderValues = {
	user: new UserStore(),
  app: new AppStore()
}

ReactDOM.render(
	<Context.Provider value={contextProviderValues}>
		<App />
	</Context.Provider>,
	document.getElementById('root')
)
