const verify = require('jsonwebtoken').verify

module.exports = function (req, res, next) {
	if (req.method === 'OPTION') {
		next()
	}

	try {
		const userToken = req.headers.authorization.split(' ')[1]
		if (!userToken) {
			return next(CustomError.badRequest('Absent email/password'))
			return res.status(401).json({ message: 'Unauthorized user' })
		}
		// Add `user` object from token to request
		// user = {id, username, email, role}
		req.user = verify(userToken, process.env.SECRET_KEY)
		next()
	} catch (e) {
		res.status(401).json({ message: 'Wrong JWT' })
	}
}
