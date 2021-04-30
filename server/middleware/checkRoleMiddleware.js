const verify = require('jsonwebtoken').verify

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === 'OPTION') {
			next()
		}

		try {
			const userToken = req.headers.authorization.split(' ')[1]
			if (!userToken) {
				return res.status(401).json({ message: 'Unauthorized user' })
			}
			// decodedToken = {id, username, email, role}
			const decodedToken = verify(userToken, process.env.SECRET_KEY)
			if (decodedToken.includes(role)) {
				return res.status(403).json({ message: 'Access denied' })
			}
			// Add `user` object from token to request
			// user = {id, username, email, role}
			req.user = decodedToken
			next()
		} catch (e) {
			res.status(401).json({ message: 'Wrong JWT' })
		}
	}
}
