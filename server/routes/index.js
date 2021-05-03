const Route = require('express').Router
const authRouter = require('./authRouter')

const routes = new Route()

routes.use('/auth', authRouter)

module.exports = routes
