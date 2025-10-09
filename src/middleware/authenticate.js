const admin = require('../firebaseAdmin')

async function authenticate(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	try {
		const decoded = await admin.auth().verifyIdToken(token)
		req.user = decoded
		next()
	} catch (err) {
		res.status(403).json({ error: 'Invalid token' })
	}
}

module.exports = authenticate
