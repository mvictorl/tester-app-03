const db = require('../db.config')
const { DataTypes } = require('sequelize')

const User = db.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	username: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false }
	// role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

const Role = db.define('role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false, unique: true }
})

const UserRole = db.define('user_role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.belongsToMany(Role, {
	through: UserRole
	// as: 'Role',
	// foreignKey: 'userId'
})
Role.belongsToMany(User, {
	through: UserRole
	// as: 'User',
	// foreignKey: 'roleId'
})

module.exports = {
	User,
	Role,
	UserRole
}
