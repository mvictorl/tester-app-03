import React, { useContext, useState } from 'react'
import { Context } from '..'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { login, registration } from '../http/userAPI'

const Auth = () => {
	const { user } = useContext(Context)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const history = useHistory()
	const url = useLocation()

	const isLoginPage = url.pathname === LOGIN_ROUTE

	const [errPassword, setErrPassword] = useState('PASSWORD')

	async function submitRegOrAuth(e) {
		e.preventDefault()
		try {
			let data
			if (isLoginPage) {
				data = await login(email, password)
			} else {
				data = await registration(username, email, password, confirm)
			}
			console.log('DATA:', data)
			// if (data.validation) {
			// 	console.log('Data validation:', data.validation)
			// 	data.validation.error.forEach(err => {
			// 		switch (err.param) {
			// 			case 'password':
			// 				setErrPassword(err.msg)
			// 				break

			// 			default:
			// 				console.log('Some error...')
			// 				break
			// 		}
			// 	})
			// }
			if (data.success) {
				user.setUser(data.payload)
				user.setIsAuth(true)
				history.push(HOME_ROUTE)
			} else {
				setErrPassword(data.payload?.validation?.errors[0].msg)
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">
					{isLoginPage ? 'Authorization' : 'Registration'}
				</h2>
				<Form className="d-flex flex-column">
					{!isLoginPage && (
						<Form.Group controlId="formUsername" className="my-3">
							<Form.Label>User name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="User name"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
							<Form.Text className="text-muted">Input User name</Form.Text>
						</Form.Group>
					)}

					<Form.Group controlId="formEmail" className="mb-3">
						<Form.Label>E-mail:</Form.Label>
						<Form.Control
							type="email"
							placeholder="E-mail"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Form.Text className="text-muted">Input e-mail</Form.Text>
					</Form.Group>

					<Form.Group controlId="formPassword" className="">
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Form.Text className="text-muted">{errPassword}</Form.Text>
					</Form.Group>

					{!isLoginPage && (
						<Form.Group controlId="formConfirm" className="mt-3">
							<Form.Label>Confirm password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password confirmation"
								value={confirm}
								onChange={e => setConfirm(e.target.value)}
							/>
							<Form.Text className="text-muted">Confirm Password</Form.Text>
						</Form.Group>
					)}

					<Row className="d-flex p-3 justify-content-center">
						<Button
							type="submit"
							className="w-75"
							onClick={e => submitRegOrAuth(e)}
						>
							{isLoginPage ? 'Enter' : 'Register'}
						</Button>
					</Row>

					<Row className="d-flex justify-content-end">
						{isLoginPage ? (
							<div className="">
								<span>Do not have an account yet?</span>
								<NavLink to={REGISTRATION_ROUTE}> Register here...</NavLink>
							</div>
						) : (
							<div className="">
								<span>Already have an account?</span>
								<NavLink to={LOGIN_ROUTE}> Login here...</NavLink>
							</div>
						)}
					</Row>
				</Form>
			</Card>
		</Container>
	)
}

export default Auth
