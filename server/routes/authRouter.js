const Router = require('express').Router
const { body, custom } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/authMiddleware')

const registerValidate = require('../middleware/registerValidateMiddleware')
const loginValidate = require('../middleware/loginValidateMiddleware')

const roleCheck = require('../middleware/checkRoleMiddleware')

const router = new Router()
// TODO: confirmation password required
router.post('/register', registerValidate(), authController.register)

router.post('/login', loginValidate(), authController.login)

router.get('/check', auth, authController.check)

router.get('/users', roleCheck(['ADMIN']), authController.getUsers)

router.get('/roles', roleCheck(['ADMIN']), authController.getRoles)

router.put('/change', roleCheck(['ADMIN']), authController.change)
// TODO: temporary route for test role check (delete it after)
router.get('/temp', roleCheck(['SUPER', 'ADMIN']), (req, res) => {
	res.status(200).json({ message: 'You has access!' })
})

module.exports = router
