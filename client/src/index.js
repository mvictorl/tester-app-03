import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

export const Context = createContext(null)

const contextProviderValues = {}

ReactDOM.render(
  <Context.Provider value={ contextProviderValues }>
    <App/>
  </Context.Provider>,
  document.getElementById('root')
)
