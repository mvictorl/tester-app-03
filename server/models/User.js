const db = require('../db.config')
const { DataTypes } = require('sequelize')

const User = db.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	username: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

module.exports = {
	User
}
