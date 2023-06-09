const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, process.env.TOKEN_KEY, (err) => {
			if (err) {
				res.sendStatus(401);
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
