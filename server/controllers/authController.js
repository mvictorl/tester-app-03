const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/dbAuthModels')
const CustomError = require('../models/CustomError')

function generateJwt(id, username, email, roles) {
	return jwt.sign({ id, username, email, roles }, process.env.SECRET_KEY, {
		expiresIn: '8h'
	})
}

class AuthController {
	async register(req, res, next) {
		const { username, email, password } = req.body
		// TODO: catch errors
		if (!email || !password) {
			// return res.status(401).json({ message: 'Absent email/password' })
			return next(CustomError.badRequest('Absent email or password'))
		}

		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			// return res.status(401).json({ message: 'Email already exist' })
			return next(CustomError.badRequest('Email already exist'))
		}

		const hashPass = await bcrypt.hash(password, 5)

		try {
			const roleUser = await Role.findOne({ where: { name: 'USER' } })

			const newUser = await User.create({
				username,
				email,
				password: hashPass
			})
			await newUser.addRole(roleUser)

			const addedUser = await User.findOne({
				where: { id: newUser.id },
				include: Role
			})

			console.log(addedUser)

			const token = generateJwt(
				addedUser.id,
				addedUser.username,
				addedUser.email,
				addedUser.roles.map(role => role.name)
			)

			return res.json({ token })
		} catch (e) {
			console.error(e)
			return next(CustomError.internal('Failed to create user'))
		}

		// Promise.all([
		// 	User.create({
		// 		username,
		// 		email,
		// 		password: hashPass
		// 	}),
		// 	Role.findOrCreate({ where: { name: 'USER' } })
		// ])
		// 	.then(([user, [role, isCreated]]) => {
		// 		console.log('Role', role)
		// 		UserRole.create({ userId: user.id, roleId: role.id })
		// 		const token = generateJwt(user.id, user.username, user.email, user.role)
		// 		return res.json({ token })
		// 	})
		// 	.catch(() => {
		// 		return next(CustomError.internal('Failed to create user'))
		// 	})
	}

	async login(req, res, next) {
		const { email, password } = req.body
		// TODO: catch errors
		const user = await User.findOne({
			where: { email },
			include: Role
		})
		if (!user) {
			// return res.status(401).json({ message: 'Email not exist' })
			return next(CustomError.badRequest('Email not exist'))
		}

		const isIdenticalPass = bcrypt.compareSync(password, user.password)
		if (!isIdenticalPass) {
			// return res.status(401).json({ message: 'Incorrect password' })
			return next(CustomError.badRequest('Incorrect password'))
		}

		const token = generateJwt(
			user.id,
			user.username,
			user.email,
			user.roles.map(role => role.name)
		)
		return res.json({ token })
	}

	async check(req, res) {
		// After 'auth' middleware!!!
		// which added `user` object from token
		const { id, username, email, roles } = req.user
		const token = generateJwt(id, username, email, roles)
		return res.json({ token })
	}

	async change(req, res) {
		const { id, roles } = req.body
		try {
			const currentUser = await User.findOne({ where: { id } })
			currentUser.setRoles(await Role.findAll({ where: { id: roles } }))

			await currentUser.save()
		} catch (e) {
			console.error(e)
		}
		return res.json({ message: 'Roles of User changed' })
	}

	async getUsers(req, res) {
		const users = await User.findAll()
		return res.json(
			users.map(user => ({
				id: user.id,
				username: user.username
			}))
		)
	}

	async getRoles(req, res) {
		const roles = await Role.findAll()
		return res.json(
			roles.map(role => ({
				id: role.id,
				name: role.name
			}))
		)
	}
}

module.exports = new AuthController()
