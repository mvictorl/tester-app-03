const Router = require('express').Router
const authController = require('../controllers/authController')
const auth = require('../middleware/authMiddleware')

const roleCheck = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/check', auth, authController.check)
router.get('/users', roleCheck('ADMIN'), authController.getUsers)
router.get('/roles', roleCheck('ADMIN'), authController.getRoles)
router.put('/change', roleCheck('ADMIN'), authController.change)

// TODO: temporary route for test role check (delete it after)
router.get('/temp', roleCheck('ADMIN'), (req, res) => {
	res.status(200).json({ message: 'You has access!' })
})

module.exports = router
