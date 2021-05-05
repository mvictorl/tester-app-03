import React, { useContext, useState } from 'react'
import { Context } from '..'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'

import {
	Container,
	Card,
	FormControl,
	CssBaseline,
	InputLabel,
	Input,
	FormHelperText
} from '@material-ui/core'

const Auth = () => {
	const { user } = useContext(Context)
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()
	const url = useLocation()

	const isLoginPage = url.pathname === LOGIN_ROUTE

	return (
		<Container component="main">
			<CssBaseline />
			<Card variant="outlined">
				<h2>{isLoginPage ? 'Authorization' : 'Registration'}</h2>
				<form>
					{!isLoginPage && (
						<FormControl>
							<InputLabel htmlFor="username-input">User name</InputLabel>
							<Input
								id="username-input"
								aria-describedby="username-helper-text"
							/>
							<FormHelperText id="username-helper-text">
								Input User name
							</FormHelperText>
						</FormControl>
					)}

					<FormControl>
						<InputLabel htmlFor="email-input">Email</InputLabel>
						<Input id="email-input" aria-describedby="email-helper-text" />
						<FormHelperText id="email-helper-text">Input Email</FormHelperText>
					</FormControl>

					<FormControl>
						<InputLabel htmlFor="password-input">Password</InputLabel>
						<Input
							id="password-input"
							aria-describedby="password-helper-text"
						/>
						<FormHelperText id="password-helper-text">
							Input Password
						</FormHelperText>
					</FormControl>

					{!isLoginPage && (
						<FormControl>
							<InputLabel htmlFor="confirm-input">Confirm Password</InputLabel>
							<Input
								id="confirm-input"
								aria-describedby="confirm-helper-text"
							/>
							<FormHelperText id="confirm-helper-text">
								Input Confirm Password
							</FormHelperText>
						</FormControl>
					)}
				</form>
			</Card>
		</Container>
	)
}

export default Auth
