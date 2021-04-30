const Router = require('express').Router
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

const router = new Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check', auth, userController.check)

module.exports = router
