const { checkSchema } = require('express-validator')
const { User } = require('../models/dbAuthModels')

const registerSchema = {
	email: {
		in: ['body'],
		notEmpty: {
			errorMessage: 'Email can not be empty'
		},
		normalizeEmail: true,
		isEmail: {
			bail: true,
			errorMessage: 'Wrong email address'
		},
		custom: {
			options: value => {
				return User.findOne({ where: { email: value } }).then(user => {
					if (user) {
						return Promise.reject('Email address already used (Schema)')
					}
				})
			}
		}
	},
	password: {
		isLength: {
			errorMessage: 'Password should be at least 7 chars long',
			// Multiple options would be expressed as an array
			options: { min: 7 }
		}
		// isStrongPassword: {
		// 	minLength: 8,
		// 	minLowercase: 1,
		// 	minUppercase: 1,
		// 	minNumbers: 1
		// },
		// errorMessage:
		// 	'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number'
	},
	confirm: {
		// in: ['body'],
		// notEmpty: {
		// 	errorMessage: 'Confirm password can not be empty'
		// },
		custom: {
			options: async (value, { req }) => {
				if (value !== (await req.body.password)) {
					return Promise.reject('Password confirmation does not match password')
				}
			}
		}
	}
}

module.exports = function registerValidate() {
	return checkSchema(registerSchema)
}
