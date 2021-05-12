const { checkSchema } = require('express-validator')
const bcrypt = require('bcryptjs')
const { User } = require('../models/dbAuthModels')

const loginSchema = {
	email: {
		in: ['body'],
		notEmpty: {
			bail: true,
			errorMessage: 'Email can not be empty'
		},
		// normalizeEmail: true, // user@ya.ru => user@yandex.ru
		isEmail: {
			bail: true,
			errorMessage: 'Wrong email address'
		},
		custom: {
			options: value => {
				return User.findOne({ where: { email: value } }).then(user => {
					if (!user) {
						return Promise.reject('No such Email (Schema)')
					}
				})
			}
		}
	},
	password: {
		in: ['body'],
		custom: {
			options: (value, { req }) => {
				return User.findOne({ where: { email: req.body.email } }).then(user => {
					if (user) {
						if (!bcrypt.compareSync(value, user.password)) {
							return Promise.reject('Wrong Password (Schema)')
						}
					}
				})
			}
		}
	}
}

module.exports = function loginValidate() {
	return checkSchema(loginSchema)
}
