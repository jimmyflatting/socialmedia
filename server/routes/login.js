const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).send('All input is required');
		}

		const user = await User.findOne({ email });

		if (user && bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);

			user.token = token;
			userHandle = user.userHandle;

			res.cookie('token', token, { httpOnly: true });
			res.cookie('userHandle', userHandle, { httpOnly: true });
			res.status(200).json(user);
		}
		res.status(400).json('Invalid Credentials');
	} catch (err) {
		console.log(err);
	}
});

/* EXPORT ROUTE */
module.exports = router;
