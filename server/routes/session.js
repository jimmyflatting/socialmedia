const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	const token = req.cookies.token;
	console.log('Token:', token); // Add this line to log the token value
	if (token) {
		console.log('Before verification'); // Add this line to check the flow
		jwt.verify(token, process.env.TOKEN_KEY, (err) => {
			console.log('After verification'); // Add this line to check the flow
			if (err) {
				console.log('Verification Error:', err); // Add this line to log the error
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
