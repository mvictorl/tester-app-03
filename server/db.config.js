const { Sequelize } = require('sequelize')

module.exports = new Sequelize({
	dialect: 'sqlite',
	storage: './sqlite.db',
	logging: false,
	define: {
		freezeTableName: true
	}
})
