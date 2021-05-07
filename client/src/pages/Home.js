import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

const Home = () => {
	return (
		<>
			<div>HOME Page</div>
			<Container>
				<NavLink to={ADMIN_ROUTE}>To Admin Page</NavLink>
				<NavLink to={LOGIN_ROUTE}>To Login Page</NavLink>
				<NavLink to={REGISTRATION_ROUTE}>To Registration Page</NavLink>
			</Container>
		</>
	)
}

export default Home
