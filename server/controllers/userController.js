const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const CustomError = require('../models/CustomError')

function generateJwt(id, username, email, role) {
	return jwt.sign({ id, username, email, role }, process.env.SECRET_KEY, {
		expiresIn: '8h'
	})
}

class UserController {
	async register(req, res, next) {
		const { username, email, password, role } = req.body

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
		const newUser = await User.create({
			username,
			email,
			password: hashPass,
			role
		})
		const token = generateJwt(
			newUser.id,
			newUser.username,
			newUser.email,
			newUser.role
		)
		return res.json({ token })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			// return res.status(401).json({ message: 'Email not exist' })
			return next(CustomError.badRequest('Email not exist'))
		}

		const isIdenticalPass = bcrypt.compareSync(password, user.password)
		if (!isIdenticalPass) {
			// return res.status(401).json({ message: 'Incorrect password' })
			return next(CustomError.badRequest('Incorrect password'))
		}

		const token = generateJwt(user.id, user.username, user.email, user.role)
		return res.json({ token })
	}

	async check(req, res) {
		// After 'auth' middleware!!!
		// which added `user` object from tocken
		const { username, email, role } = req.user
		const token = generateJwt(username, email, role)
		return res.json({ token })
	}
}

module.exports = new UserController()
