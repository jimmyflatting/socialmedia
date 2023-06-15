const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	console.log('Received Cookies:', req.cookies);
	const token = req.cookies.token;
	console.log('Token:', token);
	if (token) {
		console.log('Before verification');
		jwt.verify(token, process.env.TOKEN_KEY, (err) => {
			console.log('After verification');
			if (err) {
				console.log('Verification Error:', err);
				res.status(401).json({ message: err });
			} else {
				res.sendStatus(200);
			}
		});
	} else {
		res.sendStatus(401);
	}
});

/* EXPORT ROUTE */
module.exports = router;
