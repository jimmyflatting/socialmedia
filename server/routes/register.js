const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
	try {
		// get user input
		const { firstName, lastName, email, password, userHandle } = req.body;

		// validate user input
		if (!(email && password && firstName && lastName)) {
			res.status(400).send('All input is required');
		}

		// check if user already exists
		const oldUserEmail = await User.findOne({ email });
		const oldUserHandle = await User.findOne({ userHandle });

		if (oldUserEmail) {
			return res.status(409).send('Email already registered');
		}
		if (oldUserHandle) {
			return res.status(409).send('Username already in use');
		} else {
		}

		// encrypt user password
		const encryptedPassword = await bcrypt.hash(password || '', 10);

		// create user in our database
		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			userHandle,
			password: encryptedPassword,
		});

		// create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: '2h',
			}
		);
		// save user token
		user.token = token;

		// return new user
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
	}
});

/* EXPORT ROUTE */
module.exports = router;
