const verify = require('jsonwebtoken').verify

module.exports = function (accessRoles) {
	return function (req, res, next) {
		if (req.method === 'OPTION') {
			next()
		}

		try {
			const userToken = req.headers.authorization.split(' ')[1]
			if (!userToken) {
				return res.status(401).json({ message: 'Unauthorized user' })
			}
			// decodedToken = {id, username, email, roles}
			const decodedToken = verify(userToken, process.env.SECRET_KEY)
			// if (!decodedToken?.roles.includes(roles)) {
			// 	return res.status(403).json({ message: 'Access denied' })
			// }
			if (!accessRoles.some(el => decodedToken?.roles.includes(el))) {
				return res.status(403).json({ message: 'Access denied' })
			}

			// Add `user` object from token to request
			// user = {id, username, email, roles}
			req.user = decodedToken
			next()
		} catch (e) {
			res.status(401).json({ message: 'Wrong JWT' })
		}
	}
}
