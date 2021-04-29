require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const db = require('./db.config')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/public', express.static('static'))
app.use('/api', routes)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'All right!' })
})

const startDbConnection = async () => {
	try {
		await db.authenticate().then(await db.sync())

		app.listen(PORT, () => {
			console.log(`Server starting on ${PORT} port...`)
		})
	} catch (e) {
		console.error(e)
	}
}

startDbConnection()
