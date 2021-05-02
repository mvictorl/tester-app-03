const Router = require('express').Router
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

const roleCheck = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check', auth, userController.check)
router.get('/users', roleCheck('ADMIN'), userController.getUsers)
router.get('/roles', roleCheck('ADMIN'), userController.getRoles)
router.put('/change', roleCheck('ADMIN'), userController.change)

// TODO: temporary route for test role check (delete it after)
router.get('/temp', roleCheck('ADMIN'), (req, res) => {
  res.status(200).json({message: 'You has access!'})
})

module.exports = router
