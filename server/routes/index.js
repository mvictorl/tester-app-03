const Route = require('express').Router
const userRouter = require('./userRouter')

const routes = new Route()

routes.use('/user', userRouter)

module.exports = routes
