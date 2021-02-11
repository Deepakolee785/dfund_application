const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('a-auth-token')

	//check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		req.id = decoded._id
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
