require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const db = require('./db.config')
const errorMiddleware = require('./middleware/errorMiddleware')
const dbInit = require('./dbInit')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.resolve(__dirname, 'static')))
app.use('/api', routes)
app.use(errorMiddleware)

// TODO: delete test route below
app.get('/', (req, res) => {
	res.status(200).json({ message: 'All right!' })
})

const startDbConnection = async () => {
	try {
		await db.sync()
		await dbInit()
		app.listen(PORT, () => {
			console.log(`Server starting on ${PORT} port...`)
		})
	} catch (e) {
		console.error(e)
	}
}

startDbConnection()
