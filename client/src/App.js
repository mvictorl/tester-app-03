import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import InfoDialog from './components/InfoDialog'
import { Context } from './index'
import { useContext, useEffect, useState } from 'react'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'

function App() {
  const { user } = useContext(Context)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (loading) {
    return (
      <Spinner
        animation={ 'border' }
        style={ {
          position: 'absolute',
          top: '50vh',
          left: '50%'
        } }
      />
    )
  }

  return (
    <BrowserRouter>
      <InfoDialog/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default observer(App)
