import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { Context } from '../index'

import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  MAKE_TESTER_ROUTE,
  REGISTRATION_ROUTE,
  USE_TESTER_ROUTE
} from '../utils/consts'

const Home = () => {
  const { user } = useContext(Context)

  function userOnExit() {
    localStorage.removeItem('jwt')
    user.setUser({})
  }

  return (
    <>
      <h2>HOME Page</h2>
      <Container>
        { (user.user.roles?.includes('ADMIN') ||
          user.user.roles?.includes('MAKER')) &&
        <NavLink to={ ADMIN_ROUTE }>To Admin Page</NavLink>
        }

        <NavLink to={ LOGIN_ROUTE }>To Login Page</NavLink>
        <NavLink to={ REGISTRATION_ROUTE }>To Registration Page</NavLink>

        { (user.user.roles?.includes('ADMIN') ||
          user.user.roles?.includes('MAKER')) &&
        <NavLink to={ MAKE_TESTER_ROUTE }>New Test</NavLink>
        }

        <NavLink to={ USE_TESTER_ROUTE }>Run Test</NavLink>
        <Button
          variant="link"
          href="#"
          onClick={ userOnExit }
        >
          Exit (delete token)
        </Button>
      </Container>
    </>
  )
}

export default observer(Home)
