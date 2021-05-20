const { Role, User } = require('./models/dbAuthModels')
const bcrypt = require('bcryptjs')

const dbInit = async () => {
	const [superRole, isRoleCreated] = await Role.findOrCreate({
		where: { name: 'SUPER' },
		defaults: { name: 'SUPER' }
	})

	const hashPass = await bcrypt.hash('password', 5)

	const [superUser, isUserCreated] = await User.findOrCreate({
		where: { username: 'SU' },
		defaults: {
			username: 'SU',
			email: 'su@local.su',
			password: hashPass
		}
	})

	if (isRoleCreated && isUserCreated) {
		await superUser.addRole(superRole)
	}

	await Role.findOrCreate({
		where: { name: 'ADMIN' },
		defaults: { name: 'ADMIN' }
	})

	await Role.findOrCreate({
		where: { name: 'USER' },
		defaults: { name: 'USER' }
	})

  await Role.findOrCreate({
    where: { name: 'MAKER' },
    defaults: { name: 'MAKER' }
  })
}

module.exports = dbInit
