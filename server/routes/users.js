const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');

router.get('/:userHandle', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const userHandle = req.params.userHandle;

		let query = { userHandle: userHandle };

		let collection = db.collection('users');
		const user = await collection.findOne(query);

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				location: user.location,
				workplace: user.workplace,
				profileImg: user.profileImg,
				followers: user.followers,
				following: user.following,
			});
		} else {
			res.status(404).json({
				message: 'User not found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

router.get('/', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	try {
		const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
		const userId = decodedToken.user_id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
});

/* EXPORT ROUTE */
module.exports = router;
