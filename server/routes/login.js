const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
router.post('/', async (req, res) => {
	// Our login logic starts here
	try {
		// Get user input
		const { email, password } = req.body;

		// Validate user input
		if (!(email && password)) {
			res.status(400).send('All input is required');
		}
		// Validate if user exists in our database
		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);

			// save user token
			user.token = token;

			// user
			res.cookie('token', token, { httpOnly: true });
			res.status(200).json(user);
		}
		res.status(400).json('Invalid Credentials');
	} catch (err) {
		console.log(err);
	}
});

/* EXPORT ROUTE */
module.exports = router;
