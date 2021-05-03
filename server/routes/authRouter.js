const Router = require('express').Router
const { body, custom } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/authMiddleware')

const registerValidate = require('../middleware/registerValidateMiddleware')

const roleCheck = require('../middleware/checkRoleMiddleware')

const router = new Router()
// TODO: confirmation password required
router.post(
	'/register',

	registerValidate(),
	// body('username')
	// 	.notEmpty()
	// 	.withMessage('User name can not be empty')
	// 	.trim()
	// 	.escape()
	// 	.isLength({ min: 5, max: 25 })
	// 	.withMessage('User name mast be beetwen 5 & 25 characters')
	// 	.custom(value => {
	// 		return
	// 	}),
	// body('email')
	// 	.notEmpty()
	// 	.withMessage('Email can not be empty')
	// 	.isEmail()
	// 	.withMessage('Enter correct email')
	// 	.normalizeEmail(),
	// body('password')
	// 	.isLength({ min: 5, max: 25 })
	// 	.withMessage('Password mast be beetwen 5 & 25 characters'),

	authController.register
)

router.post(
	'/login',

	body('email')
		.notEmpty()
		.withMessage('Email can not be empty')
		.isEmail()
		.withMessage('Enter correct email'),
	// .normalizeEmail(),
	body('password')
		.isLength({ min: 10, max: 25 })
		.withMessage('Password mast be beetwen 5 & 25 characters'),

	authController.login
)

router.get('/check', auth, authController.check)

router.get('/users', roleCheck('ADMIN'), authController.getUsers)

router.get('/roles', roleCheck('ADMIN'), authController.getRoles)

router.put('/change', roleCheck('ADMIN'), authController.change)
// TODO: temporary route for test role check (delete it after)
router.get('/temp', roleCheck('ADMIN'), (req, res) => {
	res.status(200).json({ message: 'You has access!' })
})

module.exports = router
